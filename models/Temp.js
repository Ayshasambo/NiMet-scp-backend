const mongoose = require('mongoose');

//temp schema
const tempSchema = new mongoose.Schema({
    state:{
        type: String
    },
    location:[{
        name:{
            type:String
        },
        january:{
            day:{
                type: String
            },
            night:{
                type: String
            }
        },
        february:{
            day:{
                type: String
            },
            night:{
                type: String
            }
        },
        march:{
            day:{
                type: String
            },
            night:{
                type: String
            }
        },
        April:{
            day:{
                type: String
            },
            night:{
                type: String
            }
        },
        may:{
            day:{
                type: String
            },
            night:{
                type: String
            }
        }
    }]
});



module.exports = mongoose.model('Temp', tempSchema);