import mongoose from "mongoose";
import Unit from "../models/Unit.js";

export const createUnit = async (req, res) => {
    try {
        const { listingId, type, name, description, price, capacity, images, availablity } = req.body;
        const unit = new Unit({
            listingId,
            type,
            name,
            description,
            price,
            capacity,
            images,
            availablity
        })
        await unit.save();

        return res
            .status(201)
            .json({ unit });
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message })
    }
}

export const getUnits = async (req, res) => {
    try {
        const { minPrice, maxPrice, type, capacity } = req.query
        let filters = {}

        if (minPrice || maxPrice) {
            filters.price = {}
            if (minPrice) filters.price.$gte = minPrice
            if (maxPrice) filters.price.$lte = maxPrice
        }
        if (type) filters.type = type
        if (capacity) filters.capacity = capacity

        const units = await Unit.find(filters)

        return res
            .status(200)
            .json({ units });
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message })
    }
}

export const getUnit = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ error: "Invalid unit id" })
        }

        const unit = await Unit.findById(id)
        if (!unit) {
            return res
                .status(404)
                .json({ error: "Unit not found" })
        }

        return res
            .status(200)
            .json({ unit });
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message })
    }
}

export const updateUnit = async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ error: "Invalid unit id" })
        }

        const unit = await Unit.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        )

        if (!unit) {
            return res
                .status(404)
                .json({ error: "Unit not found" })
        }

        return res
            .status(200)
            .json({ unit });
    } catch (error) {

    }
}

export const deleteUnit = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ error: "Invalid unit id" })
        }

        const unit = await Unit.findByIdAndDelete(id)

        if (!unit) {
            return res
                .status(404)
                .json({ error: "Unit not found" })
        }

        return res
            .status(200)
            .json({ unit });
    } catch (error) {
        return res
            .status(500)
            .json({ error: error.message })
    }
}