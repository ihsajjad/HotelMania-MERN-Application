import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Booking from "../models/booking";

const router = express.Router();

router.post(
  "/",
  [
    check("userId", "UserId is required").isString().trim(),
    check("hotelId", "Hotel is required").isString().trim(),
    check("numberOfNights", "NumberOfNights is required").isNumeric().trim(),
    check("total", "Total is required").isNumeric().trim(),
    check("checkIn", "CheckIn is required").isString().trim(),
    check("checkOut", "CheckOut is required").isString().trim(),
    check("bookedAt", "BookedAt is required").isString().trim(),
  ],
  async (req: Request, res: Response) => {
    const bookingData = req.body;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ message: "Invalid booking data", data: errors.array() });

      console.log(!errors.isEmpty());

      const booking = new Booking(bookingData);
      console.log(booking);
      if (!booking)
        return res.status(400).json({ message: "Failed to book hotel" });

      booking.save();

      res.json({ message: "Booking Successful" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
