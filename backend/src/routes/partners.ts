import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { verifyToken } from "../middleware/auth";
import Partner from "../models/partners";
import User from "../models/users";
import { HotelOwnerType, UserType } from "../shared/types";
import { generateToken, upload, uploadProfile } from "../shared/utils";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const partners = await Partner.find(
      {},
      { name: 1, profile: 1, country: 1, isVerified: 1 }
    );
    if (!partners)
      return res.status(300).json({ message: "Unavailable partner's data" });

    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty().trim(),
    check("email", "Email is required").notEmpty().isEmail().trim(),
    check("phone", "Phone is required").notEmpty().trim(),
    check("password", "Password is required").trim().isLength({ min: 6 }),
    check("bankName", "Bnak Name is required").notEmpty().trim(),
    check("bankAddress", "Bank Address is required").notEmpty().trim(),
    check("accountNumber", "Account Number is required").notEmpty().trim(),
    check("country", "Country is required").notEmpty().trim(),
    check("hotelAddress", "Hotel Address is required").notEmpty().trim(),
  ],
  upload.single("profile"),
  async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File;
    // todo: validate the file type and secure it

    const result = validationResult(req.body);
    if (!result.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid user data", data: result.array() });
    }

    const userData: UserType = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: "Hotel",
      profile: "",
    };

    delete req.body.password;
    const partnerData: HotelOwnerType = { ...req.body, profile: "" };

    try {
      const checkUser = await User.findOne({ email: partnerData.email });
      if (checkUser)
        return res.status(400).json({ message: "Email already in use!" });

      if (file) {
        const profileUrl = await uploadProfile(file);
        userData.profile = profileUrl;
        partnerData.profile = profileUrl;
      }

      const user = new User(userData);
      const partner = new Partner(partnerData);

      partner._id = user._id;
      await user.save();
      await partner.save();

      const token = generateToken(user._id);

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({ message: "Registration successful" });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// get individual partner's data
router.get("/:userId", verifyToken, async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findById(req.params.userId);
    if (!partner)
      return res.status(400).json({ message: "Partner doesn't exist" });

    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
