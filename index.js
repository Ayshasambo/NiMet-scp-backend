const express = require('express');
const app = express();
const srpRoute = require('./routes/srp.js');
const tempRoute = require('./routes/temp.js');
const cropRoute = require('./routes/crop.js');
const stateRoute = require('./routes/state.js');
const userRoute = require('./routes/user.js');
const authRoute = require('./routes/auth.js');
const mongoose = require('mongoose');
const { application } = require('express');
require('dotenv/config');
//const bodyParser = require('body-parser');


//connect to database
mongoose.connect('mongodb+srv://Aysha:2050@cluster0.4frzr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => console.log('connected to mongodb...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

//middlewares
app.use('/api/srp', srpRoute);
app.use('/api/temp', tempRoute);
app.use('/api/crop', cropRoute);
app.use('/api/state', stateRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);






app.listen(3000);
