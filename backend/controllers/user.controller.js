import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const handleUserSignup = async (req, res) => {
  const { username, email, password } = req.body;

  try {

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" })
    };

    // Check if the email or username already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // create new user
    const newUser = await User.create({
      username, email, password
    });

    // generating token for the newly created user
    const token = jwt.sign({ id: newUser._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    })

    return res.status(201).json({ message: "User Registered Successfully!", token, data: newUser })

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Signup Error" });
  }
}


export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {

    // Ensure required fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find user by either username or email
    const registeredUser = await User.findOne({ email });

    if (!registeredUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, registeredUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    // generating token for loggedin user
    const token = await jwt.sign({ id: registeredUser._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    })

    // send response
    return res.status(200).json({ message: "Login successful", token, data: registeredUser });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error in user login" })
  }
}

export const handleGetUserProfile = async (req, res) => {

  try {

    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "User not loggedIn" })
    }

    //find the user
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Profile not found" })
    }

    // send user details
    return res.status(200).json({ message: "Fetched User Profile successfully!", data: user });


  } catch (error) {
    return res.status(500).json({ error: "Failed to get user profile" });

  }
}

