const router = require("express").Router();
const categoryServices = require("../../services/category/index");
const {categoryCreateSchema}= require('./../../middlewares/validationSchemas/categorySchema')
const {validate}=require('./../../middlewares/validator')



router.post("/category/create/:id",validate(categoryCreateSchema), categoryServices.create);  
router.get("/category/get/:id", categoryServices.get);    //get categories by providing business id
router.delete("/category/:id", categoryServices.del);   
router.patch("/category/:id", categoryServices.update);   


module.exports = router;