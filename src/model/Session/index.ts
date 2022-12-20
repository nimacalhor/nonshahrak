import mongoose from "mongoose";
import schema from "./schema";
import { SessionDoc, SessionModel } from "@src/types/session";

export default mongoose.model<SessionDoc, SessionModel>(
  "Session",
  schema,
  "Session"
);
