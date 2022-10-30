const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

var mongoDatabase = 'mongodb+srv://x_mod_i:dipanshu@123@cluster0.astbkid.mongodb.net/test';

const app = express();
mongoose.Promise = global.Promise;

// Connecting db
mongoose.connect(mongoDatabase, {
    useNewUrlParser: true
}).then(
    () => {
        console.log('Database is connected')
    },
    err => {
        console.log('There is problem while connecting database ' + err)
    }
);

// All the express routes
const userRoutes = require('./routes/userRoutes');

// Convert incoming data to JSON format
app.use(bodyParser.json());

// Enabled CORS
app.use(cors());

// Setup for the server port number
const port = process.env.PORT || 4000;

// Routes Configuration
app.use('/users', userRoutes);

// Staring our express server
const server = app.listen(port, function() {
    console.log('Server Listening On Port : ' + port);
});
