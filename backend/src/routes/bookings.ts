import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Stripe from "stripe";
import { verifyAdmin, verifyToken } from "../middleware/auth";
import Booking from "../models/booking";
import Hotel from "../models/hotel";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// get all bookings for admin
router.get(
  "/",
  verifyToken,
  verifyAdmin,
  async (req: Request, res: Response) => {
    try {
      const bookings = await Booking.find().populate("hotel", "name");
      res.json(bookings);
    } catch (error) {
      console.log(__dirname, error);
      res.status(500).json({ message: "Something went worng" });
    }
  }
);

// get all bookings for individual user's
router.get("/my-bookings", verifyToken, async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).populate(
      "hotel",
      "-description -adultCount -childCount -facilities"
    );
    res.json(bookings);
  } catch (error) {
    console.log(__dirname, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get current bookings
router.get(
  "/current_bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    const currentDate = new Date();

    try {
      const query = {
        userId: req.userId,
        checkOut: { $gte: currentDate },
      };

      const bookings = await Booking.find(query).populate(
        "hotel",
        "-description -adultCount -childCount -facilities"
      );

      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// create stripe payment
router.post(
  "/:hotelId/payment_intent",
  verifyToken,
  [
    check("hotelId", "HotelId is required").isString(),
    check("numberOfNights", "numberOfNights is required").isNumeric(),
  ],
  async (req: Request, res: Response) => {
    const { hotelId } = req.params;
    const { numberOfNights } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ message: "Invalid data", data: errors.array() });

      const hotel = await Hotel.findById(hotelId).select("pricePerNight");
      if (!hotel) return res.status(400).json({ message: "Hotel not found" });

      const total = parseInt(numberOfNights || "0") * hotel.pricePerNight;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          userId: req.userId,
          hotelId,
        },
      });

      if (!paymentIntent.client_secret)
        return res
          .status(500)
          .json({ message: "Failed to create payment intent" });

      const responseData = {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        total,
      };

      res.json(responseData);
    } catch (error) {
      console.log(__dirname, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// add booking
router.post(
  "/",
  [
    check("userId", "UserId is required").isString().trim(),
    check("hotel", "Hotel is required").isString().trim(),
    check("hotelOwner", "Hotel owner is required").isString().trim(),
    check("paymentIntentId", "paymentIntentId is required").isString().trim(),
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

      const booking = new Booking(bookingData);
      if (!booking)
        return res.status(400).json({ message: "Failed to book hotel" });

      booking.save();

      res.json({ message: "Booking Successful" });
    } catch (error) {
      console.log(__dirname, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
