var db = require("../models");

module.exports = function(app) 
{
  // app.get("/scrape", function(request, response)
  // {
  //   axios.get("https://www.old.reddit.com/new").then(function(response)
  //   {

  //   })
  //   response.render("index");
  // })
  // Render 404 page for any unmatched routes
  app.get("*", function(request, response) 
  {
    response.render("404");
  });
};

