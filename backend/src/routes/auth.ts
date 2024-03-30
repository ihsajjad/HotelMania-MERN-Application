import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/users";
import { generateToken } from "../shared/utils";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail().trim(),
    check("password", "Password is required").isString(),
  ],
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res
        .status(400)
        .json({ message: "Invalid credentials", data: result.array() });

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = generateToken(user._id);

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

router.post("/logout", async (req: Request, res: Response) => {
  res.cookie("auth_token", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logout successful" });
});

export default router;
