import ButtonLabels from "@src/lib/constants/bot/button-labels";
import {
  DailyOrder,
  DailyOrderModel,
  DailyOrderQueryHelpers,
} from "@src/types/dailyOrder";
import mongoose, { Schema, Types } from "mongoose";
import { byUserId, inDay } from "./query-helpers";
import { dateStringVirtual } from "./virtuals";
import { getDates } from "./methods";

const dailyOrderSchema = new mongoose.Schema<
  DailyOrder,
  DailyOrderModel,
  {},
  DailyOrderQueryHelpers
>(
  {
    days: { type: [Number], default: [] },
    amount: { type: Number },
    breadType: { type: String },
    time: { type: String },
    user: {
      ref: "User",
      type: Types.ObjectId,
    },
    userId: { type: Number },
    duplicated: { type: Boolean, default: false },
  },
  {
    query: { byUserId, inDay },
    // virtuals: { dateString: dateStringVirtual },
    methods: { getDates },
  }
);

dailyOrderSchema.virtual("dateString").get(dateStringVirtual.get);

export default dailyOrderSchema;
