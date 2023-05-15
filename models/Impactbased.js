const mongoose = require('mongoose');

const impactbasedSchema = new mongoose.Schema({
    startdate:{
        type: String
    },
    enddate:{
        type: String
    },
    advisory:{
      type:String
    }
})



module.exports = mongoose.model('Impactbased', impactbasedSchema);
