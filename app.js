var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I must become the the best Software Engineer humanly possible",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

//===============
//AUTH ROUTES
//===============

// register form route
app.get("/register", function(req, res) {
    res.render("register");
});

//handle sign up logic
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER HAS STARTED!!!");
});