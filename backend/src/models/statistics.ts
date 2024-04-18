import mongoose from "mongoose";
import { StatisticsDataType } from "../shared/types";

const statisticsSchema = new mongoose.Schema<StatisticsDataType>({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  year: { type: Number, required: true },
  month: { type: String, required: true },
});

const Statistic = mongoose.model<StatisticsDataType>(
  "Statistic",
  statisticsSchema
);

export default Statistic;
