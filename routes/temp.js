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
 const newTemp =  new Srp({
   statename : req.body.statename,
   city: req.body.city
 });
 try{
   const savedTemp = await post.save(); 
    res.json(savedTemp);
  }
  catch(err) {
      res.json({message: err})
  }
});

//Get specific post
router.get('/id', async (req, res) => {
try{
  const getTemp = await Temp.findById(req.params.srpId);
  res.json(getTemp)
}
catch(err){
      res.json({message:err})
}
});

//DELETE POST
router.delete('/:id', async (req, res) =>{
try{ 
  const removeTemp = await Temp.remove({_id: req.params.id})
  res.json(removeTemp)
}
catch(err){
    res.json({message:err})
}
})

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