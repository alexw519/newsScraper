// $("#scrapeButton").on("click", function(error, response)
// {
//     $ajax({
//         method: "GET"
//         //,url: "/posts/" + thisId
//     }).then(function(data)
//     {

//     })
// })

$("#scrapeButton").on("click", function(error, response)
{
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
})