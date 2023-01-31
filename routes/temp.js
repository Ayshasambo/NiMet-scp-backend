const express = require('express')
const router = express.Router()
const Temp = require('../models/Temp.js')


//GET POST
router.get('/', async (req, res) => {
  try{
     const getTemp = await Temp.find().sort({state: 1});
      res.json(getTemp)
  }
  catch(err){
    res.json({message:err});
  }
});

//NEW POST
router.post("/", async (req, res) => {
 const newTemp =  new Temp({
  statename : req.body.statename,
  location: req.body.location,
  month:req.body.month
 });
 try{
   const savedTemp = await newTemp.save(); 
    res.json(savedTemp);
  }
  catch(err) {
      res.json({message: err})
  }
});


//Get specific post
router.get('/:id', async (req, res) => {
try{
  const getTemp = await Temp.findOne({ _id: req.params.id });
  res.json(getTemp)
}
catch(err){
  res.json({message:err})
}
});


//DELETE POST
router.delete('/:id', async (req, res) =>{
try{ 
  const removeTemp = await Temp.deleteOne({_id: req.params.id})
  res.json(removeTemp)
}
catch(err){
    res.json({message:err})
}
});


//UPDATE POST
router.patch('/:id', async (req, res) =>{
try{
  const updateTemp = await Temp.updateOne(
    {_id: req.params.id}, 
    {$set: req.body}
  );
  res.json(updateTemp)
}
catch(err){
  res.json({message:err})
}
});





module.exports = router;
