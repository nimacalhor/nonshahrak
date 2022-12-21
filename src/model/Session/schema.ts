import { SessionStates } from "@src/lib/constants/bot/session";
import {
  SessionDoc,
  SessionModel,
  SessionOrderDoc,
  SessionOrderModel,
  SessionOrder,
} from "./../../types/session";
import mongoose from "mongoose";
import ButtonLabels from "@src/lib/constants/bot/button-labels";
import { compareEnum } from "@src/lib/helper/bot";
import { BreadPrices } from "@src/lib/constants/general";
import { byUserId, byCtx } from "./query-helpers";

const sessionOrderSchema = new mongoose.Schema<
  SessionOrderDoc,
  SessionOrderModel
>({
  type: {
    type: String,
  },
  breadType: { type: String },
  amount: {
    type: Number,
    set: function (this: SessionOrder, value: number | undefined) {
      if (!value) return value;
      if (!this.breadType) return value;
      if (compareEnum(this.breadType, ButtonLabels.BARBARI))
        this.price = BreadPrices.BARBARI * value;
      this.price = BreadPrices.SANQAK * value;
      return value;
    },
  },
  time: { type: String },
  name: { type: String },
  phone: { type: String },
  block: { type: Number },
  entrance: { type: String },
  floor: { type: Number },
  unit: { type: Number },
  days: { type: [String], default: [] },
  price: { type: Number },
});

const sessionSchema = new mongoose.Schema<SessionDoc, SessionModel>(
  {
    userId: { type: Number },
    chatId: { type: Number },
    state: { type: String, default: SessionStates.UNDEFINED },
    order: { type: sessionOrderSchema },
    paymentMessageId: { type: Number },
    enteringProfile: { type: Boolean, default: false },
  },
  {
    query: { byUserId, byCtx },
  }
);

export default sessionSchema;
