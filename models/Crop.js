const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    cropname:{
        type: String
    },
    cropspecie:[{
        name: {
            type: String
        },
        location: [{
           state: {
                type: String
            },

           lga: {
             type: String
            },

            plantingwindow:{
                type: String
            }

        }]
     }]
});


module.exports = mongoose.model("Crop", cropSchema);
