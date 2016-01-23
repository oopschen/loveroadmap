'use strict';

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

// get webpack config
var host='127.0.0.1', port= 8080;

gulp.task('default', function() {
  var webpackCfg = require('./webpack.config.js');
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackCfg), {
      // server and middleware options
  }).listen(port, host, function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      // Server listening
      gutil.log('[webpack-dev-server]', `http://${host}:${port}/webpack-dev-server/index.html`);
  });
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
