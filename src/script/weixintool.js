/**
 * <p>微信相关工具类</p>
 *
 * @author ray
 * @date 2016.5.10
 */

var tool = {
  isOpenInWeixin : function is_weixn(){
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
      } else {
        return false;
      }
    }
};

module.exports = tool;
