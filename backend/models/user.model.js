import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
}, {
  timestamps: true
});

userSchema.pre("save", async function (next) {

  try {

    if (!this.isModified("password")) return next();

    // Hash the password before saving into the database
    const saltkey = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltkey);

  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
})

export const User = mongoose.model("User", userSchema);