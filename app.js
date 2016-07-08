var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Config
var settings = require('./settings');
//View Related Routes
// var routes = require('./routes/index');
//Api Related Routes
var api = require('./routes/indexApi');
 

//Express App
var app = express();

//Is Dev Environment?
var isDevEnv = app.get('env') === 'development';

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//If Dev, Enable logger
if(isDevEnv){
    //将请求打印出来
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//Session
app.use(session({
  secret: settings.appInfo.sessionSecret
}))
//Public dir
app.use(express.static(path.join(__dirname,'app','build')));

//Routes
// app.use('/', routes);

app.use(api);

// app.all('*',function(res, req, next){
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");  
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
// })
app.get('/', function(req, res, next) {
    res.render('index', {
        title: 'zz blog',
        shortDes: 'blog'
    });
});
app.listen(3000,function(){
  console.log('open 3000')
})


//Not Found
app.use(
    function(req, res, next){
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
);

//Dev Error
if (isDevEnv) {
    app.use(function(err, req, res, next){
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
    });
}

//Prod Error
app.use(function(err, req, res, next){
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: {}
        });
    });

module.exports = app;
