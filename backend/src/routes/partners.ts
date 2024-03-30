import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Partner from "../models/hotelOwners";
import User from "../models/users";
import { HotelOwnerType, UserType } from "../shared/types";
import { upload, uploadProfile } from "../shared/utils";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().trim().withMessage("Name is required"),
    body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
    body("phone").notEmpty().trim().withMessage("Phone is required"),
    body("password").notEmpty().trim().withMessage("Password is required"),
    body("bankName").notEmpty().trim().withMessage("Bnak Name is required"),
    body("bankAddress")
      .notEmpty()
      .trim()
      .withMessage("Bank Address is required"),
    body("accountNumber")
      .notEmpty()
      .trim()
      .withMessage("Account Number is required"),
    body("country").notEmpty().trim().withMessage("Country is required"),
    body("hotelAddress")
      .notEmpty()
      .trim()
      .withMessage("Hotel Address is required"),
  ],
  upload.single("profile"),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    const file = req.file as Express.Multer.File;

    if (!result.isEmpty() || !file) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const userData: UserType = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: "Hotel",
      profile: "",
    };

    delete req.body.password;
    const partnerData: HotelOwnerType = req.body;

    try {
      const checkUser = await User.findOne({ email: partnerData.email });
      if (checkUser)
        return res.status(400).json({ message: "Email already in use!" });

      const profileUrl = await uploadProfile(file);
      userData.profile = profileUrl;
      partnerData.profile = profileUrl;

      const user = new User(userData);
      const partner = new Partner(partnerData);

      partner._id = user._id;
      await user.save();
      await partner.save();

      res.status(200).json({ message: "Registration successful" });
    } catch (error: any) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
