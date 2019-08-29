// dependencies
// ======================================================================

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const morgan = require("morgan");
const db = require("./models");

// configuration and middleware
// ======================================================================

const PORT = process.env.PORT || 3000;
const app = express();
app.use(morgan("dev")); // use morgan to log results
app.use(express.urlencoded({ extended: true })); // parse request body as json
app.use(express.json()); // parse request body as json
app.use(express.static("public")); // make a public static folder
mongoose.connect('mongodb://localhost/mongoHeadlines', { useNewUrlParser: true });

// routes
// ======================================================================

// route to get the homepage
app.get("/", function (req, res) {
    res.json(path.join(__dirname, "public/index.html"));
});

// route to scrape daily hodl
app.get("/scrape", function (req, res) {
    axios
        .get("http://www.echojs.com/")
        .then(function (response) {
            // console.log(response);
            let $ = cheerio.load(response.data);
            $("article h2").each(function (i, element) {
                let result = {};
                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");
                // result.topic = $(this).children()
                // console.log(result);
                db.Article
                    .create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    // .finally(function () { });
    res.send("Scrape Complete");
});

// route for getting all articles from the db
app.get("/articles", function (req, res) {
    db.Article
        .find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// route for grabbing article by id and populating with its note
app.get("/articles/:id", function (req, res) {
    db.Article
        .findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

// route for saving/updating an articles associated note
app.post("/articles/:id", function (req, res) {
    db.Note
        .create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});


// start the server
// ======================================================================
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!\n");
});