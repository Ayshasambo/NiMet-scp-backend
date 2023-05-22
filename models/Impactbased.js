const mongoose = require('mongoose');

const impactbasedSchema = new mongoose.Schema({
    startdate:{
        type: String
    },
    enddate:{
        type: String
    },   
  },
  {timestamps: true}
)



module.exports = mongoose.model('Impactbased', impactbasedSchema);
