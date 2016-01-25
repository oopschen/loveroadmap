'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

// get webpack config
var host='127.0.0.1', port= 8080;

gulp.task('default', function() {
    gutil.log("run command for development: webpack-dev-server --content-base src/ ");
});

gulp.task('prod', function() {
  // set env
  process.env.NODE_ENV = 'production';
  var webpackCfg = require('./webpack.config.js');

  // run webpack
  webpack(webpackCfg, function(err, stats) {
    if(err) {
      throw new gutil.PluginError("webpack", err);
    }
    gutil.log("[webpack]", stats.toString({}));
  });
});
