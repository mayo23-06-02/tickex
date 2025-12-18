import { Schema, model, models } from "mongoose";

const MilestoneSchema = new Schema(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["todo", "in_progress", "completed", "overdue"],
            default: "todo",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        assignedTo: {
            type: String, // Or Schema.Types.ObjectId ref User if we have team members
        }
    },
    { timestamps: true }
);

const Milestone = models.Milestone || model("Milestone", MilestoneSchema);

export default Milestone;
