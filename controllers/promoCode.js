//controllers/promoCode.js-new
const PromoCode = require("../models/PromoCode");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createPromoCode = async (req, res) => {
  const { promoCode, discount, expiryDate } = req.body;

  const promo = await PromoCode.create({
    promoCode,
    discount,
    expiryDate
  });

  res.status(StatusCodes.CREATED).json({ promo });
};

const getAllPromoCodes = async (req, res) => {
  const promoCodes = await PromoCode.find({});
  res.status(StatusCodes.OK).json({ promoCodes, count: promoCodes.length });
};

const validatePromoCode = async (req, res) => {
  const { code } = req.params;

  const promoCode = await PromoCode.findOne({
    promoCode: code.toUpperCase(),
    status: "active",
    expiryDate: { $gt: new Date() }
  });

  if (!promoCode) {
    throw new NotFoundError("Invalid or expired promo code");
  }

  res.status(StatusCodes.OK).json({ promoCode });
};

module.exports = {
  createPromoCode,
  getAllPromoCodes,
  validatePromoCode
};