import mongoose from "mongoose";
import { BookingType } from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingType>({
  userId: { type: String, required: true },
  hotelId: { type: String, required: true },
  numberOfNights: { type: String, required: true },
  total: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  bookedAt: { type: Date, required: true },
});

const Booking = mongoose.model<BookingType>("booking", bookingSchema);

export default Booking;
