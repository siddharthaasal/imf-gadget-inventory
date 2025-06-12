import express from "express";
const gadgetRouter = express.Router();
import authMiddleware from "../middlewares/authMiddleware";
import {
    getGadgets,
    addGadget,
    patchGadget,
    deleteGadget,
    selfDestructGadget,
    getGadgetsByStatus
} from "../controllers/GadgetController";

gadgetRouter.get("/", (req, res) => {
    if (req.query.status) {
        return getGadgetsByStatus(req, res);
    }
    return getGadgets(req, res);
});

// gadgetRouter.get("/", getGadgets);

gadgetRouter.post("/", authMiddleware, addGadget);
gadgetRouter.patch("/:id", authMiddleware, patchGadget);
gadgetRouter.delete("/:id", authMiddleware, deleteGadget);
gadgetRouter.post("/:id/self-destruct", authMiddleware, selfDestructGadget);


export default gadgetRouter;

