const express = require('express');
const router = express.Router();
const Impactbased = require('../models/Impactbased');




//GET POST
router.get('/', async (req, res) => {
  try{
     const getImpactbased = await Impactbased.find().sort({state: 1});
      res.json(getImpactbased)
  }
  catch(err){
    res.json({message:err});
  }
});

//NEW POST
router.post("/", async (req, res) => {
 const newImpactbased =  new Impactbased({
  startdate: req.body.startdate,
  enddate: req.body.enddate,
  advisory:req.body.advisory
 });
 try{
   const savedImpactbased = await newImpactbased.save(); 
    res.json(savedImpactbased);
  }
  catch(err) {
      res.json({message: err})
  }
});


//Get specific post
router.get('/:id', async (req, res) => {
try{
  const getImpactbased = await Impactbased.findOne({ _id: req.params.id });
  res.json(getImpactbased)
}
catch(err){
  res.json({message:err})
}
});


//DELETE POST
router.delete('/:id', async (req, res) =>{
try{ 
  const removeImpactbased = await Impactbased.deleteOne({_id: req.params.id})
  res.json(removeImpactbased)
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














































































//const multer = require('multer');
//const fs = require('fs');
//const path = require('path');
//const uploadsPath = path.join(__dirname, '..', 'tmp');

//store images
// const storage = multer.diskStorage({
//   destination: function(req, file, cb){
//       cb(null, './tmp');
//     },
//     filename: function(req, file, cb){
//       cb(null, file.originalname);
//     } 
//  });

 //upload images
//const upload = multer({storage:storage});

// router.post("/", upload.array('impactbasedimages', 3), async (req, res) => {

//   const timestamp = new Date().getTime();
//   //create an array to store the images
//   let impactbasedimages = [];
//   req.files.forEach(file => {
//     //create an object for each image with name, data
//     let image = {
//       name: file.originalname,
//     }
//     //check if an image with the same name already exist
//     let existingImage = impactbasedimages.find(img => img.name === image.name);
//     //if an image with the same name exist, remove it
//     if (existingImage) {
//       impactbasedimages = impactbasedimages.filter(img => img.name !== image.name);
//     }
//     //add the new image
//     impactbasedimages.push(image);
//     fs.rename(file.path, path.join(uploadsPath,`${file.originalname}`), (err) => {
//       if (err) {
//           console.log(err);
//       }
//    });
//   });
//   //create a new impactbased document
//   const newFile = new Impactbased({
//     startDate: req.body.startDate,
//     endDate: req.body.endDate,
//     advisory:req.body.advisory
//     //alerts:req.body.alerts
//     //impactbasedimages: req.files,//impactbasedimages,
//     //brief: req.body.brief
//  });
//  try {
//     const savedFile = await newFile.save();
//     res.status(200).json(savedFile);
//   } 
//   catch (err) {
//     res.status(500).json(err);
//   }      
// });

// //GET ALL IMPACT FILES
// router.get('/', async (req, res) => {
//     try{
//      const getAllFiles = await Impactbased.find();
//       res.json(getAllFiles);
//    }
//    catch(err){
//       res.json({message: err});
//    }
// });

// //GET AN IMPACT File
// router.get('/:id', async (req, res) =>{
//   try{
//     const getFile = await Impactbased.findById(req.params.id);
//     if (!getFile) res.status(404).json({ message: 'Data not found' });
//     res.json(getFile);
//   }
//   catch(err){
//         res.json({message:err})
//   }
// });

//  //UPDATE A FILE
//  router.patch('/:id', async (req, res) => {
//   try {
//       const updateFile = req.body;
//       updateFile.impactbasedimages = req.files;
//       await Impactbased.updateOne({_id: req.params.id}, {$set: updateFile});
//       res.status(200).json({ message: 'Data has been updated' });
//       console.log(req.body)
//   } catch (err) {
//       res.status(500).json({ message: err.message });
//   }
// });

// //DELETE A FILE
// router.delete("/:id", async (req, res) => {
//   try {
//     await Impactbased.findByIdAndDelete(req.params.id);
//     res.status(200).json("File has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



 module.exports = router;

