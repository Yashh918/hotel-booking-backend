import { model, Schema } from "mongoose";

const BookingSchema = new Schema(
    {
        customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        unitId: { type: Schema.Types.ObjectId, ref: "Unit", required: true },
        bookingDates: {
            checkIn: { type: Date, required: true },
            checkOut: { type: Date, required: true },
            reservationTime: { type: Date, required: true }
        },
        status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
        paymentDetails: {
            amount: { type: Number, required: true },
            paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" }
        }
    },
    { timestamps: true }
)

export default model("Booking", BookingSchema);