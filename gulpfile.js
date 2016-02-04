
var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');

// get webpack config
var host='127.0.0.1', port= 8080;

gulp.task('default', function() {
    'use strict';
   //  gutil.log("run command for development: webpack-dev-server --watch --hot --content-base src/ ");
    var webpackCfg = require('./webpack.config.js');
    new WebpackDevServer(webpack(webpackCfg), {
        // server and middleware options
        hot: true,
        contentBase: path.resolve(path.dirname(__filename), './src')
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", `http://${host}:${port}/webpack-dev-server/index.html`);
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
