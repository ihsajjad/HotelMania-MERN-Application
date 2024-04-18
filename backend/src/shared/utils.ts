import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";
import multer from "multer";
import Booking from "../models/booking";
import Statistic from "../models/statistics";

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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const addTheDailyRevenue = async () => {
  const previousDay = new Date().getTime() - 86400000;
  const compareDate = new Date(previousDay);
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const month = months[compareDate.getMonth()];
  const year = compareDate.getFullYear();
  console.log(hours, minutes, seconds);
  if (hours === 11 && minutes === 58 && seconds === 0) {
    const transactions = await Booking.find({
      bookedAt: { $gte: compareDate },
    });

    if (transactions.length > 0) {
      const amount = transactions.reduce(
        (total, current) => total + current.total,
        0
      );
      const quantity = transactions.length;

      new Statistic({
        date: compareDate,
        amount,
        month,
        quantity,
        year,
      }).save();
      console.log(compareDate, amount, quantity, month, year);
    }
  }
};
// const interval = setInterval(addTheDailyRevenue, 1000);
