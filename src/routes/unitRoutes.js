import { Router } from "express";
import { createUnit, deleteUnit, getUnit, getUnits, updateUnit } from "../controllers/unitController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { isVendor } from "../middlewares/roleMiddleware.js";

const router = Router();

// public: get all units
router.get("/", getUnits);

// vendor-only: create units
router.post("/", authenticate, isVendor, createUnit);

// public: get single unit
router.get("/:id", getUnit);

// vendor-only: update, delete unit
router.patch("/:id", authenticate, isVendor, updateUnit);
router.delete("/:id", authenticate, isVendor, deleteUnit);

export default router;