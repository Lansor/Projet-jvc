import mongoose from "mongoose";
import { hashPasswordBeforeSave } from "../utils/password.utils.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
);

// Hash du mot de passe avant sauvegarde
userSchema.pre("save", hashPasswordBeforeSave);

export const User = mongoose.model("User", userSchema);
