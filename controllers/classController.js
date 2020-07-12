let Class = require('../models/classModel.js');

// Display list of all Classes
exports.class_list = async function (req, res, next) {
  const pagination = req.body.pagination ? parseInt(req.body.pagination) : 9;
  //PageNumber From which Page to Start
  const pageNumber = req.body.page ? parseInt(req.body.page) : 1;

  let pages = Math.ceil(await Class.countDocuments({}) / pagination);

  await Class
    .find({})
    .skip((pageNumber - 1) * pagination)
    //limit is number of Records we want to display
    .limit(pagination)
    .then(data => res.status(200).json(
      {
        data: [...data],
        pageNumber,
        pages: pages
      }
    ))
};

// Handle Class Id GET
exports.class_item = function (req, res, next) {
  Class.findById(req.params.id).exec(function (error, classById) {
    if (error) return next(error)

    res.json(classById)
  })
};

exports.class_get_all = function (req, res, next) {
  Class.find({}).then(data => res.status(200).json({
    data: [...data]
  }))
}

exports.updateAll = function (req, res, next) {
  Class.updateMany({}, {$set: {videoUrl: 'https://www.youtube.com/watch?v=YE7VzlLtp-4'}}, function (error) {
    if (error) console.log(error)

    console.log('success')

  })
}
