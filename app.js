var express = require("express");
var app = express();

app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    var campGrounds = [
        {name:"Salmon Creek", image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name:"Granite Hill", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"},
        {name:"Mountain Goats's Rest", image:"https://farm4.staticflickr.com/3492/3823130660_0509aa841f.jpg"}
        ]
        
        res.render("campgrounds", {campgrounds:campGrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER HAS STARTED!!!");
});