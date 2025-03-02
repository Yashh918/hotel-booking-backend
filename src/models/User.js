import { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["customer", "vendor", "admin"], default: "customer" },
        contactDetails: { type: String },
        bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
        listings: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
    },
    { timestamps: true }
);

export default model("User", userSchema);