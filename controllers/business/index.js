const router = require("express").Router();
const businessServices = require("../../services/business/index");


router.post("/business/create/:id", businessServices.create);   
router.get("/business/get/:id", businessServices.get);   
router.delete("/business/:id", businessServices.del);   
router.patch("/business/:id", businessServices.update);   


module.exports = router;