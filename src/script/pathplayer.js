/**
 * <p>自动播放路径类</p>
 *
 * @author ray
 * @date 2016.1.31
 */

module.exports = (function($, hr, mapHelper) {
  'use strict';
  
  const DEF_OPT = {
    id: 'pathplayer',
    mapHiddenDelayMS: 2000
  };

  let pathPlayer = function(opt, data) {
    this._o = $.extend({}, DEF_OPT, opt);
    this._d = data;
    this._sInx = -1; // 默认读数据级别
    this._mapShow = false;
    this._initDOM();
    this._bindEvts();
  };

  pathPlayer.prototype._initDOM = function() {
    var html = `
        <div id="${this._o.id}-map" style="display:none;" class="full-height"></div>

        <div id="${this._o.id}-letter">
          <div class="panel panel-info">
            <div class="panel-heading">
              <h2 class="panel-title">title</h2>
            </div>

            <div class="panel-body"></div>
            <div class="panel-footer">Try swipe left or right.</div>
          </div>

        </div>
    `;
    $(this._o.target).html(html);
  };

  pathPlayer.prototype._bindEvts = function() {
    // set up hammer
    var hammerManager = new hr.Manager($(this._o.target)[0], {
      recognizers: [
        [hr.Swipe, [{threadhold: 200}]]
      ]
    });

    hammerManager.on('swipeleft', function() {
      // move back 
      if (!this._hasPrev()) {
        return;
      }

      // show letter
      this._render(this._prev());
      
    }.bind(this));

    hammerManager.on('swiperight', function() {
      if (!this._hasNext()) {
        return;
      }

      this._render(this._next());

    }.bind(this));

  };
  
  pathPlayer.prototype._hasPrev = function() {
    return 0 < this._sInx;
  };
  
  pathPlayer.prototype._hasNext = function() {
    console.log('a');
    return (this._d.length - 1) > this._sInx;
  };
  
  pathPlayer.prototype._next = function() {
    let ele = this._d[++this._sInx];
    ele._inx = this._sInx; 
    return ele;
  };
  
  pathPlayer.prototype._prev = function() {
    let ele = this._d[--this._sInx];
    ele._inx = this._sInx; 
    return ele;
  };
  
  pathPlayer.prototype._renderLetter = function(title, content) {
    let box = $('#' + this._o.id + '-letter');
    box.find('.panel-title').html(title);
    box.find('.panel-body').html(content);
  };

  pathPlayer.prototype._toggleMap = function() {
    let letter = $('#' + this._o.id + '-letter'),
        map = $('#' + this._o.id + '-map');
    if (this._mapShow) {
      this._mapShow = false;
      map.css('display', 'none');
      letter.css('display', 'block');

    } else {
      this._mapShow = true;
      letter.css('display', 'none');
      map.css('display', 'block');

    }
  };

  pathPlayer.prototype._formatTitle = function(page) {
    if (0 === this._sInx) {
      return "写在前面";

    } else if ((this._d.length - 1) === this._sInx) {
      return "写给未来";

    }

    let i = page._inx;
    let numText = 10 > i ? ('00' + i) : (100 > i ? ('0' + i) : i);
    return `第 ${numText} 朵玫瑰(于${page.date})`;
  };

  pathPlayer.prototype._render = function(page) {
    let title = this._formatTitle(page);
    // center map
    if (!this._mt) {
      this._mt = mapHelper('baidu', {
        key: '1qTGjfZzs2IgmZRtT12lZzVY',
        container: this._o.id + '-map'
      });
    }

    if (page.loc) {
      var loc = page.loc.split(',');
      this._toggleMap();
      this._mt.drawPoint(parseFloat(loc[1]), parseFloat(loc[0]), page._inx); 
      setTimeout(function() {
        this._toggleMap();
        this._renderLetter(title, page.word);
      }.bind(this), this._o.mapHiddenDelayMS);

    } else {
      this._renderLetter(title, page.word);

    }

  };

  pathPlayer.prototype.play = function() {
    this._render(this._next());
  };

  return pathPlayer;
}(
  require('jquery'),
  require('hammerjs'),
  require('script/maphelper')
));

