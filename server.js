var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs  = require('express-handlebars');

var request = require('request');
var cheerio = require('cheerio');
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Require our userModel model
// import User from "./models/User.js";
var Article = require("./models/Article.js");

// Initialize Express
var app = express();

//Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
// app.use(express.static("public"));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Database configuration with mongoose
mongoose.connect("mongodb://heroku_ttdcg5mp:6gplnkdrpbmv3ou7pqsjj1qd47@ds161890.mlab.com:61890/heroku_ttdcg5mp");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});



var PORT = process.env.PORT || 3000;





   

app.get('/', function (req, res) {
    request('http://www.palestinechronicle.com/', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            $('h2.postTitle').each(function(i, element){
            var a = $(this).children();
            var url = a.attr('href');
            var title = a.text();
            var art = new Article ({
                link: url,
                title: title
            });
        art.save( function(err,res){
            if (err) {
                console.log("duplicate ignored")
            }
        })
  });
   };
  
});

    Article.find({}, function(err, docs) {
    if (!err){ 
        res.render('home' ,{articles: docs})
    } else {throw err;}
});  
});


app.post('/comment', function (req, res) {
    Article.findByIdAndUpdate(
        req.body._id,
        {$push: {"comments": { body: req.body.comment, username: req.body.user}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
            return res.json(req.body)
        }
        
    );

});  

app.post('/delCom', function(req,res){
    Article.findByIdAndUpdate(
        req.body.art,
        {$pull: {"comments": { _id: req.body.comment}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
            return res.json(req.body)
        
        }
        
    );
})


app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
