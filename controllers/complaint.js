//controllers/complaint.js-new
const Complaint = require("../models/Complaint");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createComplaint = async (req, res) => {
  const { issueType, description } = req.body;
  const userId = req.user.id;

  const complaint = await Complaint.create({
    userId,
    issueType,
    description
  });

  res.status(StatusCodes.CREATED).json({ complaint });
};

const updateComplaint = async (req, res) => {
  const { id: complaintId } = req.params;
  const { status } = req.body;

  const complaint = await Complaint.findOneAndUpdate(
    { _id: complaintId },
    { status },
    { new: true, runValidators: true }
  );

  if (!complaint) {
    throw new NotFoundError(`No complaint with id ${complaintId}`);
  }

  res.status(StatusCodes.OK).json({ complaint });
};

const getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find({}).populate("userId", "phone");
  res.status(StatusCodes.OK).json({ complaints, count: complaints.length });
};

const getUserComplaints = async (req, res) => {
  const complaints = await Complaint.find({ userId: req.user.id });
  res.status(StatusCodes.OK).json({ complaints, count: complaints.length });
};

module.exports = {
  createComplaint,
  updateComplaint,
  getAllComplaints,
  getUserComplaints
};