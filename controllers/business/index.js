const router = require("express").Router();
const businessServices = require("../../services/business/index");
const {validate}=require('./../../middlewares/validator')
const {businessCreateSchema} = require("./../../middlewares/validationSchemas/businessSchema");
const addOwner=require('../../middlewares/addOwner')
const {authenticate}=require('../../middlewares/auth.middleware')

router.post("/business/create/:id",authenticate,validate(businessCreateSchema),addOwner, businessServices.create);   
router.get("/business/get/:id",authenticate, businessServices.get);   
router.delete("/business/:id",authenticate, businessServices.del);   
router.patch("/business/:id",authenticate, businessServices.update);   


module.exports = router;