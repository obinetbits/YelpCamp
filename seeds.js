var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "Lorem ipsum dolor sit amet, enim urna massa. Leo diam, pellentesque sit, lectus feugiat ipsum pulvinar suspendisse, amet congue nec porta fringilla sed varius, ac blandit nulla felis. Tincidunt augue volutpat, suspendisse vivamus ac. Tellus euismod ultricies aliquam ac nullam lacus, ullamcorper ac iaculis ultrices nunc proin leo, sem sit. Ut eleifend fringilla orci. Aenean augue molestie odio nulla, phasellus porta metus luctus, hendrerit ut lorem nunc massa, sit pellentesque tellus morbi eleifend, sociis nullam. Eget sit aliquam sit mauris."
    },
    {
        name: "Desert Mesa",
        image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
        description: "Curabitur nulla, vitae ullamcorper donec luctus consequat. Montes in cras augue iaculis. Nullam hendrerit, fusce felis, leo at dui aliquet. Consequat in mus a lorem nibh cras, amet interdum sollicitudin pharetra consequat bibendum. Animi sapien hac vestibulum. Diam sit, vestibulum eu numquam. Wisi id, eget at ut nam eleifend id tellus. Augue parturient tellus lobortis tincidunt. Cursus et sit nec, arcu lorem turpis, scelerisque neque ornare, egestas nec vitae amet magna. Erat egestas at dictum in. Eros mauris nisl, sociis odio vitae in, ut orci sit vestibulum nec."
    },
    {
        name: "Canyon Floor",
        image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
        description: "A et proin arcu erat, aliquam dui urna tellus, justo turpis vel ultrices ut duis risus, consectetuer condimentum donec iaculis non suspendisse. Malesuada rhoncus, aliquam fusce tortor, nec nec ridiculus. Nullam platea semper mauris adipiscing ultrices lorem. Amet dignissim vivamus sit tellus sit mauris, eget hendrerit sed orci. Officiis vestibulum odio at, adipiscing sodales dui, nam parturient urna sed, proin mauris nibh fringilla a pede elit, sollicitudin nulla vivamus hendrerit dolor. Ut id suspendisse feugiat mus, est sed morbi. Elit faucibus commodo, interdum eget imperdiet consequat et, nibh orci cursus, mauris arcu amet scelerisque elit."
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