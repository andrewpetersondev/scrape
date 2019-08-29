// global variables
// ======================================================================
const articleContainer = $(".article-container");



// functions
// ======================================================================

function loadPage() {

}

// function renderArticles(articles){}

function showEmptyPageMessage() {
    let emptyMessage = $("<div class='alert text-center'><h4>There are no articles to display. Click the scrape button at the top of the screen to see more articles.</h4></div>");
    articleContainer.append(emptyMessage);
}

function createCard(article) {
    let card = $("<div class='card'>"); // add data-id="whatever" so that each card can be selected
    let cardHeader = $("<div class='card-header'>");
    let cardHeaderTitle = $("<h3>");
    let cardHeaderLink = $("<a class='article-link' target='_blank' rel='noopener noreferrer'>").attr("href", article.link).text(article.title);
    let saveButton = $("<a class='btn btn-success save'>Save Article</a>");
    let cardBody = $("<div class='card-body'>").text(article.summary);
    cardHeader.append(cardHeaderTitle, cardHeaderLink, saveButton);
    card.append(cardHeader, cardBody);
    card.data("_id", article._id);
}

// function saveArticle(){}

// function renderNotesList(data){}

// function renderArticleNotes(event){}

// function saveArticleNote(){}

// function deleteArticleNote(){}

// function deleteArticle(){}

// function clearArticles(){}




// events
// ======================================================================
$(document).ready(function () {
    console.log("document is ready");

    // grab the articles as a json
    jQuery.getJSON("/articles", function (data) {
        for (let i = 0; i < data.length; i++) {
            $(".article-container").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        }
    });

    // click an article

    // click save note button

    // click delete note button 
});