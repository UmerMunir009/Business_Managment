const router = require("express").Router();
const productServices = require("../../services/product/index");
const {productCreateSchema}= require('./../../middlewares/validationSchemas/productSchema')
const {validate}=require('./../../middlewares/validator')


router.post("/product/create/:id",validate(productCreateSchema), productServices.create);   
router.get("/product/get/:id", productServices.get);   
router.delete("/product/:id", productServices.del);   
router.patch("/product/:id", productServices.update);   


module.exports = router;