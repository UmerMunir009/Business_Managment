const router = require("express").Router();
const categoryServices = require("../../services/category/index");
const {categoryCreateSchema}= require('./../../middlewares/validationSchemas/categorySchema')
const {validate}=require('./../../middlewares/validator')
const {authenticate}=require('../../middlewares/auth.middleware')



router.post("/category/create/:id",authenticate,validate(categoryCreateSchema), categoryServices.create);  
router.get("/category/get/:id", authenticate,categoryServices.get);    //get categories by providing business id
router.delete("/category/:id", authenticate,categoryServices.del);   
router.patch("/category/:id", authenticate,categoryServices.update);   


module.exports = router;