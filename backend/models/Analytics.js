import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resolvedCount: { type: Number, default: 0 },
  unresolvedCount: { type: Number, default: 0 },
  avgResolutionTime: { type: Number },
}, { timestamps: true });

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;