import cloudinary from "cloudinary";
import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../models/users";

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

router.post(
  "/register",
  [
    body("name").notEmpty().trim().withMessage("Name is required"),
    body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
    body("password").notEmpty().trim().withMessage("Password is required"),
  ],
  upload.single("profile"),
  async (req: Request, res: Response) => {
    const result = validationResult(req.body);

    if (!result.isEmpty())
      return res.status(401).json({ message: result.array(), type: "ERROR" });

    try {
      const userData = req.body;
      const profile = req.file as Express.Multer.File;

      const haveUser = await User.findOne({ email: req.body.email });
      if (haveUser)
        return res
          .status(400)
          .json({ message: "User already exists!", type: "ERROR" });

      if (profile) {
        userData.profile = await uploadProfile(profile);
      }
      userData.role = "User";

      const user = new User(userData);
      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res
        .status(200)
        .json({ message: "Account created successfully", type: "SUCCESS" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", type: "Error" });
    }
  }
);

async function uploadProfile(profile: any) {
  const b64 = Buffer.from(profile.buffer).toString("base64");
  const dataURI = "data:" + profile.mimetype + ";base64," + b64;
  const profileUrl = await cloudinary.v2.uploader.upload(dataURI);
  return profileUrl.url;
}
export default router;
