const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const Image = require("./Models/image");
const Register = require("./Models/register");

const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const mongoDB = process.env.MONGO_URI;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Use environment variables
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "art_gallery_uploads", // Folder name in your Cloudinary account
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ storage });

// Image upload route
app.post("/upload", upload.single("image"), (req, res) => {
  const { userId, name, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const newImage = new Image({
    userId,
    imageUrl: req.file.path, // Cloudinary URL for the uploaded image
    name,
    description,
  });

  newImage
    .save()
    .then((image) => res.json({ message: "Image uploaded successfully", image }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Database connection and routes
mongoose.connect(mongoDB)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('Error connecting to MongoDB Atlas:', err));

// Other routes remain the same
app.post("/register", (req, res) => {
  const { email } = req.body;
  Register.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use. Please use a different email." });
      }
      Register.create(req.body)
        .then((register) => res.json(register))
        .catch((error) => res.status(500).json({ error: error.message }));
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.get("/images", (req, res) => {
  Image.find()
    .then((images) => {
      res.json(images);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Register.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "Login successful", userId: user._id });
        } else {
          res.json("Invalid credentials. Please try again.");
        }
      } else {
        res.json("User not found. Please register.");
      }
    })
    .catch((error) => res.json(error));
});

app.get("/profile/:userId", (req, res) => {
  const userId = req.params.userId;
  Register.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      Image.find({ userId: userId })
        .then((images) => {
          res.json({
            email: user.email,
            username: user.username,
            bio: user.bio,
            avatar: user.avatar,
            artworks: images,
          });
        })
        .catch((err) => res.status(500).json({ error: "Error fetching images" }));
    })
    .catch((err) => res.status(500).json({ error: "Error fetching user" }));
});

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
