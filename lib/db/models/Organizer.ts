import { Schema, model, models } from "mongoose";

const OrganizerSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            maxlength: [60, "Name cannot be more than 60 characters"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            maxlength: [100, "Email cannot be more than 100 characters"],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        role: {
            type: String,
            enum: ["owner", "admin", "member"],
            default: "owner",
        },
        organizationName: {
            type: String,
            maxlength: [100, "Organization name cannot be more than 100 characters"],
        },
        status: {
            type: String,
            enum: ["active", "pending", "suspended"],
            default: "active",
        },
        invitations: [{
            email: String,
            role: String,
            status: { type: String, enum: ['pending', 'accepted'], default: 'pending' },
            token: String,
            invitedAt: { type: Date, default: Date.now }
        }],
        otp: {
            code: String,
            expiresAt: Date
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        stripeAccountId: {
            type: String,
            default: null
        }
    },
    { timestamps: true }
);

const Organizer = models.Organizer || model("Organizer", OrganizerSchema);

export default Organizer;
