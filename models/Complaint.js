//models/Complaint.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  issueType: {
    type: String,
    enum: ["payment", "service", "safety", "app", "other"],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["open", "in_progress", "resolved", "closed"],
    default: "open"
  }
}, {
  timestamps: true
});

// Generate ticket ID before saving
complaintSchema.pre("save", async function(next) {
  if (this.isNew) {
    const count = await mongoose.model("Complaint").countDocuments();
    this.ticketId = `TKT${String(count + 1).padStart(6, "0")}`;
  }
  next();
});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;