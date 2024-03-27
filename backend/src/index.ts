import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
const app = express();
const port = 3000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("DB is connected"));

// middleware
app.use(express.json());
app.use(cors());

express.static(`${__dirname}/../../../frontend/dist`);

app.listen(port, () => console.log(`server is running on port: ${port}`));
