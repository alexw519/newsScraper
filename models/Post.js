//Setting Up The Post Object
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Creating The Object With The Schema Constructor
var PostSchema = new Schema
({
    title:
    {
        type: String,
        required: true
    },
    link:
    {
        type: String,
        required: true
    },
    note:
    {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
})

//Creates The Post Object
var Post = mongoose.model("Post", PostSchema);

//Exports THe Post Object
module.exports = Post;