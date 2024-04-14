import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Stripe from "stripe";
import { verifyHotelOwner, verifyToken } from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelDataType } from "../shared/types";
import { upload, uploadProfile } from "../shared/utils";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// getting all hotels
router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = await constructSearchQuery(req.query);
    const sort: any = {};

    switch (req.query.sortOptions) {
      case "Star Rating":
        sort.starRating = -1;
        break;
      case "price LtoH":
        sort.pricePerNight = 1;
        break;
      case "price HtoL":
        sort.pricePerNight = -1;
        break;

      default:
        break;
    }

    const total = await Hotel.countDocuments(query);

    const pageSize = 5;
    let pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");

    if (total <= 5) pageNumber = 1;

    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query)
      .skip(skip)
      .limit(pageSize)
      ?.sort(sort);

    const response = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    console.log(__dirname, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// getting top rated hotels
router.get("/top-5", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort({ starRating: -1 }).limit(5);

    if (!hotels) return res.json({ message: "Hotels not found" });

    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all the hotels for individual user
router.get(
  "/my-hotels",
  verifyToken,
  verifyHotelOwner,
  async (req: Request, res: Response) => {
    try {
      const hotels = await Hotel.find({ userId: req.userId });
      if (!hotels) return res.json({ message: "Hotels not found" });

      res.json(hotels);
    } catch (error) {
      console.log(__filename, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// get pictures for the gallery
router.get("/gallery", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().select("_id images").limit(4);
    const images: { url: string; _id: string }[] = [];
    hotels.forEach((hotel) =>
      hotel.images.forEach((item) =>
        images.push({ url: item.image, _id: hotel._id })
      )
    );

    res.json(images);
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get individual hotel
router.get("/:hotelId", async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(400).json({ message: "Hotel not found" });

    res.json(hotel);
  } catch (error) {
    console.log(__filename, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// add hotel
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
      console.log(__filename, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// create stripe payment
router.post(
  "/:hotelId/booking/payment_intent",
  async (req: Request, res: Response) => {
    const { hotelId } = req.params;
    try {
      const hotel = await Hotel.findById(hotelId).select("pricePerNight");
      if (!hotel) return res.status(400).json({ message: "Hotel not found" });

      const numberOfNight = 5;
      const total = 100 * numberOfNight;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          userId: "userId",
          hotelId: "hotelId",
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
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// update hotel
router.put(
  "/:hotelId",
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
    const hotelId = req.params.hotelId;
    const userId = req.userId;
    const updatedHotel: HotelDataType = {
      ...req.body,
      lastUpdated: new Date(),
    };

    const errors = validationResult(req.body);

    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ message: "Invalid hotel data", data: errors.array() });

    try {
      const hotel = await Hotel.findOneAndUpdate(
        { _id: hotelId, userId },
        updatedHotel
      );

      if (!hotel)
        return res.status(400).json({ message: "Hotel doesn't exist" });

      res.json({ message: "Hotel updated successfully" });
    } catch (error) {
      console.log(__filename, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// delete hotel
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
      console.log(__filename, error);
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
      console.log(__filename, error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  const constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = { $gte: parseInt(queryParams.maxPrice) };
  }

  if (queryParams.facilities) {
    const facilities = queryParams.facilities;
    constructedQuery.facilities = { $all: facilities };
  }

  if (queryParams.types) {
    const types = Array.isArray(queryParams.types)
      ? queryParams.types
      : queryParams.types;

    constructedQuery.type = { $in: types };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  return constructedQuery;
};
export default router;
