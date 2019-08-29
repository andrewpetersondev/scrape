$(document).ready(function () {

    // grab the articles as a json
    $.getJSON("/articles", function (data) {
        for (let i = 0; i < data.length; i++) {
            $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        }
    });

    // click a p tag

    // click save note button

    // click delete note button 
});