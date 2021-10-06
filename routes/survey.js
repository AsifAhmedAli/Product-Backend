const epxress = require("express");
const surveyController = require("../controllers/surveyController");
const { verifyToken, verifyRole } = require("../middlewares/jwtVerifyToken");
const router = epxress.Router();

// User management Routes for admin
router.post("/add", verifyToken, verifyRole('Admin'), surveyController.addSurvey);
router.post("/submit/:surveyID", verifyToken, surveyController.submitSurvey);

module.exports = router;