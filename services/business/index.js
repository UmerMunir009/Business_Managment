const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Business, User } = require("../../models");
const {
  businessCreateSchema,
} = require("./../../middlewares/validationSchemas/businessSchema");
const { Op, where } = require("sequelize");

const create = asyncErrorHandler(async (req, res) => {
  const { error } = businessCreateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      statusCode: STATUS_CODES.REQUIRED,
      message: error.details[0].message,
    });
  }
  const businessHandler = await User.findOne({
    where: { email: req.body.business_handler },
  });
  if (!businessHandler) {
    return res.status(400).json({
      statusCode: STATUS_CODES.CONFLICT,
      message: TEXTS.USER_NOT_FOUND,
    });
  }

  const { name, description } = req.body;
  const businessData = {
    name,
    description,
    created_by: req.params.id,
    business_handler: businessHandler.id,
  };
  const data = await Business.create(businessData);
  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data,
  });
});

const get = asyncErrorHandler(async (req, res) => {
  const  id  = req.params.id;
  const user = await User.findOne({ where: { id } });
  const includeOptions = [
    { model: User, as: "creator", attributes: ["id", "name", "email"] },
    { model: User, as: "handler", attributes: ["id", "name", "email"] },
  
  ];
  let data = {};
  if (user?.admin) {
    data = await Business.findAndCountAll({
      include: includeOptions,
      ...req.pagination,
    });
  } else {
    data = await Business.findAndCountAll({
      where: { business_handler: id },
      include: includeOptions,
      ...req.pagination,
    });
  }

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.FOUND,
    data: data,
  });
});



const del = asyncErrorHandler(async (req, res) => {
  const data = await Business.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.DELETED,
    data: data,
  });
});

const update = asyncErrorHandler(async (req, res) => {
  const data = await Book.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.UPDATED,
    data: data,
  });
});


module.exports = {
  create,
  get,
  del,
  update,
};