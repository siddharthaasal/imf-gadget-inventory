"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gadgets_1 = __importDefault(require("./gadgets"));
const auth_1 = __importDefault(require("./auth"));
const mainRouter = express_1.default.Router();
mainRouter.use("/auth", auth_1.default);
mainRouter.use("/gadgets", gadgets_1.default);
exports.default = mainRouter;
