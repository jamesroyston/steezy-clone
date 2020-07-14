let Class = require('../models/classModel.js');

// source: https://medium.com/@dhaniNishant/creating-limit-skip-between-exclude-functions-for-javascript-arrays-4d60a75aaae7
function limit(c) {
  return this.filter((x, i) => {
    if (i <= (c - 1)) {
      return true
    }
  })
}

Array.prototype.limit = limit;

function skip(c) {
  return this.filter((x, i) => {
    if (i > (c - 1)) {
      return true
    }
  })
}

Array.prototype.skip = skip;

// Display list of all Classes
module.exports = {
  class_list: async function (req, res, next) {
    const pageSize = 9;
    //PageNumber From which Page to Start
    const pageNumber = req.body.page ? parseInt(req.body.page) : 1;

    let totalPages = Math.ceil(await Class.countDocuments({}) / pageSize);

    await Class
      .find({})
      .skip((pageNumber - 1) * pageSize)
      //limit is number of Records we want to display
      .limit(pageSize)
      .then(data => {
        data.forEach(classItem => {
          if (req.session.userId) {
            if (classItem.userIds.length > 0) {
              classItem.userIds.forEach(u => {
                classItem.userIds = [classItem.userIds.find(u => u.userId === req.session.userId)]
              })
            }
          } else {
            // if no session, return no progress data
            classItem.userIds = [];
          }
        })
        res.status(200).json(
          {
            data: [...data],
            pageNumber,
            totalPages
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
  class_get_all: function (req, res) {
    Class.find({}).then(data => res.status(200).json({
      data: [...data]
    }))
  },

  updateAll: function (req, res, next) {
    Class.updateMany({}, {$set: {videoUrl: 'https://www.youtube.com/watch?v=Vb8Bwq4FppQ'}}, function (error) {
      if (error) console.log(error)

      console.log('success')

    })
  },

  search: function (req, res) {
    const pageSize = 9;
    //PageNumber From which Page to Start
    let pageNumber = req.body.currentPage ? parseInt(req.body.currentPage) : 1;

    Class.search(req.body.query, function (error, output) {
      if (error) console.log(error);
      return output
    })
      .then(data => {
        // remove userIds from output before sending response with data
        let totalPages = Math.ceil(data.length / pageSize);
        if (totalPages < pageNumber) {
          pageNumber = 1;
        }

        data.forEach(classItem => {
          if (req.session.userId) {
            if (classItem.userIds && classItem.userIds.length > 0) {
              classItem.userIds.forEach(idx => {
                classItem.userIds = [classItem.userIds.find(() => req.session.userId === idx.userId)]
              })
            }
          } else {
            // if no session, return no progress data
            classItem.userIds = [];
          }
        });


        res.json({
          output: [...data.skip((pageNumber - 1) * pageSize).limit(pageSize)],
          pageNumber: pageNumber,
          totalPages
        })
      })
  }
}
