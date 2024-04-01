import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Hotel from "../models/hotel";
import { HotelDataType } from "../shared/types";

const router = express.Router();

router.post(
  "/add-hotel",
  [
    check("userId", "User Id is rquired").notEmpty().trim(),
    check("name", "Name is rquired").notEmpty().trim(),
    check("description", "Description is rquired").notEmpty(),
    check("city", "City is rquired").notEmpty().trim(),
    check("country", "Country is rquired").notEmpty().trim(),
    check("type", "Type is rquired").notEmpty().trim(),
    check("pricePerNight", "Price per night is rquired").isNumeric().trim(),
    check("starRating", "Star Rating is rquired").isNumeric().trim(),
    check("adultCount", "Adult count is rquired").isNumeric().trim(),
    check("childCount", "Child count is rquired").isNumeric().trim(),
    check("facilities", "Facilities are rquired").isArray(),
    check("images", "Images are rquired").isArray(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ message: "Invalid hotel data", data: errors.array() });

    try {
      const hotelData: HotelDataType = {
        ...req.body,
        lastUpdated: new Date().toISOString(),
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

export default router;
