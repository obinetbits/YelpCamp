var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

//Root route
router.get("/", function(req, res){
    res.redirect("/campgrounds");
});
 

//===============
//AUTH ROUTES
//===============

// show register form 
router.get("/register", function(req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp!! " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handling login post logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds" ,
        failureRedirect: "/login",
        successFlash: "Welcome Back"
        
    }), function(req, res) {
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You have been logged out");
    res.redirect("/campgrounds");
});

//middleware to check if user is logged in. was here


module.exports = router;