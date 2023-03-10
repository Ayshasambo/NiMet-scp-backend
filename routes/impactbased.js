const express = require('express');
const router = express.Router();
const Impactbased = require('../models/Impactbased');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadsPath = path.join(__dirname, '..', 'uploads');

//store images
const storage = multer.diskStorage({
  destination: function(req, file, cb){
      cb(null, './uploads');
    },
    filename: function(req, file, cb){
      cb(null, file.originalname);
    } 
 });

 //upload images
const upload = multer({storage:storage});

router.post("/", upload.array('impactbasedimages', 3), async (req, res) => {

  const timestamp = new Date().getTime();
  //create an array to store the images
  let impactbasedimages = [];
  req.files.forEach(file => {
    //create an object for each image with name, data
    let image = {
      name: file.originalname,
    }
    //check if an image with the same name already exist
    let existingImage = impactbasedimages.find(img => img.name === image.name);
    //if an image with the same name exist, remove it
    if (existingImage) {
      impactbasedimages = impactbasedimages.filter(img => img.name !== image.name);
    }
    //add the new image
    impactbasedimages.push(image);
    fs.rename(file.path, path.join(uploadsPath,`${file.originalname}`), (err) => {
      if (err) {
          console.log(err);
      }
   });
  
  });
  
  //create a new impactbased document
  const newFile = new Impactbased({
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    alerts:req.body.alerts,
    impactbasedimages: req.files,//impactbasedimages,
    brief: req.body.brief
 });
 try {
    const savedFile = await newFile.save();
    res.status(200).json(savedFile);
  } 
  catch (err) {
    res.status(500).json(err);
  }
       
});
  
//GET ALL IMPACT FILES
router.get('/', async (req, res) => {
    try{
     const getAllFiles = await Impactbased.find();
      res.json(getAllFiles);
   }
   catch(err){
      res.json({message: err});
   }
});

//GET AN IMPACT File
router.get('/:id', async (req, res) => {
  try{
    const getFile = await Impactbased.findById(req.params.id);
    if (!getFile) res.status(404).json({ message: 'Data not found' });
    res.json(getFile);
  }
  catch(err){
        res.json({message:err})
  }
});

 //UPDATE A FILE
 router.patch('/:id', async (req, res) => {
  try {
      const updateFile = req.body;
      updateFile.impactbasedimages = req.files;
      await Impactbased.updateOne({_id: req.params.id}, {$set: updateFile});
      res.status(200).json({ message: 'Data has been updated' });
      console.log(req.body)
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

//DELETE A FILE
router.delete("/:id", async (req, res) => {
  try {
    await Impactbased.findByIdAndDelete(req.params.id);
    res.status(200).json("File has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;

