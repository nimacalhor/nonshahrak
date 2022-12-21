import { Query, QueryWithHelpers } from "mongoose";
import { UserDoc, User, UserQueryHelpers } from "@t/user";
import { getUserByIdQHelper } from "../query-helper-factory";

export const byUserId = getUserByIdQHelper<UserDoc>();
