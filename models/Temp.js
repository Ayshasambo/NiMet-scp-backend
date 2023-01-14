const mongoose = require('mongoose');

//temp schema
const tempSchema = new mongoose.Schema({
    statename:{
        type: String
    },
    location:{
        type: String
    },
    month:[{
        day:{
            type: String
        },
        night:{
            type: String
        }
    }]


    
});



module.exports = mongoose.model('Temp', tempSchema);