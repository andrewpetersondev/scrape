// dependencies and packages
// ======================================================================
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const mongoose = require("mongoose");

// configuration and middleware
const PORT = process.env.PORT || 3000;
const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// app.use("/public", express.static(__dirname + "/public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// routes
// ======================================================================

// route to get the homepage, simultaneously displaying content from db if there is any
app.get("/", function (req, res) {
    Article.find({})
        .sort()
    // res.render('index');
});

// route to scrape tech crunch
app.get("/scrape", function (req, res) {

    axios.get("https://techcrunch.com/")

        .then(function (response) {

            console.log(response);

            // If you need to modify parsing options for XML input, you may pass an extra object to .load():
            const $ = cheerio.load(response.data, {
                xml: {
                    normalizeWhitespace: true,
                }
            });

            $("article").each(function (i, element) {

                const result = {};

                result.title = $(this)
                    .children("header")
                    .children("h2")
                    .children("a")
                    .text();

                result.link = $(this)
                    .children("header")
                    .children("h2")
                    .children("a")
                    .attr("href");

                result.summary = $(this)
                    .children("div")
                    .children("p")
                    .text();

                console.log(result);

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
app.listen(PORT, () => console.log(`Example app listening on PORT ${PORT}!`))