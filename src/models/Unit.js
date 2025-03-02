import { model, Schema } from "mongoose";

const unitSchema = new Schema(
    {
        listingId: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
        type: { type: String, enum: ["room", "table"], required: true },
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        capacity: { type: Number, required: true },
        images: [{ type: String }],
        availability: { type: Boolean, default: true },
    },
    { timestamps: true });

export default model("Unit", unitSchema);