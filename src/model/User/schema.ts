import mongoose from "mongoose";
import { User, UserModel, UserQueryHelpers } from "@t/user";
import { byUserId } from "./query-helpers";

const userSchema = new mongoose.Schema<User, UserModel, {}, UserQueryHelpers>(
  {
    name: { type: String },
    phone: { type: String },
    userId: { type: Number, index: true },
    block: { type: Number },
    entrance: { type: mongoose.Schema.Types.Mixed, default: "loneEntrance" },
    floor: { type: Number },
    unit: { type: Number },
    username: { type: String },
  },
  {
    query: { byUserId },
  }
);

export default userSchema;
