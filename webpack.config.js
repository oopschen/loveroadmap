'use strict';

var webpack = require('webpack');
var path = require('path');
var _ = require('underscore');

var getDir = function() {
  var args = Array.prototype.slice.call(arguments);
  return path.join.apply(path, [__dirname].concat(args));
};


// env judgment
var isProd = 'production' === process.env.NODE_ENV;
var jsHintOpt = _.defaults(
  {}, require(getDir("./jshintrc.js"))
);

if (isProd) {
  jsHintOpt.devel = false;
}

// configuration
var cfg = {
  // webpack options 
  context: getDir('./src'),

  entry: {
    index: 'script/index.js'
  },

  output: {
    path: getDir('./build'),
    filename: "./e/[name].js",
    chunkFilename: './c/[chunkhash].js',
    publicPath: '/'
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css"},
      { test: /\.jsx\.js/, loader: "jsx" },
      { test: /\.json/, loader: "json-loader" },

      // bootstrap
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ],

    postLoaders: [
      {
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        loader: "jshint-loader"
      }
    ]
  },

  jshint: jsHintOpt,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "\"" + process.env["NODE_ENV"] + "\""
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ],

  resolve: {
    root: [
      getDir("./src"),
      getDir("./node_modules/bootstrap/dist")
    ],
    extensions: ["", ".js", ".scss"]
  },

  recordsPath: getDir('./recordPath.json'),
  progress: false, // Don't show progress 
  failOnError: true, // don't report error to grunt if webpack find errors 
  devtool: 'eval'
};

// minify
if (isProd) {
  // concat plugins
  var plugins = [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      },
      output: {
        comments:false,
        space_colon: false
      }
    })
  ];

  cfg.plugins = cfg.plugins.concat(plugins);
}

// export
module.exports = cfg;
