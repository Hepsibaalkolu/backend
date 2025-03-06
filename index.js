const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const UserModel = require('./models/Users');
require('dotenv').config({ path: __dirname + '/.env' });


const app = express();

// app.use(cors());
app.use(cors({
    origin: 'https://frontend4-4wdz.onrender.com', // Your frontend URL on Render
    credentials: true
  }));
  

app.use(express.json());

  mongoose.connect(process.env.MONGODBURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));


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
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: "Failed to create user", details: err.message });
    }
  });

app.get('/', (req, res) => {
    res.send('Backend is working!');
  });

const port = 4800;
app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
    
});