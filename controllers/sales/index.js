const router = require("express").Router();
const salesServices = require("../../services/sales/index");
const checkInventory=require('./../../middlewares/checkInventory')

router.post("/sales/create/:id",checkInventory, salesServices.create);//place order against user   
router.get("/sales/get/:id", salesServices.get); //get Sales for particular business  
router.delete("/sales/:id", salesServices.del);     


module.exports = router;