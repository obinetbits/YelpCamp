var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "A nice place to rest on the cloud"
    },
    {
        name: "Desert Mesa",
        image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
        description: "Come a have a desert like kind of camping"
    },
    {
        name: "Canyon Floor",
        image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
        description: "A camping ground with style"
    }
    ];

function seedDB(){
//Remove All Campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed Campgrounds!!");
            //Add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                         console.log("added campgrounds");
                         //Add a few comments
                         Comment.create(
                             {
                                 text: "What a beautiful campground you have here, is there internet?",
                                 author: "Homer"
                             }, function(err, comment){
                                 if(err){
                                     console.log(err);
                                 } else {
                                     campground.comments.push(comment);
                                     campground.save();
                                     console.log("Created new comment");
                                 }
                             });
                    }
                });
            });
        }
    });
    
    
}

module.exports = seedDB;