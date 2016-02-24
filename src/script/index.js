require('css/bootstrap.css');
require(['jquery', 'script/maphelper', 'data.json'], function($, mapHelper, pathData) {
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

    locData.push({
      lat: locArr[1],
      lng: locArr[0]
    });
    
  }

  $('#mapContainer').ready(function() {
      var mapIns = mapHelper('baidu', {
        key: '1qTGjfZzs2IgmZRtT12lZzVY',
        container: $('#mapContainer').attr('id'),
        callback: function() {
          for (var i = 0; i <locData.length;  i++) {
            var loc = locData[i];
            mapIns.drawPoint(loc.lat, loc.lng, i);
          }

        }
      });

  });

  $('#nextBtn').ready(function() {
    $(this).click(function() {
      $('#preface').css('display', 'none');
      $('#map').css('display', 'block');
    });
  });
});
