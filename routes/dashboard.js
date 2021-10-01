const epxress = require("express");
const dashboardController = require("../controllers/dashboardController");
const { verifyToken, verifyRole } = require("../middlewares/jwtVerifyToken");
const router = epxress.Router();

router.get("/users", verifyToken, verifyRole('Admin'), dashboardController.getUsers);
router.post("/user/disable/:id", verifyToken, verifyRole('Admin'), dashboardController.disableUser);
router.post("/user/enable/:id", verifyToken, verifyRole('Admin'), dashboardController.enableUser);
router.post("/user/makeadmin/:id", verifyToken, verifyRole('Admin'), dashboardController.makeAdmin);
router.post("/user/removeadmin/:id", verifyToken, verifyRole('Admin'), dashboardController.removeAdmin);

module.exports = router;