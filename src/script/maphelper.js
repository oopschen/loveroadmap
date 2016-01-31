/**
 * <p>map helpr</p>
 *
 * @author ray
 * @date 2016.1.31
 */
module.exports = (function($) {
  'use strict';
  const BAIDU_DEF_OPT = {
    container: 'main'
  };
  
  let BaiduHelper = function(option) {
    this._opt = $.extend({}, BAIDU_DEF_OPT, option);
    $('<script type="text/javascript"></script>')
      .attr('src', `http://api.map.baidu.com/api?v=2.0&ak=${this._opt.key}`)
      .appendTo('body');

    this._m = new BMap.Map(this._opt.container);
    this._mks = [];
  };

  BaiduHelper.prototype.drawPoint = function(lat, lng, label) {
    let m = this._m;
    let allOverlay = this._mks,
        inMapOverlay,
        point;
    for (let i = 0; i < allOverlay.length; i++) {
      let overlay = allOverlay[i];
      // cancel animation
      if (i === (allOverlay.length - 1)) {
        overlay.setAnimation(null);
      }

      point = overlay.getPosition();
      if (point.lng === lng && point.lat === lat) {
        inMapOverlay = overlay;
        break;
      }
    }

    if (!inMapOverlay) {
      point = new BMap.Point(lng, lat);
      inMapOverlay = new BMap.Marker(point);  
      m.addOverlay(inMapOverlay);
      if (label) {
        inMapOverlay.setLabel(label);
      }
      allOverlay.push(inMapOverlay);
    }

    inMapOverlay.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    m.centerAndZoom(point, 18);
  };

  let helper = function(typ, option) {
    if ('baidu' === typ) {
      return new BaiduHelper(option);
    }

    return;
  };
  
  return helper;
}(require('jquery')));
