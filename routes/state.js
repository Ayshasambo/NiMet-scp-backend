const State = require("../models/State");
const CryptoJS = require("crypto-js");
const router = require("express").Router();

//POST
router.post("/", async(req, res) =>{

    const newState = new State({
      statename: req.body.statename,
      city: req.body.city,  
  });
  try{
      const state = await newState.save();
      res.status(201).json(state);
  }
  catch(err){
      res.status(500).json(err);
  }
})


//DELETE
router.delete("/:id", async (req, res) => {
    try {
      await State.findByIdAndDelete(req.params.id);
      res.status(200).json("State has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET STATE
router.get("/:id", async (req, res) => {
    try {
      const state = await State.findById({_id:req.params.id});
      const { password, ...others } = state._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL STATES
  router.get('/', async (req, res) => {
    try{
       const getStates = await State.find().sort({statename: 1});
        res.json(getStates)
    }
    catch(err){
      res.json({message:err});
    }
});

  module.exports = router;