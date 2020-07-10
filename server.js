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
app.use(classRouter);
app.use(userRouter);


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

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));
