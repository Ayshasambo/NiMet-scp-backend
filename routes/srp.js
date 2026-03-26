const express = require('express')
const router = express.Router()
const Srp = require('../models/Srp.js')

//GET POST
router.get('/', async (req, res) => {
  try {
    let { year, lga_name, state_name } = req.query;
    const currentYear = new Date().getFullYear();
    year = year ? Number(year) : currentYear;

    const query = { year: Number(year) };

    if (state_name) {
      query.statename = { $regex: new RegExp(state_name.trim(), 'i') };
    }

    let srps;
    if (lga_name) {
      // First find documents containing LGA anywhere in location array
      srps = await Srp.find(query).lean();
      const searchLga = lga_name.trim().toLowerCase();
      
      srps = srps.filter(doc => 
        doc.location?.some(loc => 
          loc.name?.trim().toLowerCase().includes(searchLga) ||
          searchLga.includes(loc.name?.trim().toLowerCase())
        )
      );
    } else {
      srps = await Srp.find(query).lean();
    }

    // Filter locations within each document
    const results = srps.map(doc => {
      if (lga_name) {
        const searchLga = lga_name.trim().toLowerCase();
        const filteredLocations = doc.location.filter(loc => 
          loc.name?.trim().toLowerCase().includes(searchLga)
        );
        return { ...doc, location: filteredLocations };
      }
      return doc;
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// router.get('/', async (req, res) => {
//   try {
//     let { year, lga_name, state_name } = req.query;
//     const currentYear = new Date().getFullYear();
//     year = year ? Number(year) : currentYear;

//     const query = { year };

//     if (state_name) {
//       query.statename = { $regex: new RegExp(`^${state_name.trim()}$`, 'i') };
//     }

//     if (lga_name) {
//       query.location = {
//         $elemMatch: { name: { $regex: new RegExp(`^${lga_name.trim()}$`, 'i') } }
//       };
//     }

//     const srps = await Srp.find(query).lean();

//     // If filtering by LGA, return only matching locations
//     const results = srps.map(doc => {
//       if (lga_name) {
//         const filteredLocations = doc.location.filter(
//           loc => loc.name.trim().toLowerCase() === lga_name.trim().toLowerCase()
//         );
//         return { ...doc, location: filteredLocations };
//       }
//       return doc;
//     });

//     res.json(results);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// router.get('/', async (req, res) => {
//   try {
//     let { year, lga_name } = req.query;
//     const currentYear = new Date().getFullYear();
//     year = year ? Number(year) : currentYear;

//     const query = { year };

//     if (lga_name) {
//       // Correctly match location.name inside the array
//       query.location = {
//         $elemMatch: {
//           name: { $regex: new RegExp(`^\\s*${lga_name.trim()}\\s*$`, 'i') }
//         }
//       };
//     }

//     const srps = await Srp.find(query).lean();

//     // Keep only matching location if lga_name is specified
//     const results = srps.map(doc => {
//       if (lga_name) {
//         const filteredLocations = doc.location.filter(
//           loc => loc.name.trim().toLowerCase() === lga_name.trim().toLowerCase()
//         );
//         return { ...doc, location: filteredLocations };
//       }
//       return doc;
//     });

//     res.json(results);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// router.get('/', async (req, res) => {
//   try {
//     let { year, lga_name } = req.query;
//     const currentYear = new Date().getFullYear();
//     year = year ? Number(year) : currentYear;

//     const query = { year };

//     if (lga_name) {
//       query.location = {
//         $elemMatch: {
//           name: { $regex: new RegExp(`^\\s*${lga_name.trim()}\\s*$`, 'i') }
//         }
//       };
//     }

//     const srps = await Srp.find(query).lean();

//     // Filter location array to include only the matching LGA
//     let results = srps.map(doc => {
//       if (lga_name) {
//         const filteredLocations = doc.location.filter(
//           loc => loc.name.trim().toLowerCase() === lga_name.trim().toLowerCase()
//         );
//         return { ...doc, location: filteredLocations };
//       }
//       return doc;
//     });

//     res.json(results);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// router.get('/', async (req, res) => {
//   try {
//     let { year, lga_name } = req.query;

//     // Default to current year if not provided
//     const currentYear = new Date().getFullYear();
//     year = year ? Number(year) : currentYear;

//     const query = { year };

//     if (lga_name) {
//       // Case-insensitive match, ignore extra spaces
//       query["location.name"] = { $regex: new RegExp(`^\\s*${lga_name.trim()}\\s*$`, 'i') };
//     }

//     const srps = await Srp.find(query).lean();

//     res.json(srps);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// router.get('/', async (req, res) => {
//   try {
//     const { year, lga_name } = req.query;

//     if (!year) return res.status(400).json({ error: "Year is required" });

//     // Build the query
//     const query = { year: Number(year) };

//     if (lga_name) {
//       query.location = { 
//         $elemMatch: { name: { $regex: new RegExp(`^${lga_name}$`, 'i') } } 
//       };
//     }

//     // Project only the matching location element
//     let srps;
//     if (lga_name) {
//       srps = await Srp.find(query, {
//         year: 1,
//         statename: 1,
//         location: { $elemMatch: { name: { $regex: new RegExp(`^${lga_name}$`, 'i') } } }
//       }).lean();
//     } else {
//       srps = await Srp.find(query).lean();
//     }

//     res.json(srps);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// router.get('/', async (req, res) => {
//   try {
//     const { year, lga_name } = req.query;

//     const query = {};

//     if (year) query.year = Number(year); // filter by year
//     if (lga_name) query["location.name"] = { $regex: new RegExp(`^${lga_name}$`, 'i') };

//     const srps = await Srp.find(query).lean();

//     res.json(srps);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// router.get('/', async (req, res) => {
//   try {
//     const { statename, lga_name, year } = req.query;

//     let query = {};

//     // filter by state
//     if (statename) {
//       query.statename = new RegExp(statename, 'i');
//     }

//     // filter by year
//     if (year) {
//       query.year = Number(year);
//     }

//     // base fetch
//     let srp = await Srp.find(query);

//     // filter by lga (inside array)
//     if (lga_name) {
//       srp = srp.map(doc => {
//         const filteredLocations = doc.location.filter(loc =>
//           loc.name?.toLowerCase() === lga_name.toLowerCase()
//         );

//         return {
//           ...doc._doc,
//           location: filteredLocations
//         };
//       }).filter(doc => doc.location.length > 0);
//     }

//     res.json(srp);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/', async (req, res) => {
//     try{
//        const getSrp = await Srp.find().sort({statename: 1});
//         res.json(getSrp)
//     }
//     catch(err){
//       res.json({message:err});
//     }
// });

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