const APIError = require('../utils/error');
const {log} = require("debug");
const helpers = {};
const messageList = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Internal Server Error",
};

helpers.HttpError = (status, message = messageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}
helpers.apiError = (status, message = messageList[status], errors, data = false ) => {
    return new APIError(message, status, errors, data);
}
helpers.redirect = (req, res, url, data)=>{
    req.session.notifications  =  data;
    req.session.save((err) => {
        if (err) {
            return console.log('Lỗi khi lưu session');
        }
    });
    res.redirect(url);
}
helpers.notification = (req, res, next) => {
    res.locals.notifications = req.session.notifications;
    delete req.session.notifications;
    req.session.save((err) => {
        if (err) {
            return console.log('Lỗi khi xóa session');
        }
    });
    next();
}
module.exports = helpers;
