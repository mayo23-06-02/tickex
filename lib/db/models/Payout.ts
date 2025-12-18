import { Schema, model, models } from "mongoose";

const PayoutSchema = new Schema(
    {
        organizerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: "SZL",
        },
        status: {
            type: String,
            enum: ["pending", "processing", "paid", "failed"],
            default: "pending",
        },
        method: {
            type: String,
            enum: ["bank_transfer", "mobile_money"],
            required: true,
        },
        reference: {
            type: String, // Transaction reference number
        },
        processedAt: {
            type: Date,
        }
    },
    { timestamps: true }
);

const Payout = models.Payout || model("Payout", PayoutSchema);

export default Payout;
