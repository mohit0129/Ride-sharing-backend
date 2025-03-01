//controllers/payment.js-new
const Payment = require("../models/Payment");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createPayment = async (req, res) => {
  const { rideId, amount, paymentMethod } = req.body;
  const customerId = req.user.id;

  const payment = await Payment.create({
    customerId,
    rideId,
    amount,
    paymentMethod
  });

  res.status(StatusCodes.CREATED).json({ payment });
};

const updatePaymentStatus = async (req, res) => {
  const { id: paymentId } = req.params;
  const { status } = req.body;

  const payment = await Payment.findOneAndUpdate(
    { _id: paymentId },
    { status },
    { new: true, runValidators: true }
  );

  if (!payment) {
    throw new NotFoundError(`No payment with id ${paymentId}`);
  }

  res.status(StatusCodes.OK).json({ payment });
};

const getPaymentDetails = async (req, res) => {
  const { id: paymentId } = req.params;

  const payment = await Payment.findOne({ _id: paymentId })
    .populate("customerId", "phone")
    .populate("captainId", "phone")
    .populate("rideId");

  if (!payment) {
    throw new NotFoundError(`No payment with id ${paymentId}`);
  }

  res.status(StatusCodes.OK).json({ payment });
};

const getUserPayments = async (req, res) => {
  const payments = await Payment.find({ customerId: req.user.id })
    .populate("captainId", "phone")
    .populate("rideId");

  res.status(StatusCodes.OK).json({ payments, count: payments.length });
};

module.exports = {
  createPayment,
  updatePaymentStatus,
  getPaymentDetails,
  getUserPayments
};