const router = require("express").Router();
const businessServices = require("../../services/business/index");
const {validate}=require('./../../middlewares/validator')
const {businessCreateSchema} = require("./../../middlewares/validationSchemas/businessSchema");
const checkBusinessHandler=require('./../../middlewares/checkBusinessHandler')

router.post("/business/create/:id",validate(businessCreateSchema),checkBusinessHandler, businessServices.create);   
router.get("/business/get/:id", businessServices.get);   
router.delete("/business/:id", businessServices.del);   
router.patch("/business/:id", businessServices.update);   


module.exports = router;