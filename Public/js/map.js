

    (function() {//地图动画
        var map = document.getElementById("map");
        var map_face = document.getElementById("map-face")
        var small_border = document.getElementById("smallmap-border");
        var right = null;
        var bottom = null;
        var left = null;
        var top = null;
        var oldx = null;
        var oldy = null;
        var newx = null;
        var newy = null;
        var down = false;
        var over = false;
        var count = 172/3518;
        var Mx = null;
        var My = null;
        

        eventHandler.addEvent(map_face,"mouseover",function(e) {
            over = true;
        })
        eventHandler.addEvent(map_face,"mouseout",function(e) {
            over = false;
            down = false;
            if(window.getComputedStyle) {
                left = parseFloat(window.getComputedStyle(map,null)["left"]);
                top = parseFloat(window.getComputedStyle(map,null)["top"]);
                bottom = parseFloat(window.getComputedStyle(small_border,null)["bottom"]);
                right = parseFloat(window.getComputedStyle(small_border,null)["right"]);
            } else {
                left = parseFloat(map.currentStyle["left"]);
                top = parseFloat(map.currentStyle["top"]);
                bottom = parseFloat(small_border.currentStyle["bottom"]);
                right = parseFloat(small_border.currentStyle["right"]);
            }
            if (left > 0) {
                map.style.left = 0;
                small_border.style.right = 140.75 + "px";

            }
            if (top > 0) {
                map.style.top = 0;
                small_border.style.bottom = 94.6 + "px";
            }
            if (left < -2606) {
                map.style.left = -2606 + "px";
                small_border.style.right = 0;
            }
            if (top < -1765) {
                map.style.top = -1765 + "px";
                small_border.style.bottom = 0;
            }
        })
        eventHandler.addEvent(map_face,"mousedown",function(e) {
            if(window.getComputedStyle){
                left = parseFloat(window.getComputedStyle(map,null)["left"]);
                top = parseFloat(window.getComputedStyle(map,null)["top"]);
                bottom = parseFloat(window.getComputedStyle(small_border,null)["bottom"]);
                right = parseFloat(window.getComputedStyle(small_border,null)["right"]);
            } else {
                left = parseFloat(map.currentStyle["left"]);
                top = parseFloat(map.currentStyle["top"]);
                bottom = parseFloat(small_border.currentStyle["bottom"]);
                right = parseFloat(small_border.currentStyle["right"]);
            }
            down = true;
            console.log(down);
            oldx = e.screenX;
            oldy = e.screenY;
        })
        eventHandler.addEvent(map_face,"mousemove",function(e) {
         
            newx = e.screenX;
            newy = e.screenY;
            Mx = newx - oldx;
            My = newy - oldy;
            if (down == true && over == true) {
                map.style.left = left + Mx + "px";
                map.style.top = top + My + "px";
                small_border.style.right = right  + Mx*count + "px";
                small_border.style.bottom = bottom + My*count + "px";
            } 
        })
        eventHandler.addEvent(map_face,"mouseup",function(e) {
         
            down = false;
            oldx = e.screenX;
            oldy = e.screenY;

            if(window.getComputedStyle){
                left = parseFloat(window.getComputedStyle(map,null)["left"]);
                top = parseFloat(window.getComputedStyle(map,null)["top"]);
                bottom = parseFloat(window.getComputedStyle(small_border,null)["bottom"]);
                right = parseFloat(window.getComputedStyle(small_border,null)["right"]);
            } else {
                left = parseFloat(map.currentStyle["left"]);
                top = parseFloat(map.currentStyle["top"]);
                bottom = parseFloat(small_border.currentStyle["bottom"]);
                right = parseFloat(small_border.currentStyle["right"]);
            }
            if (left > 0 ) {
                map.style.left = 0;
                small_border.style.right = 140.75 + "px";

            }
            if (top > 0) {
                map.style.top = 0;
                small_border.style.bottom = 94.6 + "px";
            }
            if (left < -2606 ) {
                map.style.left = -2606 + "px";
                small_border.style.right = 0;
            }
            if (top < -1765) {
                map.style.top = -1765 + "px";
                small_border.style.bottom = 0;
            }
        })  


         eventHandler.addEvent(small_border,"mouseover",function(e) {
             over = true;
         })
         eventHandler.addEvent(small_border,"mouseout",function(e) {
             over = false;
             down = false;
             if(window.getComputedStyle){
                 left = parseFloat(window.getComputedStyle(map,null)["left"]);
                 top = parseFloat(window.getComputedStyle(map,null)["top"]);
                 bottom = parseFloat(window.getComputedStyle(small_border,null)["bottom"]);
                 right = parseFloat(window.getComputedStyle(small_border,null)["right"]);
             }else{
                 left = parseFloat(map.currentStyle["left"]);
                 top = parseFloat(map.currentStyle["top"]);
                 bottom = parseFloat(small_border.currentStyle["bottom"]);
                 right = parseFloat(small_border.currentStyle["right"]);
             }
             if (left > 0) {
                 map.style.left = 0;
                 small_border.style.right = 140.75 + "px";

             }
             if (top > 0) {
                 map.style.top = 0;
                 small_border.style.bottom = 94.6 + "px";
             }
             if (left < -2606) {
                 map.style.left = -2606 + "px";
                 small_border.style.right = 0;
             }
             if (top < -1765) {
                 map.style.top = -1765 + "px";
                 small_border.style.bottom = 0;
             }
         })
        eventHandler.addEvent(small_border,"mousedown",function(e) {
            if(window.getComputedStyle) {
                left = parseFloat(window.getComputedStyle(map,null)["left"]);
                top = parseFloat(window.getComputedStyle(map,null)["top"]);
                bottom = parseFloat(window.getComputedStyle(small_border,null)["bottom"]);
                right = parseFloat(window.getComputedStyle(small_border,null)["right"]);
            } else {
                left = parseFloat(map.currentStyle["left"]);
                top = parseFloat(map.currentStyle["top"]);
                bottom = parseFloat(small_border.currentStyle["bottom"]);
                right = parseFloat(small_border.currentStyle["right"]);
            }
            down = true;
            oldx = e.screenX;
            oldy = e.screenY;
        })
        eventHandler.addEvent(small_border,"mousemove",function(e) {
            newx = e.screenX;
            newy = e.screenY;
            Mx = newx - oldx;
            My = newy - oldy;
            if (down == true && over == true) {
                map.style.left = left - Mx/count + "px";
                map.style.top = top - My/count + "px";
                small_border.style.right = right  - Mx + "px";
                small_border.style.bottom = bottom - My+ "px";
            }
        })
        eventHandler.addEvent(small_border,"mouseup",function(e) {
            down = false;
            oldx = e.screenX;
            oldy = e.screenY;

            if(window.getComputedStyle) {
                left = parseFloat(window.getComputedStyle(map,null)["left"]);
                top = parseFloat(window.getComputedStyle(map,null)["top"]);
                bottom = parseFloat(window.getComputedStyle(small_border,null)["bottom"]);
                right = parseFloat(window.getComputedStyle(small_border,null)["right"]);
            } else {
                left = parseFloat(map.currentStyle["left"]);
                top = parseFloat(map.currentStyle["top"]);
                bottom = parseFloat(small_border.currentStyle["bottom"]);
                right = parseFloat(small_border.currentStyle["right"]);
            }
            if (left > 0) {
                map.style.left = 0;
                small_border.style.right = 140.75 + "px";

            }
            if (top > 0) {
                map.style.top = 0;
                small_border.style.bottom = 94.6 + "px";
            }
            if (left < -2606) {
                map.style.left = -2606 + "px";
                small_border.style.right = 0;
            }
            if (top < -1765) {
                map.style.top = -1765 + "px";
                small_border.style.bottom = 0;
            }
        })  
    })();

    //街景
    var _2D = document.getElementById("D2map");
    var _3D = document.getElementById("D3map");
    var btu_2D = document.getElementById("btu_2D");
    var btu_3D = document.getElementById("btu_3D");

    btu_2D.onclick = function() {
        _2D.style.display = "block";
        btu_2D.setAttribute("class", "active");
        _3D.style.display = "none";
        btu_3D.removeAttribute("class","active");
    }
    btu_3D.onclick = function() {
        _3D.style.display = "block";
        btu_3D.setAttribute("class", "active");
        _2D.style.display = "none";
        btu_2D.removeAttribute("class","active");
        init();
    }
    var init = function() {
    pano_container=document.getElementById("D3map");  //街景容器
    pano = new qq.maps.Panorama(pano_container, {
        pano: '10081147130320163359700',    //场景ID
        pov:{   //视角
                heading:1,  //偏航角
                pitch:0     //俯仰角
            },
        zoom:1      //缩放
    })
}


