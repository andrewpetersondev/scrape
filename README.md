# scrape

Week 18

## Configuration

### NPM PACKAGES

#### AXIOS

- promise based http client for the browser and node.js

#### CHEERIO

- cheerio parses markup and provides an API for traversing/manipulating the resulting data structure. It does not interpret the result as a web browser does. Specifically, it does not produce a visual rendering, apply CSS, load external resources, or execute JavaScript.

#### EXPRESS

- fast, unopinionated, minimalist web framework for node.

#### EXPRESS-HANDLEBARS

- handlebars view engine for express

#### MONGOOSE

[mongoose documentation](https://mongoosejs.com/)

[Read this Article](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)

[npm](https://www.npmjs.com/package/mongoose)

##### FAQ

Q. What is mongoose?

A. Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

Q. Why use mongoose?

A. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB. MongoDB is a schema-less NoSQL document database. It means you can store JSON documents in it, and the structure of these documents can vary as it is not enforced like SQL databases. This is one of the advantages of using NoSQL as it speeds up application development and reduces the complexity of deployments.

Q. What is the name of the database this app is using?

A. mongoHeadlines

##### Connecting to MongoDB

- First, we need to define a connection. If your app uses only one database, you should use mongoose.connect. If you need to create additional connections, use mongoose.createConnection.

- This project needs only one database.

Note: If the local connection fails then try using 127.0.0.1 instead of localhost. Sometimes issues may arise when the local hostname has been changed.

##### Defining a Model

Models are defined through the Schema interface.

```js
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});
```

#### morgan

- morgan is a http request logger middleware for node.js

### Deployment with Heroku

- In order to deploy to Heroku, set up an mLab provision. mLab is remote MongoDB database that Heroku supports natively. Follow these steps to get it running
- Create a Heroku app in your project directory.
- Run this command in your Terminal/Bash window:
- heroku addons:create mongolab
- This command will add the free mLab provision to your project.

### Methods

jQuery.getJSON(url[,data][,success])

- load JSON encoded data from the server using a GET HTTP request
