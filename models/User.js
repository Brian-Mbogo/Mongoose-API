// Import mongoose
const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number
  }
});

// Export model
module.exports = mongoose.model("User", userSchema);