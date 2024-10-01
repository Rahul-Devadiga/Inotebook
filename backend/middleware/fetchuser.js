const jwt = require("jsonwebtoken")
const User = require("../model/UserSchema");
const JWT_SECERTE = 'hello';

const fetchuser = async (req, res, next) => {
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error:"Access denied! no token Provided"});
    }
    try{
        const data = jwt.verify(token, JWT_SECERTE);
        req.userid = await data;
        // req.userid = await User.findById(data.user.id); // Populate req.user with user info
        next();
    }catch(err){
        res.status(403).json({message:"Invalid Token"})
    }
};



module.exports = fetchuser;