"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gadgetRouter = express_1.default.Router();
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const GadgetController_1 = require("../controllers/GadgetController");
gadgetRouter.get("/", (req, res) => {
    if (req.query.status) {
        return (0, GadgetController_1.getGadgetsByStatus)(req, res);
    }
    return (0, GadgetController_1.getGadgets)(req, res);
});
// gadgetRouter.get("/", getGadgets);
gadgetRouter.post("/", authMiddleware_1.default, GadgetController_1.addGadget);
gadgetRouter.patch("/:id", authMiddleware_1.default, GadgetController_1.patchGadget);
gadgetRouter.delete("/:id", authMiddleware_1.default, GadgetController_1.deleteGadget);
gadgetRouter.post("/:id/self-destruct", authMiddleware_1.default, GadgetController_1.selfDestructGadget);
exports.default = gadgetRouter;
