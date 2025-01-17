const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const Image = require("./Models/image");
const Register = require("./Models/register");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
// Serve static files from the "Uploads" folder
app.use('/uploads', express.static('Uploads'));

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Image upload route
app.post("/upload", upload.single("image"), (req, res) => {
  const { userId, name, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const newImage = new Image({
    userId,
    imageUrl: `uploads/${req.file.filename}`,
    name,
    description,
  });

  newImage
    .save()
    .then((image) => res.json({ message: "Image uploaded successfully", image }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Database connection and routes
// mongoose.connect("mongodb://localhost:27017/art_gallery");
mongoose.connect("mongodb+srv://hardikjain108:1234*Hj*1234@database.n27em.mongodb.net/");


app.post("/register", (req, res) => {
    const { email } = req.body;
  
    // Check if the email already exists in the database
    Register.findOne({ email: email })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).json({ message: "Email is already in use. Please use a different email." });
        }
  
        // If no existing user, create a new one
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

// Add a new route to fetch the profile data and uploaded images for a specific user
app.get("/profile/:userId", (req, res) => {
    const userId = req.params.userId;
    
    // Find user by ID and also fetch the uploaded images
    Register.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        // Fetch images uploaded by the user
        Image.find({ userId: userId })
          .then((images) => {
            res.json({
              email: user.email,
              username: user.username,
              bio: user.bio,
              avatar: user.avatar,
              artworks: images,  // Include the user's uploaded images
            });
          })
          .catch((err) => res.status(500).json({ error: "Error fetching images" }));
      })
      .catch((err) => res.status(500).json({ error: "Error fetching user" }));
  });
  

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
