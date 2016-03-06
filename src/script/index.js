require('css/bootstrap.css');
var mapHelper = require('script/maphelper');
var $ = require('jquery');
require(['data.json'], function(pathData) {
  var locData = [], locMap = {}, letterNum = 0;
  for (var i = 0; i < pathData.length; i++) {
    var data = pathData[i];
    if (!data.loc) {
      continue;
    }

    // count letter num 
    letterNum ++;

    // count loc num
    locMap[data.loc] = true;

    // format location
    var locArr = data.loc.split(',');
    if (2 > locArr.length) {
      continue;
    }

    locData.push($.extend({
      lat: locArr[1],
      lng: locArr[0]
    }, data));

  }

  // count loc num
  var locCnt = 0;
  /* jshint ignore:start */
  for (var j in locMap) {
    locCnt ++;
  }
  /* jshint ignore:end */

  // calculate time range
  var startDateArr = pathData[0].date.split('.'),
      endDateArr = pathData[pathData.length-1].date.split('.');
  var timeRangeMS = new Date(startDateArr[0], startDateArr[1], startDateArr[2]).getTime() - 
                      new Date(endDateArr[0], endDateArr[1], endDateArr[2]).getTime();

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
    // render num
    $('#letterNum').html(letterNum);
    $('#locNum').html(locCnt);
    $('#timeRange').html(timeRangeMS/1000/60/60 + '小时');

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
