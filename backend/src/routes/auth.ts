import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/users";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isEmail().withMessage("Password is required"),
  ],
  async (req: Request, res: Response) => {
    const result = validationResult(req.body);

    if (!result.isEmpty())
      return res.status(400).json({ message: result.array() });

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).json({ message: "Login Successfull" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
