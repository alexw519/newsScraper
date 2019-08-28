var db = require("../models");

module.exports = function(app) 
{
  // Render 404 page for any unmatched routes
  app.get("*", function(request, response) 
  {
    response.render("404");
  });
};

