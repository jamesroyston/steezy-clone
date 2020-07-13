let Class = require('../models/classModel.js');

// Display list of all Classes
module.exports = {
  class_list: async function (req, res, next) {
    const pagination = req.body.pagination ? parseInt(req.body.pagination) : 9;
    //PageNumber From which Page to Start
    const pageNumber = req.body.page ? parseInt(req.body.page) : 1;

    let pages = Math.ceil(await Class.countDocuments({}) / pagination);

    await Class
      .find({})
      .skip((pageNumber - 1) * pagination)
      //limit is number of Records we want to display
      .limit(pagination)
      .then(data => {
        let temp;
        data.map(classItem => {
          if (req.session.userId) {
            if (classItem.userIds.length > 0) {
              classItem.userIds.map(u => {
                if (u.userId === req.session.userId) {
                  temp = u;
                }
              })
              classItem.userIds = [temp]
            }
            // else classItem.userIds is [] and should stay that way....
          } else {
            // if no session, return no progress data
            classItem.userIds = [];
          }
        })
        res.status(200).json(
          {
            data: [...data],
            pageNumber,
            pages: pages
          }
        )
      })
  },


// Handle Class Id GET
  class_item: function (req, res, next) {
    Class.findById(req.params.id).exec(function (error, classById) {
      if (error) return next(error)

      res.json(classById)
    })
  },

  update_user_on_class_item: function (req, res, next) {
    if (!req.session.userId) {
      return;
    }

    Class.findById(req.body.videoId).exec(function (error, classById) {
      if (error) return next(error)

      if (classById.userIds.find(user => user.userId === req.session.userId)) {
        classById.userIds.map(user => {
          if (user.userId === req.session.userId) {
            user.progress = req.body.progress
          }
        })
      }

      if (!classById.userIds.find(user => user.userId === req.session.userId)) {
        classById.userIds.push({
          userId: req.session.userId,
          progress: req.body.progress,
        })
      }
      classById.save()
      res.sendStatus(200)
    })
  },

// Return all classes
  class_get_all: function (req, res, next) {
    Class.find({}).then(data => res.status(200).json({
      data: [...data]
    }))
  },

  updateAll: function (req, res, next) {
    Class.updateMany({}, {$set: {videoUrl: 'https://www.youtube.com/watch?v=Vb8Bwq4FppQ'}}, function (error) {
      if (error) console.log(error)

      console.log('success')

    })
  }
}
