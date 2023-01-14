const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    
    statename: {
        type: String
      },

      city:[{
       name:{
         type: String
       }
      }]
})



    module.exports = mongoose.model('State', stateSchema);
