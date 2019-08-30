//Setting Up A Note Object
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Creating NoteScema object using the Schema constructor
var NoteSchema = new Schema
({
    title: String,
    body: String
});

//Creates The Note Object
var Note = mongoose.model("Note", NoteSchema);

//Exporting The Note Object
module.exports = Note;