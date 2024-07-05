const express = require('express');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const session = require('express-session');
function injectMiddleWares(app) {
  // enable compression.
  app.use(compression());
  // enable CORS.
  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', ['Content-Type', 'Authorization'])
    next()
  })
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(cookieParser());
  app.use(bodyParser.json())
  app.use(logger('dev'));
  app.use(session({
    secret: "TanNhatCMS",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Sử dụng secure: true nếu sử dụng HTTPS
  }));
  app.use((req, res, next) => {
    if(!res.locals.notifications){
      res.locals.notifications = undefined;
    }
    next();
  })
}

module.exports = injectMiddleWares;
