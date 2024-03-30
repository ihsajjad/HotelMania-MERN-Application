import mongoose from "mongoose";
import { HotelOwnerType } from "../shared/types";

const hotelOwnerSchema = new mongoose.Schema<HotelOwnerType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  bankName: { type: String, required: true },
  bankAddress: { type: String, required: true },
  accountNumber: { type: String, required: true },
  profile: { type: String, required: false },
  hotelAddress: { type: String, required: true },
  country: { type: String, required: true },
  isVarified: { type: Boolean, default: false },
});

const Partner = mongoose.model<HotelOwnerType>("Partner", hotelOwnerSchema);

export default Partner;
