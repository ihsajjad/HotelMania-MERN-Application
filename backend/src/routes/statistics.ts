import express, { Request, Response } from "express";
import { verifyAdmin, verifyToken } from "../middleware/auth";
import Statistic from "../models/statistics";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  verifyAdmin,
  async (req: Request, res: Response) => {
    try {
      const statistics = await Statistic.find();
      res.send(statistics);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
