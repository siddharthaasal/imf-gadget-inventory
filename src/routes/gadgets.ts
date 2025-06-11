import express from "express";
const gadgetRouter = express.Router();
import { getGadgets, addGadget, patchGadget, deleteGadget, selfDestructGadget, getGadgetsByStatus } from "../controllers/GadgetController";

// gadgetRouter.get("/", (req, res) => {
//     if (req.query.status) {
//         return getGadgetsByStatus(req, res);
//     }
//     return getGadgets(req, res);
// });
gadgetRouter.get("/", getGadgets);
gadgetRouter.post("/", addGadget);
gadgetRouter.patch("/:id", patchGadget);
gadgetRouter.delete("/:id", deleteGadget);
gadgetRouter.post("/:id/self-destruct", selfDestructGadget);


export default gadgetRouter;