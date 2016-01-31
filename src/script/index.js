require('css/bootstrap.css');
require(['script/pathplayer'], function (PathPlayer) {
  'use strict';
  let pp = new PathPlayer({
    target: '#container'
  }, require('../data.json'));
  pp.play();
});
