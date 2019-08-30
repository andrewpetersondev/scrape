// packages
// ======================================================================
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const morgan = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;

// require all the models
const db = require("./models");

// initialize express
const app = express();

// configure middleware
// ======================================================================
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// express handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// connect to mongo db
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// routes
// ======================================================================

// route to get the homepage, simultaneously displaying content from db if there is any
app.get("/", function (req, res) {
    console.log('i am the / route')
    // db.Article.find({ _id: '5d6873ef22b460dbcefd1835' })
    db.Article.find({})
        //  .sort({ timestamp: "desc" })
        .then(dbArticle => {
            const hbsObject = {
                articles: dbArticle
            };
            console.log(hbsObject, "I am the object");

            res.render("index", hbsObject);
        });

    // res.render('index');
});

// route to scrape tech crunch
app.get("/scrape", function (req, res) {
    axios.get("https://techcrunch.com/")
        .then(function (response) {
            // console.log(response);
            // If you need to modify parsing options for XML input, you may pass an extra object to .load():
            const $ = cheerio.load(response.data, {
                xml: {
                    normalizeWhitespace: true,
                }
            });
            $("div.post-block").each(function (i, element) {
                const results = {};
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
                    .children("div.post-block__content")
                    .text();

                console.log(results);

                // Save these results in an object that we'll push into the results array we defined earlier
                // result.push({
                //     title: title,
                //     link: link,
                //     summary: summary
                // });

                db.Article
                    .create(results)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                        res.json(dbArticle);
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
    models.Article
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
    models.Note
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
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}!`))