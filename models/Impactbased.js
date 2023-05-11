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
    //impactbasedimages: [{
        //name: {
        //type: String,
        //},
        // data: {
        //   type: buffer,
        //   required : true
        // },
        //path:{
          //type: String
        //}
    //}],
})



module.exports = mongoose.model('Impactbased', impactbasedSchema);
