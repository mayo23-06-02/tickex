import mongoose, { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
    {
        organizerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: [true, "Please provide an event title"],
            maxlength: [100, "Title cannot be more than 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        location: {
            name: { type: String, required: true },
            address: { type: String, required: true },
            lat: { type: Number },
            lng: { type: Number },
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        imageUrl: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            default: "General",
        },
        status: {
            type: String,
            enum: ["draft", "published", "cancelled", "completed"],
            default: "draft",
        },
        tags: [{ type: String }],
    },
    { timestamps: true }
);

const Event = models.Event || model("Event", EventSchema);

export default Event;
