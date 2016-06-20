var mongoose = require("mongoose");
//var Campground = require("./models/campground");

var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);