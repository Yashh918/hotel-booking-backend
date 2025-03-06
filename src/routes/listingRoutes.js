import { Router } from "express";
import { approveListing, createListing, deleteListing, getListing, getListings, getUnapprovedListings, updateListing } from "../controllers/listingControllers.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { isAdmin, isVendor } from "../middlewares/roleMiddleware.js";

const router = Router();

// public: get all approved listings
router.get("/", getListings)

// admin-only: unapproved listings
router.get("/unapproved", authenticate, isAdmin, getUnapprovedListings)

// public: single listing
router.get("/:id", getListing)

// vendor-only: create, update, delete listings
router.post("/", authenticate, isVendor, createListing)
router.put("/:id", authenticate, isVendor, updateListing)
router.delete("/:id",authenticate, isVendor, deleteListing)

// admin-only: approve listing
router.put("/:id/approve", authenticate, isAdmin, approveListing)

export default router