
var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');
var ghPages = require('gulp-gh-pages');
var del = require('del');

// get webpack config
var host='0.0.0.0', port= 8080;

gulp.task('default', function() {
   gutil.log("run command for development: webpack-dev-server --watch --hot --content-base src/ ");
});

gulp.task('prod', ['clean', 'prod:html'], function() {
  // set env
  process.env.NODE_ENV = 'production';
  var webpackCfg = require('./webpack.config.js');

  // run webpack
  webpack(webpackCfg, function(err, stats) {
    if(err) { throw new gutil.PluginError("webpack", err);
    }
    gutil.log("[webpack]", stats.toString({}));
  });
});

gulp.task('prod:html', function() {
   return gulp.src('src/html/**/*', {base: 'src'})
          .pipe(gulp.dest('build'));
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('clean', function() {
  return del([
    './build/**/*'
  ]);
});
