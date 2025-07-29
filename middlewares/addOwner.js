const { User } = require("../models");
const { STATUS_CODES, TEXTS } = require("../config/constants");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const addOwner = asyncErrorHandler(async (req, res, next) => {
  console.log('in the add')
  const {owner}=req.body
  const ownerData = {
    name: owner.name,
    email: owner.email,
    password: owner.password,
  };
  console.log(ownerData)
  const createdOwner = await User.create(ownerData);
  req.owner = createdOwner.id;
  next();
});

module.exports = addOwner;
