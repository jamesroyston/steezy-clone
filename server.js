// set up server dependencies
const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv/config');

// routes;
let classRouter = require('./routes/class');
let userRouter = require('./routes/user');

// middlewares;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// connect to DB
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'steezyDb'
})
  .then(() => console.log('db connected!'))
  .catch(err => console.log(`db connection error: ${err.message}`))

// reuse current mongoose connection for session store
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
  }
}));

// mount routers || must be last middleware mounted
// https://stackoverflow.com/questions/39796228/req-session-is-undefined-using-express-session
app.use(classRouter);
app.use(userRouter);

// method for updating Class fields (like youtube url)
// m = require("./controllers/classController")
// m.updateAll();

/*
** NOTE: ONLY UNCOMMENT THE LINES BELOW ONCE YOU'RE READY
** TO SERVE THE REACT BUILD
*/

// **serve static assets from client
app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));
