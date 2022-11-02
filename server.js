const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

var mongoDatabase = 'mongodb+srv://x_mod_i:dipanshu123@cluster0.tsalepk.mongodb.net/Userdb?retryWrites=true&w=majority';

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

const app = express();

// All the express routes
const userRoute = require('./routes/User');
app.use(bodyParser.urlencoded({ extended: true }))

// Convert incoming data to JSON format
app.use(bodyParser.json());

// Enabled CORS
app.use(cors());

// Setup for the server port number
const port = process.env.PORT || 4000;

// Routes Configuration
app.use('/User', userRoute);

// Staring our express server
app.listen(port, function() {
    console.log('Server Listening On Port : ' + port);
});
