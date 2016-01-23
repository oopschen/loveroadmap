require('css/bootstrap.css');
require([], function () {
  var map = new BMap.Map("main");          // 创建地图实例  
  var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
  map.centerAndZoom(point, 15);   
});
