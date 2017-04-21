var mongoose = require("mongoose");

// Create the Schema class
var Schema = mongoose.Schema;

var artSchema = new Schema({
  // firstName: a trimmed, required string
  link: {
    type: String,
    trim: true,
    required: "link is Required",
    unique: true
  },
  // lastName: a trimmed, required string
  title: {
    type: String,
    unique: true,
    trim: true,
    required: "title is Required",
    dropDups: true
  },
  comments: [{
        body: String,
        username: String,
        date: {
            type: Date,
            default: Date.now
        }
        }],
  // password: a trimmed, required string that must be more than 6 chars
  
  // lastUpdated: a date type entry
 
  // fullName: a string type entry
});

var Article = mongoose.model("Article", artSchema);

// Export the model so the server can use it
module.exports = Article;