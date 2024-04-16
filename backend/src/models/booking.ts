import mongoose, { Schema } from "mongoose";
import { BookingType } from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingType>({
  userId: { type: String, required: true },
  hotel: { type: Schema.Types.ObjectId, ref: "Hotel" },
  hotelOwner: { type: Schema.Types.ObjectId, ref: "Partner" },
  numberOfNights: { type: Number, required: true },
  total: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  bookedAt: { type: Date, required: true },
});

const Booking = mongoose.model<BookingType>("booking", bookingSchema);

export default Booking;
