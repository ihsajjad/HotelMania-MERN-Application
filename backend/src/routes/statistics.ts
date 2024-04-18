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
      const statistics = await Statistic.find().sort({ date: -1 }).limit(30);
      statistics.reverse();
      res.send(statistics);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
