import { Order, OrderModel, OrderQueryHelpers } from "@t/order";
import mongoose from "mongoose";
import buttons from "@constants/bot/button-labels";
import { byUserId, todays, tomorrows } from "./query-helpers";
import { getPersianDate, getTomorrowsDate } from "@src/lib/helper/date-helper";
import { compareEnum } from "@src/lib/helper/bot";
import ButtonLabels from "@constants/bot/button-labels";
import { BreadPrices } from "@src/lib/constants/general";
import { dateString } from "./virtuals";

const orderSchema = new mongoose.Schema<
  Order,
  OrderModel,
  {},
  OrderQueryHelpers
>(
  {
    breadType: {
      type: String,
      enum: [buttons.BARBARI, buttons.SANAQAK],
    },
    amount: { type: Number },
    time: { type: String },
    userId: { type: String, index: true },
    user: {
      ref: "User",
      type: mongoose.SchemaTypes.ObjectId,
    },
    price: {
      type: Number,
      default: function (this: Order) {
        if (compareEnum(this.breadType, ButtonLabels.BARBARI))
          return this.amount * BreadPrices.BARBARI;
        else return this.amount * BreadPrices.SANQAK;
      },
    },
    date: {
      type: Date,
      default: getTomorrowsDate(),
    },
    authority: { type: String, default: "" },
    paid: { type: Boolean, default: false },
    refId: { type: Number },
  },
  {
    query: {
      byUserId,
      todays,
      tomorrows,
    },
  }
);

orderSchema.virtual("dateString").get(dateString.get);

export default orderSchema;
