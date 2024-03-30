import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/users";
import { UserType } from "../shared/types";
import { generateToken, upload, uploadProfile } from "./../shared/utils";

const router = express.Router();

router.get("/me", async (req: Request, res: Response) => {
  try {
    const token = req.cookies["auth_token"];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    const userId = (decoded as JwtPayload).userId;

    const user = await User.findById(userId, { email: 1, role: 1, profile: 1 });

    if (!user) return res.status(400).json({ message: "Something went wrong" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post(
  "/register",
  [
    check("name", "Name is required").isString().notEmpty().trim(),
    check("email", "Email is required").isEmail().trim(),
    check("password", "Password is required").trim().isLength({ min: 6 }),
  ],
  upload.single("profile"),
  async (req: Request, res: Response) => {
    const result = validationResult(req.body);

    if (!result.isEmpty())
      return res
        .status(400)
        .json({ message: "Invalid user data", data: result.array() });

    try {
      const userData: UserType = { ...req.body, profile: "", role: "User" };
      const file = req.file as Express.Multer.File;
      // todo: validate the file type and secure it

      const haveUser = await User.findOne({ email: req.body.email });
      if (haveUser)
        return res.status(400).json({ message: "Email already in use!" });

      if (file) {
        userData.profile = await uploadProfile(file);
      }

      const user = new User(userData);
      await user.save();

      const token = generateToken(user._id);

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({ message: "Account created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
