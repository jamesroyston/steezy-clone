let User = require('../models/userModel');

// Handle Sign Up
exports.signup = async (req, res) => {
  const {username, password} = req.body
  if (username === undefined || username.length < 1) {
    return res.send('no username provided');
  }
  if (password === undefined || password.length < 1) {
    return res.send('no password provided');
  }
  const user = new User({username, password})
  try {
    await user.save().catch(err => {
      throw err;
    })
    res.status(200).send('registration successful')
  } catch (err) {
    if (err.toString() === 'Error: There was a duplicate key error') {
      res.status(302).json({error: "duplicate username, maybe try resetting your password"})
    } else {
      res.status(500).json({error: `internal error, ${err}`})
    }
  }
}

// Handle login
exports.login = (req, res) => {
  req.session = {};
  const {username, password} = req.body
  User.findOne({username}, function (err, user) {
    if (err) {
      console.error(err)
      return res.status(500)
        .json({
          error: 'internal error please try again'
        })
    }
    if (!user) {
      return res.status(401)
        .json({
          error: 'incorrect username or password'
        })
    }
    user.isCorrectPassword(password, function (err, isSamePassword) {
      if (err) {
        res.status(500)
          .json({
            error: 'internal error please try again'
          })
      } else if (!isSamePassword) {
        res.status(401)
          .json({
            isSamePassword: `${isSamePassword}`,
            error: 'incorrect username or password'
          })
      } else {
        // log them in, update session with user._id
        req.session.userId = user._id
        req.session.username = user.username
        req.session.isAuthenticated = true
        res.status(200).json({
          username: user.username
        })

      }
    })
  })
}
