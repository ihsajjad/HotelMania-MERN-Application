import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";
import authRoutes from "./routes/auth";
import bookingRoute from "./routes/bookings";
import hotelRoutes from "./routes/hotels";
import partnerRoutes from "./routes/partners";
import statisticsRoutes from "./routes/statistics";
import userRoutes from "./routes/users";

const app = express();
const port = 3000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("DB connected"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoute);
app.use("/api/statistics", statisticsRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(port, () => console.log(`server is running on port: ${port}`));
