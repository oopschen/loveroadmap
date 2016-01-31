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
      .appendTo(document);

    this._m = new BMap.Map(this._opt.container);
  };

  BaiduHelper.prototype.drawPoint = function(lat, lng, label) {
    let m = this._m;
    let allOverlay = m.getOverlays(),
        inMapOverlay;
    if (allOverlay) {
      for (let i = 0; i < allOverlay.length; i++) {
        let overlay = allOverlay[i];
        if (overlay['getPosition']) {
          // cancel animation
          if (i === (allOverlay.length - 1)) {
            overlay.setAnimation(null);
          }

          let pos = overlay.getPosition();
          if (pos.lng === lng && pos.lat === lat) {
            inMapOverlay = overlay;
            break;
          }
        }
      }
    }

    if (!inMapOverlay) {
      inMapOverlay = new BMap.Marker(new BMap.Point(lng, lat));  
      m.addOverlay(inMapOverlay);
      if (label) {
        inMapOverlay.setLabel(label);
      }
    }

    inMapOverlay.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    map.centerAndZoom(point, 18);
  };

  let helper = function(typ, option) {
    if ('baidu' === typ) {
      return new BaiduHelper(option);
    }

    return;
  };
  
  return helper;
}(require('jquery')));;
