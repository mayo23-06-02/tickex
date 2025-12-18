import { Schema, model, models } from "mongoose";

const BillSchema = new Schema(
    {
        organizerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        dueDate: {
            type: String, // Keeping as string for simplicity with UI date pickers, or Date
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Scheduled", "Paid"],
            default: "Pending",
        },
        type: {
            type: String,
            enum: ["rent", "service", "artist", "other"],
            default: "service",
        },
        paymentDetails: {
            method: String,
            last4: String,
            paidAt: Date
        }
    },
    { timestamps: true }
);

const Bill = models.Bill || model("Bill", BillSchema);

export default Bill;
