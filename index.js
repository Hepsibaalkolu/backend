const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/Users');
// const dotenv = require('dotenv');

// dotenv.config();
// require('dotenv').config();
require('dotenv').config({ path: __dirname + '/.env' });


const app = express();

app.use(cors());

app.use(express.json());

// mongoose.connect(process.env.MONGODBURL);
// mongoose.connect(process.env.MONGODBURL)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err)

  mongoose.connect(process.env.MONGODBURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// app.get("/getUser", (req, res) => {
//     UserModel.find({}).then(function(users) {
//         res.json(users)
//     }).catch(function(err) {
//         res.json(err)
//     })
// })
app.get("/getUser", async (req, res) => {
    try {
      const users = await UserModel.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch users", details: err.message });
    }
  });
  
  app.post("/createUser", async (req, res) => {
    try {
      const user = req.body;
      const newUser = new UserModel(user);
      await newUser.save();
      res.status(201).json(newUser); // Return the saved user with _id
    } catch (err) {
      res.status(500).json({ error: "Failed to create user", details: err.message });
    }
  });

app.get('/', (req, res) => {
    res.send('Backend is working!');
  });

// app.post("/createUser", async (req,res)=>{
//     const user = req.body;
//     const newUser = new UserModel(user);
//     await newUser.save();
//     res.json(user);
// })

const port = 4800;
app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
    
})
//"http://localhost:5173", 
//https://website-app-client.vercel.app
// https://website-app-1whq.vercel.app

// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "nodemon index.js"
    
//   },