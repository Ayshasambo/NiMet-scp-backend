const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    fullname: req.body.fullname,
    phonenumber: req.body.phonenumber, 
    state: req.body.state,
    password: CryptoJS.AES.encrypt(
       req.body.password,
      process.env.PASS_SEC
     ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } 
  catch (err) {
    res.status(500).json("Register Error! Try again");
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ phonenumber: req.body.phonenumber});
    if (!user) return res.status(401).json("User not found!");

     const hashedPassword = CryptoJS.AES.decrypt(
         user.password,
         process.env.PASS_SEC
     );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== req.body.password) 
        return res.status(401).json("Wrong password!");

    const accessToken = jwt.sign(
       {
        id: user._id,
        fullname: user.fullname,
        phonenumber: user.phonenumber  
       },
   process.env.JWT_SEC
      );
     res.status(200).json(accessToken);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
