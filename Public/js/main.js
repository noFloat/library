(function(){//轮播
    var b = document.getElementsByTagName("ul")[2],
        a = new Carousel(740,5000),
        prv = document.getElementById("prv"),
        nex = document.getElementById("nex");
    a.pushElement(b);
    a.start();
    eventHandler.addEvent(prv,"click",function() {
        if (a.count - 1 < 0) {
            a.click(a.elementArray.length - 1);
        } else {
            a.click(a.count - 1);
        }
        return false;
    });
    eventHandler.addEvent(nex,"click",function() {
        if (a.count + 1 > a.elementArray.length - 1) {
            a.click(0);
        } else {
            a.click(a.count + 1);
        }
			return false;
		});
    })();
    (function(){//开学倒计时
    	var dayH = document.getElementById("days"),
    	    houtH = document.getElementById("hour"),
    	    branchH = document.getElementById("branch"),
    	    secondsH = document.getElementById("seconds");
    	function timer() {
    		var now = new Date().getTime(),
	    		start = new Date("2015/09/10").getTime(),
	    		cha = start - now,
	    		day = Math.floor(cha/86400000),
	    		hour = Math.floor(cha % 86400000 / 3600000),
	    		branch = Math.floor(cha % 86400000 % 3600000 / 60000),
	    		seconds = Math.floor(cha % 86400000 % 3600000 % 60000 / 1000);
            if (day < 10) {
                day = "0" + day;
            }
            if (hour < 10) {
                hour = "0" + hour;
            }
            if(branch < 10) {
                branch = "0" + branch;
            }
            if(seconds < 10) {
                seconds = "0" + seconds;
            }
            dayH.children[0].style.backgroundPosition = '-12px ' + (-2 + (day.toString().substr(0,1)) * -50) + 'px';
            dayH.children[1].style.backgroundPosition = '-12px ' + (-2 + (day.toString().substr(1,2)) * -50) + 'px';
            houtH.children[0].style.backgroundPosition = '-12px ' + (-2 + (hour.toString().substr(0,1)) * -50) + 'px';
            houtH.children[1].style.backgroundPosition = '-12px ' + (-2 + (hour.toString().substr(1,2)) * -50) + 'px';
            branchH.children[0].style.backgroundPosition = '-12px ' +(-2 + (branch.toString().substr(0,1)) * -50) + 'px';
            branchH.children[1].style.backgroundPosition = '-12px ' + (-2 + (branch.toString().substr(1,2)) * -50) + 'px';
            secondsH.children[0].style.backgroundPosition = '-12px ' + (-2 + (seconds.toString().substr(0,1)) * -50) + 'px';
            secondsH.children[1].style.backgroundPosition = '-12px ' + (-2 + (seconds.toString().substr(1,2)) * -50) + 'px';
    	}
    	timer();
    	setInterval(timer,1000);
    })();
    (function(){//地标
        var map = document.getElementById("map"),
            div = document.getElementById("showInf"),
            left,
            top,
            arr = [];
        for(var i = 1;i < 10;i++){
            arr.push(map.children[i]);
        }
        eventHandler.live(map,arr,"mouseover",function(e) {
            left = parseFloat(getStyle(this,"left")) + 40;
            top = parseFloat(getStyle(this,"top")) - 20;
            animation.stop(div);
            animation.move(div,{"left":left,"top":top},300);
            switch(this.id) {
                case "newGate":div.children[1].innerHTML = "新校门";
                    break;
                case "oldGate":div.children[1].innerHTML = "老校门";
                    break;
                case "sanjiao":div.children[1].innerHTML = "第三教学楼";
                    break;
                case "yifu":div.children[1].innerHTML = "逸夫楼";
                    break;
                case "oldLia":div.children[1].innerHTML = "老图书馆";
                    break;
                case "fengyu":div.children[1].innerHTML = "风雨操场";
                    break;
                case "taiji":div.children[1].innerHTML = "太极操场";
                    break;
                case "laocao":div.children[1].innerHTML = "老操场";
                    break;
                case "zidonghua":div.children[1].innerHTML = "数字图书馆";
                    break;
            }
        });
        eventHandler.live(map,arr,"click",function() {
            return false;
        })
    })();

    (function(){//其他动画
        var d1 = document.getElementById("d01"),
            d2 = document.getElementById("d2"),
            d3 = document.getElementById("d3"),
            d4 = document.getElementById("d4"),
            d5 = document.getElementById("d5"),
            d6 = document.getElementById("d6"),
            shaoma = document.getElementById("shaoma");
        function move(target){
            animation.move(target,{"left":-10},100,function() {
                animation.move(target,{"left":14},100,function() {
                     animation.move(target,{"left":0},100)
                });
            });
        }
        eventHandler.addEvent(d1,"click",function() {
            window.location.href = d1.href;
        })
        eventHandler.addEvent(d1,"mouseover",function(e) {
             move(this);
        });
        eventHandler.addEvent(d2,"mouseover",function(e) {
             move(this);
        });
        eventHandler.addEvent(d3,"mouseover",function(e) {
             move(this);
        });
        eventHandler.addEvent(d4,"mouseover",function(e) {
             move(this);
        });
        eventHandler.addEvent(d5,"mouseover",function(e) {
             move(this);
        });
        eventHandler.addEvent(d6,"mouseover",function(e) {
             move(this);
        });
        eventHandler.addEvent(d1,"mouseout",function(e) {
             animation.stop(this);
             this.style.left = 0;
        });
        eventHandler.addEvent(d2,"mouseout",function(e) {
             animation.stop(this);
             this.style.left = 0;
        });
        eventHandler.addEvent(d3,"mouseout",function(e) {
             animation.stop(this);
             this.style.left = 0;
        });
        eventHandler.addEvent(d4,"mouseout",function(e) {
             animation.stop(this);
             this.style.left = 0;
        });
        eventHandler.addEvent(d5,"mouseout",function(e) {
             animation.stop(this);
             this.style.left = 0;
        });
        eventHandler.addEvent(d6,"mouseout",function(e) {
             animation.stop(this);
             this.style.left = 0;
        });
        eventHandler.addEvent(shaoma,"mouseover",function() {
            animation.move(shaoma,{"top":430},100,function() {
                animation.move(shaoma,{"top":406},100,function() {
                    animation.move(shaoma,{"top":420},50);
                })
            })
        })
    })();
var banner = document.getElementById("banner");
eventHandler.addEvent(banner,"click",function(){
    alert("本活动将在9月8号开放,敬请期待~~");
})
