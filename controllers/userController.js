let User = require("../models/userModel");

module.exports = {

  isAuthenticated: (req, res, next) => {
    if (req.session.userId || req.session.isAuthenticated) {
      return next()
    }
  },

  signup: async (req, res) => {
    const {username, password} = req.body;
    if (username === undefined || username.length < 1) {
      return res.send("no username provided");
    }
    if (password === undefined || password.length < 1) {
      return res.send("no password provided");
    }
    const user = new User({username, password});
    try {
      await user.save().catch((err) => {
        throw err;
      });
      res.status(200).send("registration successful");
    } catch (err) {
      if (err.toString() === "Error: There was a duplicate key error") {
        res.status(302).json({error: "duplicate username, maybe try resetting your password"});
      } else {
        res.status(500).json({error: `internal error, ${err}`});
      }
    }
  },

  login: (req, res) => {
    const {username, password} = req.body
    User.findOne({username}, function (err, user) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "internal error please try again",
        });
      }
      if (!user) {
        return res.status(401).json({
          status: 401,
          error: "incorrect username or password",
        });
      }
      user.isCorrectPassword(password, function (err, isSamePassword) {
        if (err) {
          res.status(500).json({
            error: "internal error please try again",
          });
        } else if (!isSamePassword) {
          res.status(401).json({
            isSamePassword: `${isSamePassword}`,
            error: "incorrect username or password",
          });
        } else {
          // log them in, update session with user._id
          req.session.userId = user._id;
          req.session.username = user.username;
          req.session.isAuthenticated = true;
          res.status(200).json({
            username: user.username,
          });
        }
      });
    });
  },

  logout: async (req, res) => {
    await req.session.destroy();
    await res.sendStatus(200);
  },

  sessionCheck: (req, res) => {
    if (req.session.userId || req.session.isAuthenticated) {
      return res.status(200).json({
        isAuthenticated: req.session.isAuthenticated,
        username: req.session.username
      })
    }
    res.sendStatus(404)
  },

  // getWatchedList: (req, res, next) => {
  //   User.findById(req.session.userId).exec(function (error, user) {
  //     if (error) return next(error)
  //
  //     res.json(user.watchedVideos)
  //   })
  // },
  //
  // updateWatched: (req, res) => {
  //   // grab videoID and playback out of req
  //   console.log('hi')
  //   User.findById(req.session.userId).exec(function (err, user) {
  //     if (err) console.log(err)
  //     // console.log(user)
  //     // console.log(req.body.videoId)
  //     // console.log(req.body.progress)
  //     const existingSubDocument = user.watchedVideos.find(video => video.id === req.body.videoId);
  //     if (existingSubDocument !== undefined) {
  //       existingSubDocument.progress = req.body.progress;
  //     } else {
  //       user.watchedVideos.push({id: req.body.videoId, progress: req.body.progress})
  //     }
  //     user.save();
  //     res.sendStatus(200);
  //   })

  // }
}
