require('css/bootstrap.css');
var mapHelper = require('script/maphelper');
require(['jquery', 'data.json'], function($, pathData) {
  var locData = [];
  for (var i = 0; i < pathData.length; i++) {
    var data = pathData[i];
    if (!data.loc) {
      continue;
    }
    var locArr = data.loc.split(',');
    if (2 > locArr.length) {
      continue;
    }

    locData.push($.extend({
      lat: locArr[1],
      lng: locArr[0]
    }, data));

  }

  var aniDrawPoint = function(mapIns, locData, i) {
      if (i >= locData.length) {
        return;
      }

      var loc = locData[i];
      mapIns.drawPoint(loc.lat, loc.lng, '第' + (i+1) + '封玫瑰情书(' + loc.key + ')');
      if (0 !== i) {
        mapIns.moveTo(loc.lat, loc.lng);
      }

      setTimeout(function() {
        aniDrawPoint(mapIns, locData, ++i);
      }, 3000);
  };

  $(function() {
    $('#nextBtn').click(function() {
      $('#preface').css('display', 'none');
      $('#map').css('display', 'block');

      var mapIns = mapHelper('baidu', {
        key: '1qTGjfZzs2IgmZRtT12lZzVY',
        container: $('#mapContainer').attr('id')
      });

      aniDrawPoint(mapIns, locData, 0);
    });

  });

});
