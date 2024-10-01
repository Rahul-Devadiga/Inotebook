const express = require("express");
const router = express.Router();
const newUser = require("../model/UserSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECERTE = "hello";
const fetchuser = require('../middleware/fetchuser')
// const {insert, Adminlogin} = require('../Controller/AdminController')
// const AdminToken = require("../Middleware/AdminToken")


router.post(
  "/newuser",
  [
    body("name", "UserName Must Contain 3 or more character").isLength({
      min: 3,
    }),
    body("email", "Enter Valid Email Id").isEmail(),
    body("password", "Password Must Contain 5 or more character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // console.log(req.body)
    // const User = newUser(req.body)
    // User.save();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      // to check user already exist
      let user = await newUser.findOne({ email: req.body.email });
      if (user) {
        success=false;
        return res.status(400).json({ success,errors: "Email Already Exists" });
      }

      salt =  await bcrypt.genSalt(10)
      secPass = await bcrypt.hash(req.body.password, salt)
      user = await newUser.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // .then(User => res.json(User))
      // .catch(err => {console.log(err)
      //   res.json({error: "Please Enter a unique value for mail"})
      // })

      //jwt
      const data =(
        {
          user : user.id
        }
      )
      const token = jwt.sign(data, JWT_SECERTE)
      console.log(token)
      success = true;
      res.json({success,user});

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Some error has been occured" });
    }

    // res.send(req.body);
  }
);

// router.post("/login", Adminlogin);
// login create

router.post(
  "/login",
  [
    body("email", "Enter Valid Email Id").isEmail(),
    body("password", "Password cannot be null").exists(),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email , password} = req.body;
    try {
      let user = await newUser.findOne({ email});
      if (!user) {
        success = false;
        return res.status(400).json({ success, errors: "Invalid Email"})
      }

      const PassCheck = await bcrypt.compare(password, user.password);
      if (!PassCheck) {
        return res.status(400).json({ success,errors: "Invalid Password"})
      }
      
      const data = user.id
      const token = jwt.sign(data, JWT_SECERTE)
      console.log(token)
      success = true;
      res.json({success,token});

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Some error has been occured" });
    }
  })
  
  router.post("/getuser", fetchuser , async (req, res) => {
  
    try {
      userid =req.userid;
      const user = await newUser.findById(userid).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error")
    }
  })

module.exports = router;
