const db = require("../models/index");

module.exports = app => {
    app.get("/", (req, res) => {
        console.log('i am the / route')
        db.Article.findAll({})
            .sort({ timestamp: "desc" })
            .then(dbArticle => {
                const hbsObject = {
                    articles: dbArticle
                };
                console.log(hbsObject);

                res.render("index", hbsObject);
            });
    });


};