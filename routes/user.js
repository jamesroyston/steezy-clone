let express = require("express");
let router = express.Router();

// require controllers
let user_controller = require("../controllers/userController");

router.post("/api/signup", user_controller.signup);
router.post("/api/login", user_controller.login);
// router.post("/api/updateWatched", user_controller.updateWatched);
// router.get("/api/getWatchedList", user_controller.getWatchedList);
router.delete("/api/logout", user_controller.logout);
router.get("/api/sessionCheck", user_controller.sessionCheck);

module.exports = router;
