// Models/image.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Register", required: true },
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },  // New field for artist name
  description: { type: String, required: true }, // New field for image description
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
