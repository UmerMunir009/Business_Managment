const router = require("express").Router();
const salesServices = require("../../services/sales/index");
const checkInventory=require('./../../middlewares/checkInventory')
const {authenticate}=require('../../middlewares/auth.middleware')

router.post("/sales/create/:id",authenticate,checkInventory, salesServices.create);//place order against user   
router.get("/sales/get/:id",authenticate, salesServices.get); //get Sales for particular business  
router.delete("/sales/:id", authenticate,salesServices.del);     


module.exports = router;