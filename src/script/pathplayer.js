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
    mapHiddenDelayMS: 1500
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
    let letterEle = $('#' + this._o.id + '-letter');

    // set up hammer
    var hammerManager = new hr.Manager(letterEle[0], {
      recognizers: [
        [hr.Swipe, [{threadhold: 200}]]
      ]
    });

    hammerManager.on('swipeleft', function() {
      // move back 
      if (!this._hasPrev()) {
        if (0 !== this._sInx) {
          return;
        }

        this._sInx--;
        this._render('写在前面', this._d.intro);

        return;
      }

      var page = this._prev();
      // show letter
      this._render(this._formatTitle(page), page);
      
    }.bind(this));

    hammerManager.on('swiperight', function() {
      if (!this._hasNext()) {
        if (this._d.length !== this._sInx) {
          return;
        }

        this._sInx++;
        this._render('写在最后', this._d.last);
        return;
      }

      var page = this._next();
      this._render(this._formatTitle(page), page);

    }.bind(this));

  };
  
  pathPlayer.prototype._hasPrev = function() {
    return 0 < this._sInx;
  };
  
  pathPlayer.prototype._hasNext = function() {
    return this._d.road.length > this._sInx;
  };
  
  pathPlayer.prototype._next = function() {
    let ele = this._d.road[++this._sInx];
    ele._inx = this._sInx + 1; 
    return ele;
  };
  
  pathPlayer.prototype._prev = function() {
    let ele = this._d.road[this._sInx];
    ele._inx = --this._sInx; 
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
      this._mapShow = false;
      letter.css('display', 'none');
      map.css('display', 'block');
    }
  };

  pathPlayer.prototype._formatTitle = function(page) {
    let i = page._inx;
    let numText = 10 > i ? ('00' + i) : (100 > i ? ('0' + i) : i);
    return `第 ${numText} 朵玫瑰(于${page.date})`;
  };

  pathPlayer.prototype._render = function(title, page) {
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
      this._mt.drawPoint(parseFloat(loc[0]), parseFloat(loc[1]), page._inx); 
      setTimeout(function() {
        this._renderLetter(title, page.word);
      }.bind(this), this._o.mapHiddenDelayMS);

    } else {
      this._renderLetter(title, page);

    }

  };

  pathPlayer.prototype.play = function() {
    this._render('写在前面', this._d.intro);
  };

  return pathPlayer;
}(
  require('jquery'),
  require('hammerjs'),
  require('script/maphelper')
));

