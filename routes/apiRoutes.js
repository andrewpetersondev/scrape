const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");
const express = require("express");
const app = express();
const router = express.Router();
const db = require("../models/index");



// route to get the homepage, simultaneously displaying content from db if there is any
router.get("/", function (req, res) {
    Article.find({})
        .sort()
    // res.render('index');
});

// route to scrape tech crunch
router.get("/scrape", function (req, res) {
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
                    .children("div.post-block__content")
                    .text();
                console.log(result);
                db.Article
                    .create(result)
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
router.get("/articles", function (req, res) {
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
router.get("/articles/:id", function (req, res) {
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
router.post("/articles/:id", function (req, res) {
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

module.exports = router;
