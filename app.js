require("dotenv").config();

const app = express();
const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sessionsRouter = require('./routes/sessions');
const basketsRouter = require('./routes/baskets');

const urlencodedParser = bodyParser.urlencoded({extended: false})

const port = 8000;
const dbURI = `mongodb+srv://${process.env.DBUN}:${process.env.DBPW}@cluster0.2zocm.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

app.use(bodyParser.json(), urlencodedParser);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/baskets', basketsRouter);

app.use(cors());

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
