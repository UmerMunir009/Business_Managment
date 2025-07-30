const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Business,Category } = require("../../models");
const { Op, where } = require('sequelize');
const { raw } = require("express");

const create = asyncErrorHandler(async (req, res) => {

  const categoryData={
    ...req.body,
    business_id:req.params.id
  }

  const data = await Category.create(categoryData);
  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data,
  });



});


const get = asyncErrorHandler(async (req, res) => {

  const  id  = req.params.id;
  const data=await Category.findAll({
    where:{business_id:id},
    ...req.pagination,
    raw:true
  }

)
  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.FOUND,
    data: data,
  });

});



const del = asyncErrorHandler(async (req, res) => {

  const data = await Category.destroy({
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

  const data = await Category.update(req.body, {
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



module.exports = {
  create,
  get,
  del,
  update
};
