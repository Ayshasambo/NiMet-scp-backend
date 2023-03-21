//const router = require("express").Router();
//const { Expo } = require("expo-server-sdk");
//const expo = new Expo();
//const Alert = require('../models/Alert');

//let savedPushTokens = [];

// const handlePushTokens = ({ body }) => {
//   let notifications = [];
//   for (let pushToken of savedPushTokens) {
//     if (!Expo.isExpoPushToken(pushToken)) {
//       console.error(`Push token ${pushToken} is not a valid Expo push token`);
//       continue;
//     }

//     notifications.push({
//       to: pushToken,
//       sound: "default",
//       title: "NiMet",
//       body: body,
//       data: { body }
//     });
//   }

//   let chunks = expo.chunkPushNotifications(notifications);

//   (async () => {
//     for (let chunk of chunks) {
//       try {
//         let receipts = await expo.sendPushNotificationsAsync(chunk);
//         console.log(receipts);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   })();
// };

// const saveToken = token => {
//   console.log(token, savedPushTokens);
//   const exists = savedPushTokens.find(t => t === token);
//   if (!exists) {
//     savedPushTokens.push(token);
//   }
// };

// router.get("/", async (req, res) => {
//   const query = req.query.new;
//     try {
//       const alerts = query
//         ? await Alert.find().sort({ createdAt: -1 }).limit(5)
//         : await Alert.find();
//       res.status(200).json(alerts);
//     } catch (err) {
//       res.status(500).json(err);
//     }


// });

// router.post("/token", (req, res) => {
//   saveToken(req.body.token.value);
//   console.log(`Received push token, ${req.body.token.value}`);
//   res.send(`Received push token, ${req.body.token.value}`);
// });

// router.post("/", async (req, res) => {
//   //console.log(`Received message, with title: ${req.body.title} & body: ${req.body.body}`);
//   //res.send(`Received message, with body: ${req.body.body}`);
//     const newAlert = new Alert({
//       title: req.body.title,
//       body: req.body.body  
//   });

//   try{
//       const alert = await newAlert.save();
//       res.status(201).json(alert);
//       handlePushTokens(req.body);
//   }
//   catch(err){
//       res.status(500).json(err);
//   }

// });

//   router.delete("/:id", async (req, res) => {
//     try {
//       await Alert.findByIdAndDelete(req.params.id);
//       res.status(200).json("User has been deleted...");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// module.exports = router;



const express = require('express');
const router = express.Router();
const { Expo } = require("expo-server-sdk");
const expo = new Expo();
const Alert = require('../models/Alert');
const Token = require('../models/Token');

let savedPushTokens = [];


const handlePushTokens = ({ body }) => {
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    notifications.push({
      to: pushToken,
      sound: "default",
      title: "NiMet",
      body: body,
      data: { body }
    });
  }

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

const saveToken = token => {
  console.log(token, savedPushTokens);
  const exists = savedPushTokens.find(t => t === token);
  if (!exists) {
    savedPushTokens.push(token);
  }
};

router.get("/", async (req, res) => {
  const query = req.query.new;
    try {
      const alerts = query
        ? await Alert.find().sort({ _id: -1 }).limit(5)
        : await Alert.find();
      res.status(200).json(alerts);
    } catch (err) {
      res.status(500).json(err);
    }


});

router.post("/token", async (req, res) => {
  console.log(`Received push token, ${req.body.token.value}`);
  
  try {
    const exists = await Token.findOne({ token: req.body.token.value });
    if (!exists) {
      const newToken = new Token({
        token: req.body.token.value,
      });
      const savedToken = await newToken.save();
      res.json(savedToken);
    } else {
      res.json(exists);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});


router.post("/", async (req, res) => {
  //console.log(`Received message, with title: ${req.body.title} & body: ${req.body.body}`);
  //res.send(`Received message, with body: ${req.body.body}`);
    const newAlert = new Alert({
      title: req.body.title,
      body: req.body.body  
  });

  try{
      const alert = await newAlert.save();
      res.status(201).json(alert);
      handlePushTokens(req.body);
  }
  catch(err){
      res.status(500).json(err);
  }

});

  router.delete("/:id", async (req, res) => {
    try {
      await Alert.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;



