// imported to enable the application to connect to a MongoDB database and perform database operations,
const mongoose = require("mongoose");

//the entire shcema is nested object
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
      maxlength: [150, "Bio cannot exceed 150 characters"],
    },
  },
  { timestamps: true },
);
