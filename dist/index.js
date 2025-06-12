"use strict";
/// <reference path="./types/express/index.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import './types/express';
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const api_1 = __importDefault(require("./api"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const swaggerDocument = yamljs_1.default.load("./swagger.yaml");
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Server for imf-gadgets-inventory says hello");
});
app.use("/", api_1.default);
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
const portNumber = process.env.portNumber || 3001;
app.listen(portNumber, () => {
    console.log(`Server running on port ${portNumber}`);
});
