const router = require("express").Router();

router.use(require('./../controllers/user/userController.js'));
router.use(require('./../controllers/business/index.js'))
router.use(require('../controllers/category/index.js'));
router.use(require('../controllers/product/index.js'));
router.use(require('../controllers/sales/index.js'));
// router.use(require('../controllers/Content/index.js'));
// router.use(require('../controllers/bookmark/index.js'));

module.exports = router;

