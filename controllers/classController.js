const TimeFormat = require('hh-mm-ss');
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

      // algorithm for comparing and adjusting time ranges when overlapping occurs
      function compare(arr) {
        if (!arr) {
          return
        }
        let first = arr[0]; // arr[0].start is always 0

        // sort array by starts; remove any where end < start
        arr.forEach((item, idx) => {
          if (item.end < item.start) arr.splice(idx, 1);
        })
        arr.sort((a, b) => a.start - b.start)

        const overlapChecked = []
        for (let i = 1; i < arr.length; i++) {
          // arr[i] starts at or after FIRST; ends after
          if (
            first.end > arr[i].start &&
            first.end < arr[i].end
          ) {
            first.end = arr[i].end
            continue;
          }

          // arr[i] starts at or after FIRST; ends before
          if (
            first.start <= arr[i].start &&
            first.end >= arr[i].end
          ) {
            continue;
          }

          // arr[i] is between first and arr[i + 1]
          if (
            arr[i].start > first.end // && arr[i].end < arr[i + 1].start
          ) {
            overlapChecked.push(arr[i]);
            continue;
          }

          // arr[i] is after first; ends in arr[i + 1]
          if (arr[i].start > first.end && (arr[i + 1] && arr[i].end > arr[i + 1].start)) {
            arr[i].end = arr[i + 1].end
            overlapChecked.push(arr[i])
          }
        }
        overlapChecked.unshift(first);
        return overlapChecked;
      }

      let percentWatched;
      try {
        percentWatched = compare(req.body.percentWatched)
      } catch (error) {
        console.log(error)
      }


      // calculate overall percentage watched
      // NOTE TO REVIEWER: ADD CONSOLE.LOGS IN HERE TO SEE watched AND overall VALUES TO SEE THAT THIS WORKS
      let overall;
      let watched;
      if (percentWatched && percentWatched.length > 0) {
        try {
          watched = percentWatched.map(range => range.end - range.start)
          overall = watched.reduce((accumulator, currentValue) => accumulator + currentValue);
        } catch (error) {
          console.log(error)
        }
      }

      if (classById.userIds.find(user => user.userId === req.session.userId)) {
        classById.userIds.map(user => {
          if (user.userId === req.session.userId) {
            user.progress = req.body.progress;
            user.timestamp = TimeFormat.fromS(req.body.timestamp, 'mm:ss');
            user.percentWatched = (overall.toFixed(2) * 100) + '%';
            user.timeInClass = TimeFormat.fromS(req.body.timeInClass, 'hh:mm:ss');
          }
        })
      }

      if (!classById.userIds.find(user => user.userId === req.session.userId)) {
        classById.userIds.push({
          userId: req.session.userId,
          progress: req.body.progress,
          timestamp: req.body.timestamp,
          percentWatched: (overall * 100).toFixed(2) + '%',
          timeInClass: TimeFormat.fromS(req.body.timeInClass, 'hh:mm:ss')
        })
      }
      classById.save()
      res.sendStatus(200)
    })
  },

  // only used for changing the video URLs
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
                try {
                  classItem.userIds = [classItem.userIds.find(u => req.session.userId === u.userId)]
                } catch (error) {
                  // if here, we're dealing with a brand new user. they won't have any watched data, so the above .find should fail
                  console.log(error)
                }
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
