import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
const app = express();
const port = 3000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("DB is connected"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// middleware
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

express.static(`${__dirname}/../../../frontend/dist`);

// routes

app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`server is running on port: ${port}`));
