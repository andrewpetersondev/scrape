// dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const morgan = require("morgan");

// configuration and middleware
const PORT = process.env.PORT || 3000;
const app = express();
app.use(morgan("dev")); // use morgan to log results
app.use(express.urlencoded({ extended: true })); // parse request body as json
app.use(express.json()); // parse request body as json
app.use(express.static("public")); // make a public static folder
mongoose.connect('mongodb://localhost/mongoHeadlines', { useNewUrlParser: true });

// routes
app.get("/", function (req, res) {
    res.json(path.join(__dirname, "public/index.html"));
});

// start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!\n");
});