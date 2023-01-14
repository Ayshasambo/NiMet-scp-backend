const mongoose = require('mongoose');

//user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    phonenumber: {
        type: Number
    },
    email:{
        type:String
    },
    state:[{
        name:{
            type: String
        },
        lga:{
           type: String
        }
    }]


});

module.exports = mongoose.model("User", userSchema);