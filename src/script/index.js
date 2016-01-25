
require('css/bootstrap.css');
require(['data.json'], function (data) {
  'use strict';
  var map = new BMap.Map("main");          // 创建地图实例  
  var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
  map.centerAndZoom(point, 15);   

  var infoWindow = new BMap.InfoWindow(`
                                       <div class="height:300px">
                                        hello
                                       </div>
                                       `);  // 创建信息窗口对象    
  map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
  console.log(data);
});
