const express = require('express')
const router = express.Router()
const Crop = require('../models/Crop.js')

//GET POST
router.get('/', async (req, res) => {
  try{
     const getCrop = await Crop.find();
      res.json(getCrop)
  }
  catch(err){
    res.json({message:err});
  }
});

//NEW POST
router.post("/", async (req, res) => {
 const newCrop =  new Crop({
   statename : req.body.statename,
   city: req.body.city
 });
 try{
   const savedCrop = await Crop.save(); 
    res.json(savedCrop);
  }
  catch(err) {
      res.json({message: err})
  }
});

//Get specific post
router.get('/id', async (req, res) => {
try{
  const getCrop = await Crop.findById(req.params.srpId);
  res.json(getCrop)
}
catch(err){
      res.json({message:err})
}
});

//DELETE POST
router.delete('/:id', async (req, res) =>{
try{ 
  const removeCrop = await Crop.remove({_id: req.params.id})
  res.json(removeCrop)
}
catch(err){
    res.json({message:err})
}

})

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