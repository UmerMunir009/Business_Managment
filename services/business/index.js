const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Business, User,User_Role } = require("../../models");
const { Op, where } = require("sequelize");

const create = asyncErrorHandler(async (req, res) => {
  
  const { name, description } = req.body;
  const businessData = {
    name,
    description,
    created_by: req.params.id,
    business_handler: req.businessHandler.id,
  };
  const data = await Business.create(businessData);
  
  const roles=req.body.roles
  for (const role in roles ) {
    await User_Role.create({
      user_id:req.businessHandler.id,
      business_id: data.id,
      role: roles[role],
    });
  }
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
    {model:User_Role,as:'business_roles', attributes:["role"]}
  
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
  const data = await Business.update(req.body, {
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