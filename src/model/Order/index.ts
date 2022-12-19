import orderSchema from "./schema";
import { Order, OrderModel } from "@t/order";
import mongoose from "mongoose";

export default mongoose.model<Order, OrderModel>("Order", orderSchema, "Order");
mongoose.model