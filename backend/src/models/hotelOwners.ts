import mongoose from "mongoose";
import { HotelOwnerType } from "../shared/types";

const hotelOwnerSchema = new mongoose.Schema<HotelOwnerType>({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  phone: { type: String, required: [true, "Phone is required"] },
  bankName: { type: String, required: [true, "Bank Name is required"] },
  bankAddress: { type: String, required: [true, "Bank Address is required"] },
  accountNumber: {
    type: String,
    required: [true, "Account Number is required"],
  },
  profile: { type: String, required: [true, "Profile is required"] },
  hotelAddress: {
    type: String,
    required: [true, "Address is required"],
  },
  country: { type: String, required: [true, "Country is required"] },
  isVarified: { type: Boolean, default: false },
});

const Partner = mongoose.model<HotelOwnerType>("Partner", hotelOwnerSchema);

export default Partner;
