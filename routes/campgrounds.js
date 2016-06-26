var express = require("express"),
    router  = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware"); //  "../middleware" was used bcos the required content is in index.js otherwise the full path has to be specified
    


//INDEX ROUTE - show all campgrounds
router.get("/", function(req, res) {
      //Get all campgrounds form db
      Campground.find({}, function(err, allCampgrounds){
          if(err){
              console.log(err);
          } else{
              res.render("campgrounds/index", {campgrounds:allCampgrounds});
          }
      });
});

//Create Route - Post new campground to db
router.post("/", middleware.isLoggedIn, function(req, res){
    //get dta from form and add to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    //declare and asign variables for author object
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newCampground = {name: name, image: image, description: desc, author:author};
   // Create a new campground
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           req.flash("error", err.message);
           console.log(err);
       } else {
            req.flash("success", newlyCreated.name + " has been successfully added to Campgrounds");
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
       }
   });
   });

//New - show create new campground form
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
 
 //EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
      
});
 
 //UPDATE CAMPGROUND ROUTE
 router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            //redirect somewhere(show page)
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
 });
 
 //DESTROY CAMPGROUND ROUTE
 router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
     Campground.findByIdAndRemove(req.params.id, function(err){
         if(err){
             res.redirect("/campgrounds");
         } else {
             res.redirect("/campgrounds");
         }
     });
 });
 
 //middleware was here


//another middleware was here

 
 module.exports = router;