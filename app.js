var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var ejs = require("ejs");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const routers = require("./routes/defines.default");
for (let i = 0; i < routers.length; i++) {
  let ele = routers[i];
  let eleExtends = ele.extends;

  if (ele.basic) {
    let baicRouter = require("./plugins/" + ele.path + "/index");
    app.use("/" + ele.path, baicRouter.router);
  }

  for (let m = 0; m < eleExtends.length; m++) {
    let basicPath = ele.path + "/" + eleExtends[m].path;
    app.use("/" + basicPath, require("./plugins/" + basicPath));
  }
}
app.use("/user", require("./plugins/users"));
app.use("/kite", require("./plugins/kite"));
app.use("/article", require("./plugins/article"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
