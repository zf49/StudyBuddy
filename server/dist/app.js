"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createError = require('http-errors');
var express = require('express');
// authentication
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const { expressjwt: jwt } = require('express-jwt');
const jwksClient = require('jwks-rsa');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var majorRouter = require('./routes/major');
var friendsRouter = require('./routes/friends');
var courseRouter = require('./routes/course');
var questionRouter = require('./routes/question');
var replyRouter = require('./routes/reply');
var commentRouter = require('./routes/comment');
const db_connect_1 = __importDefault(require("./config/db-connect"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_init_1 = require("./config/db-init");
const cors = require('cors');
var app = express();
// auth0  
app.use(cors());
const client = jwksClient({
    jwksUri: 'https://dev-6-070568.us.auth0.com/.well-known/jwks.json',
});
// const checkJwt = jwt({
//   secret: (header, callback) => {
//     client.getSigningKey(header.kid, (err, key) => {
//       if (err) {
//         callback(err);
//       } else {
//         const publicKey = key.getPublicKey();
//         callback(null, publicKey);
//       }
//     });
//   },
//   audience: 'https://dev-6-070568.us.auth0.com/api/v2/',
//   issuer: 'https://dev-6-070568.us.auth0.com/',
//   algorithms: ['RS256'],
//   verify: (req, payload, done) => {
//     if (payload) {
//       req.user = payload;
//       console.log('success');
//       done();
//     } else {
//       console.log('failed');
//     }
//   },
// });
// app.use(checkJwt);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const checkJwt = jwt({
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 60,
        jwksUri: 'https://dev-6-070568.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://dev-6-070568.us.auth0.com/api/v2/',
    issuer: 'https://dev-6-070568.us.auth0.com/',
    algorithms: ['RS256']
});
//TODO
app.use(checkJwt);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/major', majorRouter);
app.use('/friends', friendsRouter);
app.use('/courses', courseRouter);
app.use('/question', questionRouter);
app.use('/reply', replyRouter);
app.use('/comment', commentRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
(0, db_connect_1.default)();
mongoose_1.default.connection.on('open', function (error) {
    if (error) {
        console.log("failed");
    }
    else {
        console.log("DB connection is successful");
    }
});
(0, db_init_1.initUserData)();
(0, db_init_1.initMajorData)();
(0, db_init_1.initCourseData)();
module.exports = app;
