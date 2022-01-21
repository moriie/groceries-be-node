require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessionsRouter = require('./routes/sessions')

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false})
app.use(bodyParser.json(), urlencodedParser)

const port = 8000;
const dbURI = `mongodb+srv://${process.env.DBUN}:${process.env.DBPW}@cluster0.2zocm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((res)=>{
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  })
})
.catch(err=>console.log(err))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter)

const isLoggedIn = (req, res, next) => {_
  const token = req.headers["x-access-token"]?.split(' ')[1]

  if (token) {
      jwt.verify(token, process.env.SECRET), (err, decoded) => {
          if (err) return res.json({
              isLoggedIn: false,
              messaged: "Failed to Authenticate"
          })
          req.user = {};
          req.user.id = decoded.id
          req.user.username = decoded.username
          next()
      
      }
  }
  else {
      res.json({message: "Incorrect Token", isLoggedIn: false})
  }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
