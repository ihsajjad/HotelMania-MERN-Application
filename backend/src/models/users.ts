import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { UserType } from "../shared/types";

const userSchema = new mongoose.Schema<UserType>({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: { type: String, required: [true, "Password is required"] },
  profile: { type: String },
  role: {
    type: String,
    enum: ["Admin", "User", "Sub Admin", "Hotel"],
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
