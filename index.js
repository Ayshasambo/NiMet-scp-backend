const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { application } = require('express');
require('dotenv/config');
const cors = require("cors");



//connect to database
mongoose.connect('mongodb+srv://Aysha:2050@cluster0.4frzr.mongodb.net/nimetapp-backend?retryWrites=true&w=majority')
//mongoose.connect('mongodb://localhost/nimet-scp-backend')

.then(() => console.log('connected to mongodb...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

//routes
app.use(cors());
const srpRoute = require('./routes/srp.js');
const tempRoute = require('./routes/temp.js');
const cropRoute = require('./routes/crop.js');
const stateRoute = require('./routes/state.js');
const alertRoute = require('./routes/alert.js');
const advisoryRoute = require('./routes/advisory.js');
const impactbasedRoute = require('./routes/impactbased.js');


//middlewares 
app.use(express.json());
app.use('/api/srp', srpRoute);
app.use('/api/temp', tempRoute);
app.use('/api/crop', cropRoute);
app.use('/api/state', stateRoute);
app.use('/api/alert', alertRoute);
app.use('/api/advisory', advisoryRoute);
app.use('/api/impactbased', impactbasedRoute);
//app.use('/api/tmp', express.static('tmp'));



app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));

