const router = require("express").Router();
const userServices = require("../../services/user/index");
const {validate}=require('./../../middlewares/validator')
const {userCreateSchema}=require("./../../middlewares/validationSchemas/usersSchema")


router.post("/login", userServices.login); 
router.post("/admin", userServices.admin); 
router.post("/user/create",validate(userCreateSchema), userServices.create);   
router.get("/user/get", userServices.get);   
router.delete("/user/:id", userServices.del);   
router.patch("/user/:id", userServices.update);   


module.exports = router;