const mongoose = require('mongoose');

const impactbasedSchema = new mongoose.Schema({
    startDate:{
        type: String
    },
    endDate:{
        type: String
    },
    // alerts:{
    //     type: String
    //  },
    impactbasedimages: [{
        name: {
          type: String,
        },
        // data: {
        //   type: buffer,
        //   required : true
        // },
        path:{
          type: String
        }
    }],
})



module.exports = mongoose.model('Impactbased', impactbasedSchema);
