import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/users";
import { upload, uploadProfile } from "./../shared/utils";

const router = express.Router();

router.get("/me", async (req: Request, res: Response) => {
  try {
    const token = req.cookies["auth_token"];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    const userId = (decoded as JwtPayload).userId;

    const user = await User.findById(userId, "email profile role");
    if (!user) return res.status(400).json({ message: "Something went wrong" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post(
  "/register",
  [
    body("name").notEmpty().trim().withMessage("Name is required"),
    body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
    body("password").notEmpty().trim().withMessage("Password is required"),
  ],
  upload.single("profile"),
  async (req: Request, res: Response) => {
    const result = validationResult(req);

    if (!result.isEmpty())
      return res.status(400).json({ message: result.array(), type: "ERROR" });

    try {
      const userData = req.body;
      const profile = req.file as Express.Multer.File;

      const haveUser = await User.findOne({ email: req.body.email });
      if (haveUser)
        return res
          .status(400)
          .json({ message: "Email already in use!", type: "ERROR" });

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

export default router;
