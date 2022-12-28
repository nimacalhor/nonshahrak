"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.on("uncaughtException", (err) => {
    console.log("uncaught exceptions");
    console.log(err.name, err.message, err.stack);
    process.exit(1);
});
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: `${__dirname}/../config.env`,
});
const mongoose_1 = __importDefault(require("mongoose"));
const bot_1 = __importDefault(require("./bot"));
const api_1 = __importDefault(require("./api"));
const connectionString = (process.env.NODE_ENV === "development"
    ? process.env.DB_CONNECTION_STRING_DEV
    : process.env.DB_CONNECTION_STRING_DEV).replace("<password>", process.env.CLUSTER_PASSWORD + "");
const port = process.env.PORT;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(connectionString);
            console.log("db connected ✅");
        }
        catch (error) {
            console.log("db not connected 😢", { error });
        }
    });
})();
const server = api_1.default.listen(port, () => console.log(`server is running on port ${port}`));
bot_1.default.launch();
["unhandledRejection", "SIGTERM"].forEach((e) => process.on(e, (err) => {
    console.log(e);
    console.log({ err });
    server.close(() => process.exit(1));
    process.exit(1);
}));
