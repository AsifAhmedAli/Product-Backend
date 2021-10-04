const epxress = require("express");
const dashboardPriceController = require("../controllers/dashboard/prices");
const dashboardStarsCategoryController = require("../controllers/dashboard/stars");
const dashboardUserController = require("../controllers/dashboard/users");
const { verifyToken, verifyRole } = require("../middlewares/jwtVerifyToken");
const router = epxress.Router();

// User management Routes for admin
router.get("/users", verifyToken, verifyRole('Admin'), dashboardUserController.getUsers);
router.get("/user/:id", verifyToken, verifyRole('Admin'), dashboardUserController.getUser);
router.post("/user/disable/:id", verifyToken, verifyRole('Admin'), dashboardUserController.disableUser);
router.post("/user/enable/:id", verifyToken, verifyRole('Admin'), dashboardUserController.enableUser);
router.post("/user/makeadmin/:id", verifyToken, verifyRole('Admin'), dashboardUserController.makeAdmin);
router.post("/user/removeadmin/:id", verifyToken, verifyRole('Admin'), dashboardUserController.removeAdmin);

// Price management Routes for admin
router.get("/prices", verifyToken, verifyRole('Admin'), dashboardPriceController.getPrices);
router.post("/price/update", verifyToken, verifyRole('Admin'), dashboardPriceController.updatePrice);

// Stars management Routes for admin
router.get("/startypes", verifyToken, verifyRole('Admin'), dashboardStarsCategoryController.getStarCategories);
router.post("/startype/update", verifyToken, verifyRole('Admin'), dashboardStarsCategoryController.updateStarsCategory);
// router.post("/startype/add", verifyToken, verifyRole('Admin'), dashboardStarsCategoryController.addStarsCategory);

module.exports = router;