const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Business,Category,Product } = require("../../models");
const {productCreateSchema}= require('./../../middlewares/validationSchemas/productSchema')
const { Op, where } = require('sequelize');
const { raw } = require("express");

const create = asyncErrorHandler(async (req, res) => {

  const { error } = productCreateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      statusCode: STATUS_CODES.REQUIRED,
      message: error.details[0].message,
    });
  }
  const productData={
    ...req.body,
    category_id:req.params.id
  }

  const data = await Product.create(productData);
  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data,
  });



});


const get = asyncErrorHandler(async (req, res) => {

  const  id  = req.params.id;
  const data=await Product.findAndCountAll({
    where:{category_id:id},
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

  const data = await Product.destroy({
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

  const data = await Product.update(req.body, {
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
