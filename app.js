const express = require('express');
const path = require('path');
const injectMiddleWares = require('./src/middleware');
const {errorMiddleware} = require('./src/middleware/handler');
const routes = require('./src/routes');
const { validateEnvVar } = require('./src/utils/util');
const connectDB = require('./src/db/mongodb');
// validate if we have all the env variables setup.
validateEnvVar();
const app = express();
// serving static files
app.use('/assets', express.static(path.join(__dirname, './public')));
// use database
connectDB();
// set up all middleware
injectMiddleWares(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// routes
app.use('/', routes);
app.use((req, res, next) => {
    const acceptsJson = req.accepts('json') && req.get('Accept').includes('application/json');
    if (acceptsJson) {
        res.status(404).json({
            status: 'error',
            message: "Page not found"
        });
    } else {
        res.status(404).render('error', {
            page: '404',
            description: 'Page not found |Lập Trình Web Phía Máy Chủ | Nguyễn Tuấn Kiệt ',
            status: '404',
            message: 'Page not found',
            action: '404',

        });
    }
});
app.use(errorMiddleware);
module.exports = app;
