const ConnectToMongo = require ('./db')
const express = require("express");
const app = express();
const port = 5001;
const cors = require('cors')

app.use(cors())

app.use(express.json())
// app.get('/', (req,res)=>{
//     res.send("hello")
// })

// const userapi = require("./route/UserRoute");
// app.use("/api/user", userapi);
app.use('/api/user' ,require('./route/UserRoute'))
app.use('/api/notes' ,require('./route/NotesRoute'))

ConnectToMongo();
app.listen(port, () => {
    console.log(`server is running in ${port}`);
  });
  