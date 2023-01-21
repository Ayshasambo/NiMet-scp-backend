const Advisory = require("../models/Advisory");
const CryptoJS = require("crypto-js");
const router = require("express").Router();

//POST
router.post("/", async(req, res) =>{

    const newAdvisory = new Advisory({
      image: req.body.image,
      title: req.body.title,
      body: req.body.body,  
  });
  try{
      const advisory = await newAdvisory.save();
      res.status(201).json(advisory);
  }
  catch(err){
      res.status(500).json(err);
  }
})

//UPDATE
router.put("/:id", async (req, res) => {
    try {
      const updatedAdvisory = await Advisory.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedAdvisory);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//DELETE
router.delete("/:id", async (req, res) => {
    try {
      await Advisory.findByIdAndDelete(req.params.id);
      res.status(200).json("Advisory has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
  //GET ALL ADVISORYS
  router.get("/",  async (req, res) => {
    const query = req.query.new;
    try {
      const advisorys = query
        ? await Advisory.find().sort({ _id: -1 }).limit(1)
        : await Advisory.find();
      res.status(200).json(advisorys);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
