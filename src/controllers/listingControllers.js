import mongoose from "mongoose";
import Listing from "../models/Listing.js";
import Unit from "../models/Unit.js";

export const createListing = async (req, res) => {
    try {
        const { type, name, address, city, state, zip, description, facilities, images } = req.body;
        const listing = new Listing({
            vendorId: req.user.userId,
            type,
            name,
            address,
            city,
            state,
            zip,
            description,
            facilities,
            images
        })
        await listing.save();

        return res
            .status(201)
            .json({ listing });
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message });
    }
}

export const getListings = async (req, res) => {
    try {
        const { name, type, city, minPrice, maxPrice } = req.query

        // find units that match the price range
        let unitFilters = {}
        if (minPrice || maxPrice) {
            unitFilters.price = {}
            if (minPrice) unitFilters.price.$gte = minPrice
            if (maxPrice) unitFilters.price.$lte = maxPrice
        }

        const units = await Unit.find(unitFilters).select("listingId");
        const listindIds = units.map(unit => unit.listingId)

        // find listings that match filters and have the units in price range
        const filters = { isApproved: true }
        if (name) filters.name = { $regex: name, $options: "i" }
        if (type) filters.type = type
        if (city) filters.city = city
        if (listindIds.length > 0) filters._id = { $in: listindIds }

        const listings = await Listing.find(filters)

        return res
            .status(200)
            .json({ listings });
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message });
    }
}

export const getUnapprovedListings = async (req, res) => {
    try {
        let filters = { isApproved: false }

        const listings = await Listing.find(filters)
        console.log(listings)

        return res
            .status(200)
            .json({ listings });
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message })
    }
}

export const getListing = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ error: "Invalid listing id" });
        }

        const listing = await Listing.findById(req.params.id)

        if (!listing) {
            return res
                .status(404)
                .json({ error: "Listing not found" });
        }

        return res
            .status(200)
            .json({ listing })
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message });
    }
}

export const approveListing = async (req, res) => {
    try {
        const listing = await Listing.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        )

        return res
            .status(200)
            .json({ listing });
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message });
    }
}

export const updateListing = async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ error: "Invalid listing id" });
        }

        const listing = await Listing.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        )

        if (!listing) {
            return res
                .status(404)
                .json({ error: "Listing not found" });
        }

        return res
            .status(200)
            .json({ listing })
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message });
    }
}

export const deleteListing = async (req, res) => {
    try {
        await Listing.findByIdAndDelete(req.params.id)

        return res
            .status(200)
            .json({ message: "Listing deleted successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message });
    }
}
