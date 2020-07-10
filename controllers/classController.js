let Class = require('../models/classModel.js');

// Display list of all Classes
exports.class_list = function(req, res, next) {
  Class.find({}).exec(function (error, classes) {
    if (error) return next(error)

    res.json({classes: classes})
  })
};

// Handle Class Id GET
exports.class_item = function(req, res, next) {
  Class.findById(req.params.id).exec(function (error, classById) {
    if (error) return next(error)

    res.json(classById)
  })
};
