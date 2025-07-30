const router = require("express").Router();
const productServices = require("../../services/product/index");
const {productCreateSchema}= require('./../../middlewares/validationSchemas/productSchema')
const {validate}=require('./../../middlewares/validator')
const {authenticate}=require('../../middlewares/auth.middleware')


router.post("/product/create/:id",authenticate,validate(productCreateSchema), productServices.create);   
router.get("/product/get/:id",authenticate, productServices.get);   
router.delete("/product/:id", authenticate,productServices.del);   
router.patch("/product/:id", authenticate,productServices.update);   


module.exports = router;