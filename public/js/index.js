$(document).ready()
{
    $(function()
    {
        //When Click, Scrapes The Selected Website
        $("#scrapeButton").on("click", function(error, response)
        {
            event.preventDefault();
            $.ajax("/scrape",
            {
                type: "GET"
            }).then(function(data)
            {
                console.log("Scraped!");
                location.href = "/";
            })
        })

        //
    })
}