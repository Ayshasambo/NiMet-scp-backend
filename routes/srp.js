const express = require('express')
const router = express.Router()
const Srp = require('../models/Srp.js')

//GET POST
router.get('/', async (req, res) => {
    try{
       const getSrp = await Srp.find().sort({statename: 1});
        res.json(getSrp)
    }
    catch(err){
      res.json({message:err});
    }
});

//NEW POST
router.post("/", async (req, res) => {
   const newSrp =  new Srp({
    statename : req.body.statename,
    city: req.body.city
   });
   try{
     const savedSrp = await newSrp.save(); 
      res.json(savedSrp);
    }
    catch(err) {
        res.json({message: err})
    }
});


//Get specific post
router.get('/:id', async (req, res) => {
  try{
    const getSrp = await Srp.findOne({ _id: req.params.id });
    res.json(getSrp)
  }
  catch(err){
    res.json({message:err})
  }
});


//DELETE POST
router.delete('/:id', async (req, res) =>{
  try{ 
    const removeSrp = await Srp.deleteOne({_id: req.params.id})
    res.json(removeSrp)
  }
  catch(err){
      res.json({message:err})
  }
});


 //UPDATE POST
router.patch('/:id', async (req, res) =>{
  try{
    const updateSrp = await Srp.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json(updateSrp)
  }
  catch(err){
    res.json({message:err})
  }
});






module.exports = router;