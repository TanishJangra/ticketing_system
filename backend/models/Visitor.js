import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("Visitor", visitorSchema);
