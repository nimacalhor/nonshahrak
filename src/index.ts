process.on("uncaughtException", (err) => {
  console.log("uncaught exceptions");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

import dotenv from "dotenv";
dotenv.config({
  path: `${__dirname}/../config.env`,
});

import mongoose from "mongoose";
import mainBot from "./bot";
import api from "./api";

const connectionString = (
  process.env.NODE_ENV === "development"
    ? (process.env.DB_CONNECTION_STRING_DEV as string)
    : (process.env.DB_CONNECTION_STRING_DEV as string)
).replace("<password>", process.env.CLUSTER_PASSWORD + "");

const port = process.env.PORT;

(async function () {
  try {
    await mongoose.connect(connectionString);
    console.log("db connected ✅");
  } catch (error) {
    console.log("db not connected 😢", { error });
  }
})();
const server = api.listen(port, () =>
  console.log(`server is running on port ${port}`)
);

mainBot.launch();

["unhandledRejection", "SIGTERM"].forEach((e) =>
  process.on(e, (err: any) => {
    console.log(e);
    console.log({ err });
    server.close(() => process.exit(1));
    process.exit(1);
  })
);
