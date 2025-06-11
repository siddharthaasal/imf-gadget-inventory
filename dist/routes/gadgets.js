"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gadgetRouter = express_1.default.Router();
const GadgetController_1 = require("../controllers/GadgetController");
// gadgetRouter.get("/", (req, res) => {
//     if (req.query.status) {
//         return getGadgetsByStatus(req, res);
//     }
//     return getGadgets(req, res);
// });
gadgetRouter.get("/", GadgetController_1.getGadgets);
gadgetRouter.post("/", GadgetController_1.addGadget);
gadgetRouter.patch("/:id", GadgetController_1.patchGadget);
gadgetRouter.delete("/:id", GadgetController_1.deleteGadget);
gadgetRouter.post("/:id/self-destruct", GadgetController_1.selfDestructGadget);
exports.default = gadgetRouter;
