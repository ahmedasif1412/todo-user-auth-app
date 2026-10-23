import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true, trim: true },
    isFinished: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true },
);

export default mongoose.model("todos", todoSchema);
