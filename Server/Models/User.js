const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String, // This can store the URL of the uploaded avatar
  },
  bio: {
    type: String, // Short bio of the user
  },
});

module.exports = mongoose.model("User", userSchema);
