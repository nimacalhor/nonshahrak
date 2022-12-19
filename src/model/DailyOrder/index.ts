import { DailyOrder, DailyOrderModel } from "@src/types/dailyOrder";
import mongoose from "mongoose";
import schema from "./schema";

export default mongoose.model<DailyOrder, DailyOrderModel>(
  "DailyOrder",
  schema,
  "DailyOrder"
);
