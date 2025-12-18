import { Schema, model, models } from "mongoose";

const MicrositeSchema = new Schema(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
            unique: true,
        },
        pages: [
            {
                id: { type: String, required: true },
                name: { type: String, required: true },
                slug: { type: String, required: true },
                components: [
                    {
                        id: { type: String, required: true },
                        type: { type: String, required: true },
                        props: { type: Schema.Types.Mixed, default: {} },
                    },
                ],
            },
        ],
        globalStyles: {
            primaryColor: { type: String, default: "#1DB954" },
            secondaryColor: { type: String, default: "#0f172a" },
            fontFamily: { type: String, default: "Inter" },
            backgroundColor: { type: String, default: "#ffffff" },
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        publishedAt: {
            type: Date,
        },
        customDomain: {
            type: String,
        },
    },
    { timestamps: true }
);

const Microsite = models.Microsite || model("Microsite", MicrositeSchema);

export default Microsite;
