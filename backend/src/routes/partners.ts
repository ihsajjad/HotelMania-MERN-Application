import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { verifyAdmin, verifyToken } from "../middleware/auth";
import Partner from "../models/partners";
import User from "../models/users";
import { HotelOwnerType, UserType } from "../shared/types";
import { generateToken, upload, uploadProfile } from "../shared/utils";

const router = express.Router();

// get all the partners for admin
router.get(
  "/",
  verifyToken,
  verifyAdmin,
  async (req: Request, res: Response) => {
    try {
      // start pagiantion
      const total = await Partner.countDocuments();

      const itemsPerPage = parseInt(
        req.query.itemsPerPage ? req.query.itemsPerPage.toString() : "10"
      );

      let pageNumber = parseInt(
        req.query.pageNumber ? req.query.pageNumber.toString() : "1"
      );

      if (total <= itemsPerPage) pageNumber = 1;

      const skip = (pageNumber - 1) * itemsPerPage;
      // end pagination

      const partners = await Partner.find()
        .select("name profile country isVerified")
        .skip(skip)
        .limit(itemsPerPage);

      const response = {
        data: partners,
        pagination: {
          total,
          page: pageNumber,
          pages: Math.ceil(total / itemsPerPage),
        },
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// register partners
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

// update isVerified status
router.put(
  "/:userId",
  verifyToken,
  verifyAdmin,
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const isVerified = req.query.isVerified;

    try {
      const partner = await Partner.findById(userId);
      if (!partner)
        return res.status(400).json({ message: "Partner doesn't exist" });

      if (isVerified === "true") {
        partner.isVerified = true;
      } else if (isVerified === "false") {
        partner.isVerified = false;
      }

      partner.save();
      res.json({ message: "Status changed successfully" });
    } catch (error) {
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
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
