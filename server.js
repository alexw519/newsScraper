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
var db = mongojs(databaseUrl, collections);
db.on("error",function(error)
{
    console.log("Database Error: " + error);
});

//Setting Up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routes
// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.get("/", function(request, response)
{
    response.render("index");
})

app.get("/news", function(request, response)
{
    db.scrapedData.find({}, function(error, found)
    {
        if (error)
            console.log(error)
        else
        {
            var result =
            {   articles: found   }
            response.render("index", result);
        }
    });
});

//Get Function To Scrape Data From Website
app.get("/scrape", function(request, response)
{
    //Uses axios to get data from the URL
    axios.get("https://www.nytimes.com/section/world").then(function(response)
    {
        var $ = cherrio.load(response.data);

        //This Div Name Changes (css-"")
        $(".css-10wtrbd h2").each(function(i, element)
        {
            var result = {};
            result.title = $(this).text();
            result.link = $(element).children().attr("href");
            console.log(result);
            console.log("---------------------------------------");

            db.scrapedData.insert
            ({
                title: result.title,
                link: result.link
            },
            function(error, inserted)
            {
                if (error)
                    console.log(error);
                else   
                    console.log(inserted);
            })

            //Currently Removed Code
            {
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
            }
        })
    })
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