// const express = require('express')
// const router = express.Router()
// const User = require("../models/User");
// const CryptoJS = require("crypto-js");

// //const router = require("express").Router();
// //const router = express.Router()

// //POST
// router.post("/register", async(req, res) =>{

//     const newUser = new User({
//       username: req.body.username,
//       password:  CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
//       phonenumber: req.body.phonenumber,
//       state: req.body.state,  
//   });
//   try{
//       const user = await newUser.save();
//       res.status(201).json(user);
//   }
//   catch(err){
//       res.status(500).json(err);
//   }
// })

// //UPDATE
// router.put("/:id", async (req, res) => {
//     if (req.body.password) {
//       req.body.password = CryptoJS.AES.encrypt(
//         req.body.password,
//         process.env.PASS_SEC
//       ).toString();
//     }
  
//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// //DELETE
// router.delete("/:id", async (req, res) => {
//     try {
//       await User.findByIdAndDelete(req.params.id);
//       res.status(200).json("User has been deleted...");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   //GET USER
// router.get("/find/:id", async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
//       const { password, ...others } = user._doc;
//       res.status(200).json(others);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   //GET ALL USERS
//   router.get("/",  async (req, res) => {
//     const query = req.query.new;
//     try {
//       const users = query
//         ? await User.find().sort({ _id: -1 }).limit(5)
//         : await User.find();
//       res.status(200).json(users);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   module.exports = router;

const User = require("../models/User");
const CryptoJS = require("crypto-js");
const router = require("express").Router();

//POST
router.post("/register", async(req, res) =>{

    const newUser = new User({
      fullname: req.body.fullname,
      password:  CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
      phonenumber: req.body.phonenumber,
      state: req.body.state,  
  });
  try{
      const user = await newUser.save();
      res.status(201).json(user);
  }
  catch(err){
      res.status(500).json(err);
  }
})

//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//DELETE
router.delete("/:id", async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET USER
router.get("/find/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL USERS
  router.get("/",  async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;

