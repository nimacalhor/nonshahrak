import mongoose from "mongoose";
import userSchema from "./schema";
import { User, UserDoc, UserModel } from "@t/user";

export default mongoose.model<UserDoc, UserModel>("User", userSchema, "User");
mongoose.model