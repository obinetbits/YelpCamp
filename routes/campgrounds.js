var express = require("express"),
    router  = express.Router(),
    Campground = require("../models/campground");


//INDEX ROUTE - show all campgrounds
router.get("/", function(req, res) {
      //Get all cmpgrounds form db
      Campground.find({}, function(err, allCampgrounds){
          if(err){
              console.log(err);
          } else{
              res.render("campgrounds/index", {campgrounds:allCampgrounds});
          }
      });
});

//Create Route - Post new campground to db
router.post("/", function(req, res){
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

//New - show create new campground form
router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});

//Show - show more info about one campground
router.get("/:id", function(req, res){
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
 });
 
 module.exports = router;