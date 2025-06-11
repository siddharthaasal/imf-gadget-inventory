"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGadgets = getGadgets;
exports.addGadget = addGadget;
exports.patchGadget = patchGadget;
exports.deleteGadget = deleteGadget;
exports.selfDestructGadget = selfDestructGadget;
exports.getGadgetsByStatus = getGadgetsByStatus;
const prisma_1 = __importDefault(require("../config/prisma"));
const codenameGenerator_1 = require("../utils/codenameGenerator");
async function addGadget(req, res) {
    const gadgetName = req.body.gadgetName;
    if (!gadgetName || gadgetName.trim() === "") {
        res.status(400).json({ error: "Gadget name missing" });
        return;
    }
    const newGadget = await prisma_1.default.gadget.create({
        data: {
            name: gadgetName,
            codename: (0, codenameGenerator_1.generateCodename)(),
            status: "Available"
        }
    });
    res.status(201).json({ gadget: newGadget });
    return;
}
async function getGadgets(req, res) {
    try {
        const rawGadgets = await prisma_1.default.gadget.findMany();
        const gadgets = rawGadgets.map(gadget => ({
            ...gadget,
            codename: `${gadget.codename}-${Math.floor(Math.random() * 100) + 1}% success probability`
        }));
        res.status(200).json({ gadgets });
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch gadgets" });
        return;
    }
}
async function patchGadget(req, res) {
    try {
        const id = req.params.id;
        const newName = req.body.newName;
        console.log(id);
        console.log(newName);
        if (!id || !newName || newName.trim() === "") {
            res.status(400).json({ error: "ID or Gadget name missing" });
            return;
        }
        const updatedGadget = await prisma_1.default.gadget.update({
            where: {
                id: id,
            },
            data: {
                name: newName,
            },
        });
        console.log(updatedGadget);
        res.status(202).json({ updatedGadget: updatedGadget });
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to patch gadget" });
        return;
    }
}
async function deleteGadget(req, res) {
    try {
        const id = req.params.id;
        console.log(id);
        if (!id) {
            res.status(400).json({ error: "ID missing" });
            return;
        }
        const softDeletedGadget = await prisma_1.default.gadget.update({
            where: {
                id: id,
            },
            data: {
                status: "Decommissioned",
                decommissionedAt: new Date()
            },
        });
        console.log(softDeletedGadget);
        res.status(202).json({ softDeletedGadget: softDeletedGadget });
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete gadget" });
        return;
    }
}
async function selfDestructGadget(req, res) {
    const { id } = req.params;
    const confirmationCode = Math.floor(1000 + Math.random() * 9000); // 4-digit code
    try {
        await prisma_1.default.gadget.update({
            where: { id },
            data: { status: "Destroyed" },
        });
        res.status(200).json({
            message: "Self-destruct sequence initiated",
            confirmationCode,
            warning: "This action is irreversible!"
        });
    }
    catch (error) {
        res.status(404).json({ error: "Gadget not found" });
    }
}
async function getGadgetsByStatus(req, res) {
    const status = req.query.status;
    if (!status || (status !== "Available" && status !== "Deployed" && status !== "Decommissioned" && status !== "Destroyed")) {
        res.status(400).json({ error: "Invalid Status" });
        return;
    }
    try {
        const gadgets = await prisma_1.default.gadget.findMany({
            where: {
                status: status
            }
        });
        //adding random success prob
        const gadgetsByStatus = gadgets.map(gadget => ({
            ...gadget,
            codename: `${gadget.codename}-${Math.floor(Math.random() * 100) + 1}% success probability`
        }));
        // console.log(gadgetsByStatus);
        res.status(202).json({ gadgetsByStatus: gadgetsByStatus });
        return;
    }
    catch (error) {
        res.status(404).json({ error: "Cannot Get gadgets by status" });
    }
}
