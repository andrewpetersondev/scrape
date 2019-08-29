# scrape

Week 18

## Configuration

### NPM Packages

axios

- promise based http client for the browser and node.js

cheerio

- cheerio parses markup and provides an API for traversing/manipulating the resulting data structure. It does not interpret the result as a web browser does. Specifically, it does not produce a visual rendering, apply CSS, load external resources, or execute JavaScript.

express

- fast, unopinionated, minimalist web framework for node.

express-handlebars

- handlebars view engine for express

mongoose

- mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

morgan

- morgan is a http request logger middleware for node.js

### Deployment with Heroku

- In order to deploy to Heroku, set up an mLab provision. mLab is remote MongoDB database that Heroku supports natively. Follow these steps to get it running
- Create a Heroku app in your project directory.
- Run this command in your Terminal/Bash window:
- heroku addons:create mongolab
- This command will add the free mLab provision to your project.
