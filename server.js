const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.get("/", function (req, res) {
  res.send("hello world");
});

// Connecting db

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("There is problem while connecting database " + err);
    }
  );

// All the express routes
const userRoute = require("./routes/User");
app.use(bodyParser.urlencoded({ extended: true }));

// Convert incoming data to JSON format
app.use(bodyParser.json());

// Enabled CORS
app.use(cors());

// Setup for the server port number
const port = process.env.PORT || 8000;

// Routes Configuration
app.use("/user", userRoute);

// Staring our express server
app.listen(port, function () {
  console.log("Server Listening On Port : " + port);
});
