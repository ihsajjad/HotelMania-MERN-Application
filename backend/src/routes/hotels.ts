import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { verifyHotelOwner, verifyToken } from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelDataType } from "../shared/types";
import { upload, uploadProfile } from "../shared/utils";

const router = express.Router();

// get all the hotels for individual user
router.get(
  "/:id",
  [check("id", "Invalid user id").notEmpty().trim()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ message: "Invalid user id", data: errors.array() });

    try {
      const hotels = await Hotel.find({ userId: req.params.id });
      if (!hotels) return res.json({ message: "Hotel not found" });

      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post(
  "/add-hotel",
  [
    check("name", "Name is rquired").notEmpty().trim(),
    check("description", "Description is rquired").notEmpty(),
    check("city", "City is rquired").notEmpty().trim(),
    check("country", "Country is rquired").notEmpty().trim(),
    check("type", "Type is rquired").notEmpty().trim(),
    check("pricePerNight", "Price per night is rquired").isNumeric().trim(),
    check("adultCount", "Adult count is rquired").isNumeric().trim(),
    check("childCount", "Child count is rquired").isNumeric().trim(),
    check("facilities", "Facilities are rquired").isArray(),
    check("images", "Images are rquired").isArray(),
  ],
  verifyToken,
  verifyHotelOwner,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ message: "Invalid hotel data", data: errors.array() });

    try {
      const hotelData: HotelDataType = {
        ...req.body,
        userId: req.userId,
        lastUpdated: new Date(),
      };

      const newHotel = new Hotel(hotelData);
      await newHotel.save();

      res.status(200).json({ message: "Hotel added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.delete(
  "/:id",
  verifyToken,
  verifyHotelOwner,
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const hotel = await Hotel.findById(id);
      if (!hotel)
        return res.status(400).json({ message: "Hotel doesn't exist" });

      if (hotel?.userId === req.userId) {
        await hotel.deleteOne();
        return res.json({ message: "Hotel deleted successfully" });
      }

      res.status(401).json({ message: "Unauthorized access" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// upload image
router.post(
  "/upload-image",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const imageUrl = await uploadProfile(req.file);

      if (!imageUrl)
        res.status(500).json({ message: "Failed to upload image" });

      res.json({ url: imageUrl });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
