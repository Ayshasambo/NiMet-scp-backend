const mongoose = require("mongoose");

const AdvisorySchema = new mongoose.Schema(
    {
        title: {
            //required: true,
            type: String
            },
            body: {
                type: String,
                //required: true,
                minlength: 3,
            },
            image: {
                type: String,
            }
    }

);

module.exports = mongoose.model("Advisory", AdvisorySchema);