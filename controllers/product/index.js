const router = require("express").Router();
const productServices = require("../../services/product/index");


router.post("/product/create/:id", productServices.create);   
router.get("/product/get/:id", productServices.get);   
router.delete("/product/:id", productServices.del);   
router.patch("/product/:id", productServices.update);   


module.exports = router;