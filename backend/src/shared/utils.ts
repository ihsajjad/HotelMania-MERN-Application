import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";
import multer from "multer";
import Booking from "../models/booking";

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export async function uploadProfile(file: any) {
  const b64 = Buffer.from(file.buffer).toString("base64");
  const dataURI = "data:" + file.mimetype + ";base64," + b64;
  const fileUrl = await cloudinary.v2.uploader.upload(dataURI);
  return fileUrl.url;
}

export const generateToken = (userId: any) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1d",
  });
  return token;
};

const updateTheDailyRevenue = async () => {
  const previousDay = new Date().getTime() - 86400000;
  const compareDate = new Date(previousDay);
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  if (hours === 0 && minutes === 54 && seconds === 40) {
    const getRevenueJson = await Booking.find({
      bookedAt: { $gte: compareDate },
    });
    console.log(getRevenueJson);
  }
};
// setInterval(updateTheDailyRevenue, 1000);
