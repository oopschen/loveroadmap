var webpack = require('webpack');
var path = require('path');
var _ = require('underscore');

var getDir = function() {
  var args = Array.prototype.slice.call(arguments);
  return path.join.apply(path, [__dirname].concat(args));
};

var isProd = "production" === process.env["NODE_ENV"];

var cfg = {
  // webpack options 
  context: getDir('./src'),

  entry: {
    index: ["./script/index_jsx.js"]
  },

  output: {
    path: getDir('./build'),
    filename: "./e/[chunkhash].js",
    chunkFilename: './c/[chunkhash].js'
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css"},
      { test: /.jsx\.js/, loader: "jsx" },
    ],

    postLoaders: [
      {
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        loader: "jshint-loader"
      }
    ]
  },

  jshint: _.defaults(
    {
      browser: true
    },
    require(path.join(__dirname, "jshintrc.js"))),

    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(true)
    ],

    resolve: {
      root: [
        getDir("src"),
      ],
      alias: {
      },
      extensions: ["", ".js", ".scss"]
    },

    progress: false, // Don't show progress 
    // Defaults to true 

    failOnError: true // don't report error to grunt if webpack find errors 

};

if (!isProd) {
  cfg.watch = true;
  cfg.keepalive = true;
  cfg.devtool = 'eval';
  cfg.jshint.devel = true;

} else {
  var plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "\"" + process.env["NODE_ENV"] + "\""
      }
    }),

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

module.exports = cfg;
