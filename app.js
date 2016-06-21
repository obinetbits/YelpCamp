var express = require("express");
var app = express();
var bodyParser= require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();



/*var campGrounds = [
        {name:"Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name:"Granite Hill", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
        {name:"Mountain Goats's Rest", image:"https://farm4.staticflickr.com/3492/3823130660_0509aa841f.jpg"},
        {name:"Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name:"Granite Hill", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
        {name:"Mountain Goats's Rest", image:"https://farm4.staticflickr.com/3492/3823130660_0509aa841f.jpg"},
        {name:"Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name:"Granite Hill", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
        {name:"Mountain Goats's Rest", image:"https://farm4.staticflickr.com/3492/3823130660_0509aa841f.jpg"}
        ];*/

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
      //  res.render("campgrounds", {campgrounds:campGrounds});
      //Get all cmpgrounds form db
      Campground.find({}, function(err, allCampgrounds){
          if(err){
              console.log(err);
          } else{
              res.render("campgrounds/index", {campgrounds:allCampgrounds});
          }
      });
});

app.post("/campgrounds", function(req, res){
    //get dta from form and add to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
   // Create a new campground
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
       }
   });
   });

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

//Show more info about one camproung
app.get("/campgrounds/:id", function(req, res){
    //find the camgrounds with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           console.log(foundCampground);
           //render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
    //render show template with that campground
 });
 
 //====================
 //COMMENTS ROUTES
 //====================
 
app.get("/campgrounds/:id/comments/new", function(req, res) {
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

//COMMENT POST
app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              } else {
                  //connect new comment to campground
                  campground.comments.push(comment);
                  campground.save();
                  //redirect campground show page
                  res.redirect("/campgrounds/" + campground._id);
              }
            }); 
        }
    });
    
    
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER HAS STARTED!!!");
});