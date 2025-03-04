// //controllers/promoCode.js-new
// const PromoCode = require("../models/PromoCode");
// const { StatusCodes } = require("http-status-codes");
// const { BadRequestError, NotFoundError } = require("../errors");

// const createPromoCode = async (req, res) => {
//   const { promoCode, discount, expiryDate } = req.body;

//   const promo = await PromoCode.create({
//     promoCode,
//     discount,
//     expiryDate
//   });

//   res.status(StatusCodes.CREATED).json({ promo });
// };

// const getAllPromoCodes = async (req, res) => {
//   const promoCodes = await PromoCode.find({});
//   res.status(StatusCodes.OK).json({ promoCodes, count: promoCodes.length });
// };

// const validatePromoCode = async (req, res) => {
//   const { code } = req.params;

//   const promoCode = await PromoCode.findOne({
//     promoCode: code.toUpperCase(),
//     status: "active",
//     expiryDate: { $gt: new Date() }
//   });

//   if (!promoCode) {
//     throw new NotFoundError("Invalid or expired promo code");
//   }

//   res.status(StatusCodes.OK).json({ promoCode });
// };

// module.exports = {
//   createPromoCode,
//   getAllPromoCodes,
//   validatePromoCode
// };

// controllers/promoCode.js
import PromoCode from "../models/PromoCode.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const createPromoCode = async (req, res) => {
  const { promoCode, discount, expiryDate } = req.body;

  if (!promoCode || !discount || !expiryDate) {
    throw new BadRequestError("Promo code, discount, and expiry date are required");
  }

  try {
    const promo = await PromoCode.create({
      promoCode,
      discount,
      expiryDate,
    });

    res.status(StatusCodes.CREATED).json({
      message: "Promo code created successfully",
      promo,
    });
  } catch (error) {
    console.error("Error creating promo code:", error);
    throw new BadRequestError("Failed to create promo code");
  }
};

export const getAllPromoCodes = async (req, res) => {
  try {
    const promoCodes = await PromoCode.find({});
    res.status(StatusCodes.OK).json({
      message: "Promo codes retrieved successfully",
      promoCodes,
      count: promoCodes.length,
    });
  } catch (error) {
    console.error("Error retrieving promo codes:", error);
    throw new BadRequestError("Failed to retrieve promo codes");
  }
};

export const validatePromoCode = async (req, res) => {
  const { code } = req.params;

  try {
    const promoCode = await PromoCode.findOne({
      promoCode: code.toUpperCase(),
      status: "active",
      expiryDate: { $gt: new Date() },
    });

    if (!promoCode) {
      throw new NotFoundError("Invalid or expired promo code");
    }

    res.status(StatusCodes.OK).json({
      message: "Promo code is valid",
      promoCode,
    });
  } catch (error) {
    console.error("Error validating promo code:", error);
    throw new BadRequestError("Failed to validate promo code");
  }
};
