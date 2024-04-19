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

// uploading single image to the cloudinary
export async function uploadProfile(file: any) {
  const b64 = Buffer.from(file.buffer).toString("base64");
  const dataURI = "data:" + file.mimetype + ";base64," + b64;
  const fileUrl = await cloudinary.v2.uploader.upload(dataURI);
  return fileUrl.url;
}

// creating jsonwebtoken
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

// Will add daily sales amount once in 24 hours to the statistics collection
const addTheDailyRevenue = async () => {
  const previousDay = new Date().getTime() - 86400000;
  const previousDate = new Date(previousDay);

  // getting the time to add the data
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const month = months[previousDate.getMonth()];
  const year = previousDate.getFullYear();

  // if it 12 am, it will add the data
  if (hours === 0 && minutes === 0 && seconds === 0) {
    // taking all transactions that were held on the previous day
    const transactions = await Booking.find({
      bookedAt: { $gte: previousDate },
    });

    // Calculating the total amount of that day
    const amount = transactions?.reduce(
      (total, current) => total + current?.total,
      0
    );

    const quantity = transactions?.length || 0; // total bookings of that day

    // finally adding the data to the statistics collection
    new Statistic({
      date: previousDate,
      amount,
      month,
      quantity,
      year,
    }).save();
  }
};

// will exicute addTheDailyRevenue every second
const interval = setInterval(addTheDailyRevenue, 1000);
