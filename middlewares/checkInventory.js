// middlewares/checkInventory.js
const { Product } = require('../models');
const { STATUS_CODES, TEXTS } = require('./../config/constants');
const  asyncErrorHandler=require('./../utils/asyncErrorHandler')

const checkInventory = asyncErrorHandler(async (req, res, next) => {
  const { items } = req.body;

  for (let item of items) {
    const product = await Product.findByPk(item.product_id);

    if (!product || product.quantity < item.quantity) {
      return res.status(STATUS_CODES.CONFLICT).json({
        statusCode: STATUS_CODES.CONFLICT,
        message: TEXTS.OUT_OF_STOCK,
      });
    }
  }

  next();
})

module.exports = checkInventory;
