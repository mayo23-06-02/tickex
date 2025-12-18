import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        items: [{
            ticketTypeId: { type: Schema.Types.ObjectId, ref: 'TicketType', required: true },
            quantity: { type: Number, required: true },
            priceAtPurchase: { type: Number, required: true },
            total: { type: Number, required: true }
        }],
        totalAmount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: "SZL",
        },
        status: {
            type: String,
            enum: ["pending", "paid", "failed", "cancelled"],
            default: "pending",
        },
        stripeSessionId: {
            type: String,
            unique: true,
            sparse: true,
        },
        stripePaymentIntentId: {
            type: String,
        }
    },
    { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
