import { model, Schema } from "mongoose";

const reviewSchema = new Schema(
    {
        customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comments: { type: String }
    },
    { timestamps: true }
)

export default model("Review", reviewSchema);