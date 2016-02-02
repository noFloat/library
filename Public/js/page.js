 (function (){
     var opage_ul = document.getElementById("page_ul"),
         opage = document.querySelectorAll(".page_mid"),
         obtn = opage_ul.getElementsByTagName("a");
     for(var i = 0; i<opage.length;i++){
         var index = 1;
         obtn[i].onclick = (function (i){
             return function(){
                 opage[index].style.display = "none";
                 opage[i].style.display = "block";
                 obtn[index].removeAttribute("class","page_active");
                 obtn[i].setAttribute("class","page_active");
                 index = i;
             }
         })(i);
     }
 })();
    (function (){
        var anopage_ul = document.getElementById("an_page_ul"),
            oanpage = document.querySelectorAll(".an_page_mid"),
            oanbtn = anopage_ul.getElementsByTagName("a");
            for(var i = 0; i<oanpage.length;i++){
                var oindex = 4;
                oanbtn[i].onclick = (function (i){       
                    return function(){    
                        oanpage[oindex].style.display = "none";
                        oanpage[i].style.display = "block";
                        oanbtn[oindex].removeAttribute("class","stu_li_active");
                        oanbtn[i].setAttribute("class","stu_li_active");
                        oindex = i;                       
                    }
                })(i);
            }
    })();
    (function (){
        var opeople = document.getElementById("people"),
            turn_people = opeople.querySelectorAll(".page_num"),
            opeople_btn = document.getElementById("people_btn"),
            obtn_peo = opeople_btn.getElementsByTagName("a"),
            obus = document.getElementById("bus"),
            turn_bus = obus.querySelectorAll(".page_mid_mid_ul"),
            obus_btn = document.getElementById("bus_btn"),
            obtn_bus = obus_btn.getElementsByTagName("a"),
            oroom = document.getElementById("room"),
            turn_room = oroom.querySelectorAll(".page_mid_mid_ul"),
            oroom_btn = document.getElementById("room_btn"),
            obtn_room = oroom_btn.getElementsByTagName("a"),
            oeat = document.getElementById("eat"),
            turn_eat = oeat.querySelectorAll(".page_mid_mid_ul"),
            oeat_btn = document.getElementById("eat_btn"),
            obtn_eat = oeat_btn.getElementsByTagName("a"),
            opart_1 = document.getElementById("part_1"),
            oturn_1 = opart_1.querySelectorAll(".page_mid_mid_ul"),
            opart_btn_1 = document.getElementById("part_btn_1"),
            obtn_1 = opart_btn_1.getElementsByTagName("a"),
            opart_2 = document.getElementById("part_2"),
            oturn_2 = opart_2.querySelectorAll(".page_mid_mid_ul"),
            opart_btn_2 = document.getElementById("part_btn_2"),
            opart_spe_btn_2 = opart_btn_2.querySelectorAll(".page_bottom_li"),
            obtn_2 = opart_btn_2.getElementsByTagName("a"),
            pre = opart_btn_2.querySelectorAll(".page_bottom_li_special")[0],
            nex = opart_btn_2.querySelectorAll(".page_bottom_li_special")[1],
            index = 0,
            opart_3 = document.getElementById("part_3"),
            oturn_3 = opart_3.querySelectorAll(".page_mid_mid_ul"),
            opart_btn_3 = document.getElementById("part_btn_3"),
            obtn_3 = opart_btn_3.getElementsByTagName("a"),
            opart_4 = document.getElementById("part_4"),
            oturn_4 = opart_4.querySelectorAll(".page_mid_mid_ul"),
            opart_btn_4 = document.getElementById("part_btn_4"),
            obtn_4 = opart_btn_4.getElementsByTagName("a"),
            opart_5 = document.getElementById("part_5"),
            oturn_5 = opart_5.querySelectorAll(".page_mid_mid_ul"),
            opart_btn_5 = document.getElementById("part_btn_5"),
            obtn_5 = opart_btn_5.getElementsByTagName("a");
        function turn(a,b,x,y){
            a.style.display = "block";
            b.style.display = "none";
            x.setAttribute("class","page_bottom_spe");
            y.removeAttribute("class","page_bottom_spe");
        }
        obtn_peo[0].onclick = function (){
            turn(turn_people[0],turn_people[1],obtn_peo[1],obtn_peo[2]);
        }
        obtn_peo[1].onclick = function (){
            turn(turn_people[0],turn_people[1],obtn_peo[1],obtn_peo[2]);
        }
        obtn_peo[2].onclick = function (){
            turn(turn_people[1],turn_people[0],obtn_peo[2],obtn_peo[1]);
        }
        obtn_peo[3].onclick = function (){
            turn(turn_people[1],turn_people[0],obtn_peo[2],obtn_peo[1]);
        }
        obtn_bus[0].onclick = function (){
            turn(turn_bus[0],turn_bus[1],obtn_bus[1],obtn_bus[2]);
        }
        obtn_bus[1].onclick = function (){
            turn(turn_bus[0],turn_bus[1],obtn_bus[1],obtn_bus[2]);
        }
        obtn_bus[2].onclick = function (){
            turn(turn_bus[1],turn_bus[0],obtn_bus[2],obtn_bus[1]);
        }
        obtn_bus[3].onclick = function (){
            turn(turn_bus[1],turn_bus[0],obtn_bus[2],obtn_bus[1]);
        }
        obtn_room[0].onclick = function (){
            turn(turn_room[0],turn_room[1],obtn_room[1],obtn_room[2]);
        }
        obtn_room[1].onclick = function (){
            turn(turn_room[0],turn_room[1],obtn_room[1],obtn_room[2]);
        }
        obtn_room[2].onclick = function (){
            turn(turn_room[1],turn_room[0],obtn_room[2],obtn_room[1]);
        }
        obtn_room[3].onclick = function (){
            turn(turn_room[1],turn_room[0],obtn_room[2],obtn_room[1]);
        }
        obtn_eat[0].onclick = function (){
            turn(turn_eat[0],turn_eat[1],obtn_eat[1],obtn_eat[2]);
        }
        obtn_eat[1].onclick = function (){
            turn(turn_eat[0],turn_eat[1],obtn_eat[1],obtn_eat[2]);
        }
        obtn_eat[2].onclick = function (){
            turn(turn_eat[1],turn_eat[0],obtn_eat[2],obtn_eat[1]);
        }
        obtn_eat[3].onclick = function (){
            turn(turn_eat[1],turn_eat[0],obtn_eat[2],obtn_eat[1]);
        }
        obtn_1[0].onclick = function (){
            turn(oturn_1[0],oturn_1[1],obtn_1[1],obtn_1[2]);
        }
        obtn_1[1].onclick = function (){
            turn(oturn_1[0],oturn_1[1],obtn_1[1],obtn_1[2]);
        }
        obtn_1[2].onclick = function (){
            turn(oturn_1[1],oturn_1[0],obtn_1[2],obtn_1[1]);
        }
        obtn_1[3].onclick = function (){
            turn(oturn_1[1],oturn_1[0],obtn_1[2],obtn_1[1]);
        }
        obtn_3[0].onclick = function (){
            turn(oturn_3[0],oturn_3[1],obtn_3[1],obtn_3[2]);
        }
        obtn_3[1].onclick = function (){
            turn(oturn_3[0],oturn_3[1],obtn_3[1],obtn_3[2]);
        }
        obtn_3[2].onclick = function (){
            turn(oturn_3[1],oturn_3[0],obtn_3[2],obtn_3[1]);
        }
        obtn_3[3].onclick = function (){
            turn(oturn_3[1],oturn_3[0],obtn_3[2],obtn_3[1]);
        }
        obtn_4[0].onclick = function (){
            turn(oturn_4[0],oturn_4[1],obtn_4[1],obtn_4[2]);
        }
        obtn_4[1].onclick = function (){
            turn(oturn_4[0],oturn_4[1],obtn_4[1],obtn_4[2]);
        }
        obtn_4[2].onclick = function (){
            turn(oturn_4[1],oturn_4[0],obtn_4[2],obtn_3[1]);
        }
        obtn_4[3].onclick = function (){
            turn(oturn_4[1],oturn_4[0],obtn_4[2],obtn_4[1]);
        }
        obtn_5[0].onclick = function (){
            turn(oturn_5[0],oturn_5[1],obtn_5[1],obtn_5[2]);
        }
        obtn_5[1].onclick = function (){
            turn(oturn_5[0],oturn_5[1],obtn_5[1],obtn_5[2]);
        }
        obtn_5[2].onclick = function (){
            turn(oturn_5[1],oturn_5[0],obtn_5[2],obtn_5[1]);
        }
        obtn_5[3].onclick = function (){
            turn(oturn_5[1],oturn_5[0],obtn_5[2],obtn_5[1]);
        }
        function oturn(page){
            if( page < 0 ) {
                page = 0;
            }
            if(page > 3){
                page = 3;
                index = 2;
            }
            oturn_2[index].style.display = "none";
            oturn_2[page].style.display = "block";
            obtn_2[index+1].removeAttribute("class","page_bottom_spe");
            obtn_2[page+1].setAttribute("class","page_bottom_spe");
            index = page;
        }
        pre.onclick = function (){
                oturn(index-1)
        };
        nex.onclick = function (){
            oturn(index+1)
        };
        opart_spe_btn_2[0].onclick = function (){
            oturn(0)
        };
        opart_spe_btn_2[1].onclick = function (){
            oturn(1)
        };
        opart_spe_btn_2[2].onclick = function (){
            oturn(2)
        };
        opart_spe_btn_2[3].onclick = function (){
            oturn(3)
        };

    })();
    var _2D = document.getElementById("D2map");
    var _3D = document.getElementById("D3map");
    var btu_2D = document.getElementById("btu_2D");
    var btu_3D = document.getElementById("btu_3D");

    btu_2D.onclick = function(){
        _2D.style.display = "block";
        btu_2D.setAttribute("class", "active");
        _3D.style.display = "none";
        btu_3D.removeAttribute("class","active");

    }
    btu_3D.onclick = function(){
        _3D.style.display = "block";
        btu_3D.setAttribute("class", "active");
        _2D.style.display = "none";
        btu_2D.removeAttribute("class","active");
    }

