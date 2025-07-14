const { User } = require('./../models'); 
const { STATUS_CODES, TEXTS } = require('./../config/constants');
const asyncErrorHandler = require("./../utils/asyncErrorHandler");


const checkBusinessHandler = asyncErrorHandler(async (req, res, next) => {
  
    const businessHandler = await User.findOne({
      where: { email: req.body.business_handler },
    });

    if (!businessHandler) {
      return res.status(400).json({
        statusCode: STATUS_CODES.CONFLICT,
        message: TEXTS.USER_NOT_FOUND,
      });
    }
    req.businessHandler = businessHandler;
    next();
})

module.exports = checkBusinessHandler;
