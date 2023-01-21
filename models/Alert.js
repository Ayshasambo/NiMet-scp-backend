const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema(
    {
            title: {
                required: true,
                type: String
            },
            body: {
                type: String,
                required: true,
                minlength: 3,
            },
            image: {
                type: String,
        }
    }

);

module.exports = mongoose.model("Alert", AlertSchema);