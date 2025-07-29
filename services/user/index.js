const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { generateToken } = require("../../utils/jwtToken");
const { User,Business } = require("../../models");

const create = asyncErrorHandler(async (req, res) => {
console.log("in the handler")
  const isExist = await User.findOne({
    where: {
      email: req.body.email
    },
    raw: true
  })

  if (isExist) {
    return res.status(STATUS_CODES.CONFLICT).json({
      statusCode: STATUS_CODES.CONFLICT,
      message: TEXTS.USER_EXIST,
    });
  }
  const {name,email,password}=req.body
   const userData={
    name,
    email,
    password,
    admin:false
   }

  const user = await User.create(userData);
  console.log(user)
  let access_token = generateToken(user);


  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: user,
    accessToken:access_token
  });

});


const get = asyncErrorHandler(async (req, res) => {


  const data = await User.findAndCountAll({
    ...req.pagination
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.DATA_FOUND,
    data: data,
  });

});


const del = asyncErrorHandler(async (req, res) => {

  const data = await User.destroy({
    where: {
      id: req.params.id
    }
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.DELETED,
    data: data,
  });

});


const update = asyncErrorHandler(async (req, res) => {

  const data = await User.update({password:req.body.newPassword}, {
    where: {
      id: req.params.id
    },
    returning: true,
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.UPDATED,
    data: data,
  });

});


// login user
const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
      password: password
    },
    raw: true
  })

  if (user) {
    let access_token = generateToken(user);
    const userBusinesses = await Business.findAll({where:{owner:user.id},
    ...req.pagination
  });
    res.status(STATUS_CODES.SUCCESS).json({
      statusCode: STATUS_CODES.SUCCESS,
      message: TEXTS.LOGIN,
      data: 
      {
        businesses:userBusinesses,
        userData:user
      },
      accessToken: access_token
    });

  } else {
    res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: TEXTS.UN_AUTHORIZED
    });
  }

});

//login admin
const admin = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
      password: password
    },
    raw: true
  })

  if (user?.admin) {
    let access_token = generateToken(user);
    const data = await Business.findAll({
    ...req.pagination
  });

    res.status(STATUS_CODES.SUCCESS).json({
      statusCode: STATUS_CODES.SUCCESS,
      message: TEXTS.SUCCESS,
      data: data,
      accessToken: access_token
    });

  } else {
    res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: "Invalid credentials"
    });
  }

});




module.exports = {
  login,
  create,
  get,
  update,
  del,
  admin
};
