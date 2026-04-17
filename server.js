// Imports
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

// App setup
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Models
const User = require("./models/User");

// Routes

/**
 * GET / - Health check endpoint
 * Returns a simple message to verify the API is working
 */
app.get("/", (req, res) => {
  res.send("API is working");
});

/**
 * GET /users - Retrieve all users from the database
 * Returns an array of all users
 */
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
      message: "Users retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message
    });
  }
});

/**
 * POST /users - Add a new user to the database
 * Expects: { name: string, email: string, age: number }
 * Returns: The newly created user object
 */
app.post("/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required"
      });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      age
    });

    // Save to database
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      data: savedUser,
      message: "User created successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message
    });
  }
});

/**
 * PUT /users/:id - Edit a user by their ID
 * Expects: { name: string, email: string, age: number }
 * Returns: The updated user object
 */
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true, runValidators: true } // Return updated doc and validate
    );

    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message
    });
  }
});

/**
 * DELETE /users/:id - Remove a user by their ID
 * Expects: User ID in URL parameter
 * Returns: Confirmation message
 */
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(id);

    // Check if user exists
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: deletedUser,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message
    });
  }
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // Start server only after DB connects
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });