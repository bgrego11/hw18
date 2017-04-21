var mongoose = require("mongoose");

// Create the Schema class
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  // firstName: a trimmed, required string
  firstName: {
    type: String,
    trim: true,
    required: "First Name is Required"
  },
  // lastName: a trimmed, required string
  lastName: {
    type: String,
    trim: true,
    required: "Last Name is Required"
  },
  // username: a trimmed, required string
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  // password: a trimmed, required string that must be more than 6 chars
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be longer."
    ]
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  // lastUpdated: a date type entry
  lastUpdated: { type: Date },
  // fullName: a string type entry
});

var User = mongoose.model("User", UserSchema);

// Export the model so the server can use it
export default User;