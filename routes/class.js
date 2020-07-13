let express = require('express');
let router = express.Router();

// require controllers
let class_controller = require('../controllers/classController');

router.post('/api/classes', class_controller.class_list);
router.get('/api/classes/:id', class_controller.class_item);
router.post('/api/updateClasses', class_controller.update_user_on_class_item);

module.exports = router;
