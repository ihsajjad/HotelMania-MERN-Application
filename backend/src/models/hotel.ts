import mongoose from "mongoose";
import { HotelDataType } from "../shared/types";

const hotelSchema = new mongoose.Schema<HotelDataType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  images: [{ label: String, image: String, required: true }],
  lastUpdated: { type: Date, required: true },
});

const Hotel = mongoose.model<HotelDataType>("Hotel", hotelSchema);
export default Hotel;
