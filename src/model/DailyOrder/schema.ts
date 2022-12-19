import ButtonLabels from "@src/lib/constants/bot/button-labels";
import {
  DailyOrder,
  DailyOrderModel,
  DailyOrderQueryHelpers,
} from "@src/types/dailyOrder";
import mongoose, { Types } from "mongoose";
import { byUserId, inDay } from "./query-helpers";
import { priceVirtual } from "./virtuals";

const dailyOrderSchema = new mongoose.Schema<
  DailyOrder,
  DailyOrderModel,
  {},
  DailyOrderQueryHelpers
>(
  {
    days: { type: [Number], default: [] },
    amount: { type: Number },
    breadType: { enum: [ButtonLabels.BARBARI, ButtonLabels.SANAQAK] },
    time: { type: String },
    user: {
      ref: "User",
      type: Types.ObjectId,
    },
    userId: { type: Number },
  },
  {
    query: { byUserId, inDay },
    virtual: { price: priceVirtual },
  }
);

export default dailyOrderSchema;
