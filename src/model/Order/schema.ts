import {
  default as ButtonLabels,
  default as buttons,
} from "@constants/bot/button-labels";
import { BreadPrices } from "@src/lib/constants/general";
import { compareEnum } from "@src/lib/helper/bot";
import { getTomorrowsDate } from "@src/lib/helper/date-helper";
import { Order, OrderDoc, OrderModel, OrderQueryHelpers } from "@t/order";
import mongoose from "mongoose";
import { byUserId, tomorrows } from "./query-helpers";
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
    userId: { type: Number, index: true },
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
      set: function (this: OrderDoc, value: Date) {
        this.day = value.getDate();
        this.month = value.getMonth();
        this.year = value.getFullYear();
        return value;
      },
    },
    day: { type: Number },
    month: { type: Number },
    year: { type: Number },
    authority: { type: String, default: "" },
    paid: { type: Boolean, default: false },
    refId: { type: Number },
    duplicated: { type: Boolean, default: false },
  },
  {
    query: {
      byUserId: byUserId as unknown as OrderQueryHelpers["byUserId"],
      tomorrows,
    },
  }
);

orderSchema.virtual("dateString").get(dateString.get);

export default orderSchema;
