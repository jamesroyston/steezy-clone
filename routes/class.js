let express = require('express');
let router = express.Router();

// require controllers
let class_controller = require('../controllers/classController');

router.get('/api/classes/:id', class_controller.class_item);
router.post('/api/updateClasses', class_controller.update_user_on_class_item);
router.post('/api/search', class_controller.search);

module.exports = router;
