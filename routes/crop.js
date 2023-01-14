const express = require('express')
const router = express.Router()
const Crop = require('../models/Crop.js')

//GET POST
router.get('/', async (req, res) => {
  try{
     const getCrop = await Crop.find().sort({statename: 1});
      res.json(getCrop)
  }
  catch(err){
    res.json({message:err});
  }
});

//NEW POST
router.post("/", async (req, res) => {
 const newCrop =  new Crop({
  cropname: req.body.cropname,
  cropspecie: req.body.cropspecie
 });
 try{
   const savedCrop = await newCrop.save(); 
    res.json(savedCrop);
  }
  catch(err) {
      res.json({message: err})
  }
});


//Get specific post
router.get('/:id', async (req, res) => {
try{
  const getCrop = await Crop.findOne({ _id: req.params.id });
  res.json(getCrop)
}
catch(err){
  res.json({message:err})
}
});


//DELETE POST
router.delete('/:id', async (req, res) =>{
try{ 
  const removeCrop = await Crop.deleteOne({_id: req.params.id})
  res.json(removeCrop)
}
catch(err){
    res.json({message:err})
}
});


//UPDATE POST
router.patch('/:id', async (req, res) =>{
try{
  const updateCrop = await Crop.updateOne(
    {_id: req.params.id}, 
    {$set: req.body}
  );
  res.json(updateCrop)
}
catch(err){
  res.json({message:err})
}
});


module.exports = router;