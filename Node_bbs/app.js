var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// nodejs와 mongoDB를 연동하기 위해 mongoose 모듈을 import
var mongoose = require("mongoose");
// db연결 객체 생성
var dbConn = mongoose.connection;
// id이름이 설정된 tag를 클릭했을때 수행할 event핸들링
// $("#id").on(click, function())
//$("#id").click(function())
// mongose를 통하여 db에 연결을 시도했을때 정상적으로 open이 되면
// db open이 성공하면 console 메시지를 보여라
dbConn.once("open",function(){
  console.log("MongoDB Open OK");
});
dbConn.on("error", function(error){
  console.error(error);
});
// mongoDB 서버
mongoose.connect("mongodb://localhost/mybbs",  {
  useNewUrlParser: true,  
  useUnifiedTopology: true, 
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var bbsRouter = require('./routes/bbsRoute');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// localhost:3000/bbs/* 요청하면 bbsRouter로 전달
app.use("/bbs", bbsRouter)
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
