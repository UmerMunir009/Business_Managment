const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Business, User,User_Role } = require("../../models");
const { Op, where } = require("sequelize");

const create = asyncErrorHandler(async (req, res) => {
  console.log('in the handler')
const { name, description } = req.body;
  const businessData = {
    name,
    description,
    created_by: req.params.id,
    owner: req.owner
  };
  const data = await Business.create(businessData);
  await User_Role.create({user_id:req.owner,
      business_id: data.id,
      role: 'Owner',
    });
  
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
    { model: User, as: "businessOwner", attributes: ["id", "name", "email"] },
    {model:User_Role,as:'business_roles', attributes:["role"]}
  
  ];
  let data = {};
  if (user?.admin) {
    data = await Business.findAll({
      include: includeOptions,
      ...req.pagination,
    });
  } else {
    data = await Business.findAll({
      where: { owner: id },
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