require("dotenv").config();

//Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();

var axios = require("axios");
var cherrio = require("cheerio");

//Need To Change To Work With Mongodb
var PORT = process.env.PORT || 5000;

//Middlewear
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

//Setting Up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Starting The Server
app.listen(PORT, function()
{
    console.log("Listening on port " + PORT + "...");
})