const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { application } = require('express');
require('dotenv/config');
const cors = require("cors");

const path = require('path');


//connect to database
mongoose.connect(process.env.DB_CONNECTION)
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
app.use('/api/impactbased', impactbasedRoute);;
app.use(express.static('dashboard/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dashboard', 'build', 'index.html'));
  });

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));

