require("dotenv").config();

//Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cherrio = require("cheerio");
var mongojs = require("mongojs");

//Need To Change To Work With Mongodb
var PORT = process.env.PORT || 5000;
// var db = require("./models");

//Middlewear
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku:alexander19@ds351987.mlab.com:51987/heroku_9l87hlfx";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
let databaseUrl = "scraper";
var collections = ["scrapedData"];
// var db = mongojs(databaseUrl, collections);
// db.on("error",function(error)
// {
//     console.log("Database Error: " + error);
// });

//Setting Up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routes
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

//Get Function To Scrape Data From Website
app.get("/scrape", function(request, response)
{
    //Uses axios to get data from the URL
    // axios.get("https://old.reddit.com/r/news").then(function(response)
    axios.get("https://www.nytimes.com/section/world").then(function(response)
    {
        var $ = cherrio.load(response.data);

        //Getting everything with a p tag and a class of "title"
        $(".css-4jyr1y h2").each(function(i, element)
        {
            var result = {};
            result.title = $(this).text();
            // result.link = $(this).attr("href");
            console.log(result);
            console.log("---------------------------------------");

            // db.scrapedData.insert
            // ({
            //     title: result.title,
            //     link: result.link
            // }),
            // function(error, inserted)
            // {
            //     if (error)
            //         console.log(error);
            //     else
            //         console.log(inserted);
            // }
            // db.Post.create(result)
            //     .then(function(dbPost)
            //     {
            //         console.log(dbPost);
            //     })
            //     .catch(function(error)
            //     {
            //         console.log(error);
            //     })
        })
    })
    // response.send("Scrape Complete");
    response.render("index");

})

// Render 404 page for any unmatched routes
app.get("*", function(request, response) 
{
    response.render("404");
});

//Starting The Server
app.listen(PORT, function()
{
    console.log("Listening on port " + PORT + "...");
})