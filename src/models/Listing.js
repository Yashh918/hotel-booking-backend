import { model, Schema } from "mongoose";

const listingSchema = new Schema(
    {
        vendorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        units: [{ type: Schema.Types.ObjectId, ref: "Unit" }],
        type: { type: String, enum: ["hotel", "restaurant"], required: true },
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        description: { type: String },
        facilities: [{ type: String }],
        images: [{ type: String }],
        isApproved: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default model("Listing", listingSchema);