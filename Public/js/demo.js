function Paging(content,footer,maxONum, flag){
    this.maxONum = maxONum;//一页中最多多少条评论
    this.content = content.children;//评论的集合
    if (flag && this.content[this.content.length - 1].className == 'page_bottom') {
        var arr = [];
        for(var s = 0; s < this.content.length - 1; s++) {
            arr.push(content.children[s]);
        }
        this.content = arr;
    }
    this.num = Math.ceil(this.content.length/maxONum);//总共分多少页
    this.footer = footer.children;//按钮的集合
    this.focusPage = 1;//当前处于哪一页
    this.hidden();
}
Paging.prototype = {
    constructor:Paging,
    getPageNum:function(target){//获取并且计算总共有多少页
        var xhr = ajaxObject.createXhr(),
            maxONum = this.maxONum,
            allNum;
        ajaxObject.GET(xhr,target,function(){
            allNum = xhr.responseText;
            this.num = Math.ceil(allNum/maxONum);
        })
    },
    dispaly:function(value){//按钮的隐藏
        var arr = this.footer,//按钮的集合
            num = this.num,//总共分多少页
            len = arr.length,
            value = value || 1;
        if(value == 1){
            arr[0].className = "hidden";
            arr[1].className = "hidden";
        }
        if(!num||num == 1){//没有评论&&评论只有一页的时候
            for(var i = 0;i < len;i++){
                arr[i].className = "hidden";
            }
            return;
        }else if(num > 5){
            for(var i = 2;i < len-2;i++){
                arr[i].className = "show";
                arr[i].value = i - 1;
                arr[i].id = "";
            }
            arr[value + 1].id = "focus";
            return;
        }
        for(i = 2;i < len - 2;i++){
            arr[i].id = "";
            arr[i].value = i - 1;
            arr[i].className = "show";
        }
        for(i = num + 2;i < len - 2;i++){
            arr[i].className = "hidden";
        }
        arr[value + 1].id = "focus";
    },
    click:function(e){
        var that = this,
            arr = that.footer,//按钮的集合
            num = that.num,//总共分多少页
            length = arr.length,
            target = e.target || e,
            value = parseInt(target.value) || e,
            index = indexOf(arr,target);
        that.lastFocusPage = that.focusPage;
        that.focusPage = value;
        that.showLi(that.focusPage);
        arr[length - 1].className = "show";
        arr[length - 2].className = "show";
        arr[0].className = "show";
        arr[1].className = "show";
        if(value == 1){
            arr[0].className = "hidden";
            arr[1].className = "hidden";
        }else if(value == num){
            arr[length - 1].className = "hidden";
            arr[length - 2].className = "hidden";
        }
        if(value < 5){
            that.dispaly(value);
        }else{
            for(var i = 2,j = -2;i < length - 2;i++,j++){
                if(value + j <= num){
                    arr[i].className = "show";
                    arr[i].value = value + j;
                    arr[i].id = "";
                    if(value + j == value){
                        arr[i].id = "focus";
                    }
                }else{
                    arr[i].className = "hidden";
                }
            }
        }
    },
    mclick:function(oFooter){
        var that = this,
            target,
            arr = that.footer,
            length = arr.length,
            index;
        eventHandler.live(oFooter,oFooter.children,"click",function(e){
            target = e.target,
                index = indexOf(arr,target);
            if(index < 2||indexOf(arr,target) >= length - 2){
                return;
            }
            that.click(e);
        })
    },
    sclick:function(oFooter){
        var that = this,
            target,
            arr = that.footer,
            length = arr.length,
            index;

        eventHandler.live(oFooter,oFooter.children,"click",function(e){
            target = e.target;
            if(!target.value){
                target.value = target.textContent.replace(/\s/g,"");
            }
            console.log(target.value);
            switch(target.value){
                case "<<":
                    that.click(1);
                    break;
                case ">>":
                    that.click(that.num);
                    break;
                case "<":
                    if(that.focusPage == 0) that.focusPage = 1;
                    that.click(that.focusPage - 1);
                    break;
                case ">":
                    if(that.focusPage == that.num) that.focusPage = that.num - 1;
                    that.click(that.focusPage + 1);
                    break;
            }

        })
    },
    GET:function(target,page){
        var xhr = ajaxObject.createXhr();
        json = ajaxObject.encode({"page":page})
        ajaxObject.GET(xhr,target,function(){
            //
        },page)
    },
    showLi:function(focusPage){
        focusPage--;
        console.log(focusPage,this.maxONum);
        for(var i = 0;i < this.content.length;i++){
            if(i < focusPage * this.maxONum + this.maxONum&&i >= focusPage * this.maxONum){
                this.content[i].style.display = "block";
            }else{
                this.content[i].style.display = "none";
            }
        }
    },
    hidden:function(){
        for(var i = this.maxONum;i < this.content.length;i++){
            this.content[i].style.display = "none";
        }
    }
}

var eventHandler = {
	addEvent:
        function(target,type,callback,useCapture) {
            if (!target) return;
            if (!target["event" + type]) {
                target["event" + type] = {};
            }
            useCapture = useCapture || false;
            var fn = callback.toString().replace(/\s+/g,"");
            target["event" + type][fn] = handle;
            if (target.addEventListener) {
                target.addEventListener(type,handle,useCapture);
            } else if(target.attachEvent) {
                target.attachEvent("on" + type,handle);
            } else {
                target["on" + type] = handle;
            }
		function handle(event) {
			var event = event || window.event,
				preventDefault,
				stopPropagation;
			event.target = event.target || event.srcElement;
			preventDefault = event.preventDefault;
			stopPropagation = event.stopPropagation;
			event.preventDefault = function() {
				if (preventDefault) {
					preventDefault.call(event);
				} else {
					event.returnValue = false;
				}
			}
			event.stopPropagation = function() {
				if (stopPropagation) {
					stopPropagation.call(event);
				} else {
					event.cancelBubble = true;
				}
			}
			var	returnValue = callback.call(target,event);
			if (!returnValue) {
				event.preventDefault();
				event.stopPropagation();
			}
		}
	},
	removeEvent:
        function(target,type,callback,useCapture) {
            var fn = callback.toString().replace(/\s+/g,""),
                removeFn = target["event" + type][fn],
                useCapture = useCapture || false;
            if (target.removeEventListener) {
                target.removeEventListener(type,removeFn,useCapture);
            } else if(target.detachEvent) {
                target.detachEvent("on" + type,removeFn);
            } else {
                target["on" + type] = null;
            }
	},
	removeAll:
        function(target,type,useCapture) {
            var useCapture = useCapture || false,
            arr = target["event" + type];
            for(var key in arr) {
                if (target.removeEventListener) {
                    target.removeEventListener(type,arr[key],useCapture);
                } else if(target.detachEvent) {
                    target.detachEvent("on" + type,arr[key]);
                } else {
                    target["on" + type] = null;
                }
            }
	},
	live:
        function(father,child,type,callback) {
            if (!is(child,Array)) {
                var arr = [],
                    len;
                for (var i = 0,len = child.length;i < len;i++) {
                    arr.push(child[i]);
                }
            } else {
                arr = child;
            }
            this.addEvent(father,type,handle);
            function handle(e) {
                var target = e.target;
                if (indexOf(arr,target) != -1) {
                    callback.call(target,e);
                } else {
                    return;
                }
            }
	    }
}
function is(element,type) {
	return Object.prototype.toString.call(element) == "[object " + type + "]";
}
function indexOf(arr,target) {
	if (arr.indexOf) {
		return arr.indexOf(target);
	} else {
		var len;
		for(var i = 0,len = arr.length;i < len;i++){
			if (arr[i] == target) {
				return i;
			} else if(i == len-1) {
				return -1;
			}
		}
	}
}
function forEach(arr,fn) {
	if (arr.forEach) {
		arr.forEach(function(item,index,array) {
			fn(item,index,array);
		})
	} else {
		var len = arr.length;
		for (var i = 0;i < len;i++) {
			fn(arr[i],i,arr);
		}
	}
}
var ajaxObject = {
	createXhr:function() {
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else if(window.ActiveXObject) {
			return new ActiveXObject(Microsoft.XMLHTTP);
		}
	},
	encode:function(json) {
		var arr = [];
		for (var key in json) {
			arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(json[key]));
		}
		return arr.join("&");
	},
	GET:function(xhr,target,callback,string) {
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status >= 200 && xhr.status < 300||xhr.status == 304) {
					callback(xhr.responseText);
				} else {
					return;
				}
			}
		}
		if (string) {
			xhr.open("GET",target + "?" + string,true);
		} else {
			xhr.open("GET",target,true);
		}
		xhr.send(null);
	},
	POST:function(xhr,string,target,callback) {
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status >= 200 && xhr.status < 300||xhr.status == 304) {
					callback(xhr.responseText);
				} else {
					return;
				}
			}
		}
		xhr.open("POST",target,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(string);
	},
    POST1:function(xhr,string,target,fn){
        xhr.open("POST",target,false);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(string);
        fn();
    }
}
cookieObject = {
	set:function(name,value,expiress,path,domain,secure) {
		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		if (expiress instanceof Date) {
			cookieText += "; expiress=" + expiress.toGMTSting();
		}
		if (path) {
			cookieText += "; path=" + path;
		}
		if (domain) {
			cookieText += "; domain" + domain;
		}
		if (secure) {
			cookieText += "; secure";
		}
		document.cookie = cookieText;
	},
	get:function(name) {
		var cookie = document.cookie,
			cookieStart = cookie.indexOf();
	},
	unset:function() {}
}
function nodeFor(node) {
	var element,
		arr;
	element =  node.firstChild;
	arr = [];
	while (element) {
		arr.push(element);
		arguments.callee.call(this,element);
		element = element.nextSibling;
	}
	return arr;
}
function anlyDomain() {
    var result = [];
    var domain = window.location.hostname.toString().split('.');
    var length = domain.length;
    result = window.location.href.toString().match(new RegExp("(?=["+ domain[length - 1] + "])\\w+(\\/((\\w*)\\/*)*)(index?)"));
    if (result == null) result = ['', '/welcome/2015/'];
    return result[1];
}
var animation = {
	move:function(target,json,speed,callback) {//1.target目标2.json需求变化3.变化的速度4.动画完成后回调
		var timeScal = 1000/60,
			count = speed/timeScal,
			floorCount = Math.floor(count),
			counting = 0,
			timer,
			oldValue,
			distance,
			finalValue;
		if (!target.animation_final || !target.animation_old || !target.animation_distance) {
			target.animation_final = {};
			target.animation_old = {};
			target.animation_distance = {};
		}
		for (var key in json) {
			target.animation_final[key] = parseFloat(json[key]);
			if (key == "opacity"&&!target.addEventListener) {
				target.animation_old[key] = parseFloat(target.filters.alpha.opacity);
				target.animation_distance[key] = (parseFloat(json[key])*100 - parseFloat(target.animation_old[key]))/count;
			} else {
				target.animation_old[key] = parseFloat(getStyle(target,key));
				target.animation_distance[key] = (parseFloat(json[key]) - parseFloat(target.animation_old[key]))/count;
			}		
		}
		if(!target.timer) {
			target.timer = setInterval(function() {
				for(key in json){
					if (key == "opacity") {
						if (!target.addEventListener) {
							oldValue = target.animation_old[key];
							distance = target.animation_distance[key];
							target.filters.alpha.opacity = (oldValue + distance);
							target.animation_old[key] = oldValue + distance;
						} else {
							oldValue = target.animation_old[key];
							distance = target.animation_distance[key];
							target.style[key] = oldValue + distance;
							target.animation_old[key] = oldValue + distance;
						}
					} else {
						oldValue = target.animation_old[key];
						distance = target.animation_distance[key];
						target.style[key] = oldValue + distance + "px";
						target.animation_old[key] = oldValue + distance;
					}
				}
				counting++;
				if (counting == floorCount) {
					for (key in json) {
						target.style[key] = json[key];
					}
					clearInterval(target.timer);
					target.timer = null;
					callback&&callback();
				}
			},timeScal)
		}
	},
	stop:function(target) {
		clearInterval(target.timer);
		target.timer = null;
	}
	
}

function Carousel(width,speed) {
    if (!this instanceof Carousel) {
        return new Carousel(width,speed);
    }
    this.elementArray = [];
    this.callbackElementArray = [];
    this.count = 0;
    this.width = width;
    this.speed = speed || 5000;
    this.timer = null;
    this.callbackAction = null;//哪个小点处于激活状态

}
Carousel.prototype = {
    constructor:Carousel,
    start:function() {
        this.timer = setTimeout(bind(this.left,this),this.speed);
    },
    pushElement:function(fatherNode) {
        var childNode = fatherNode.children;
        for(var i = 0;i < childNode.length;i++){
            this.elementArray.push(childNode[i]);
        }
    },
    pushcallbackElement:function(fatherNode) {
        var childNode = fatherNode.children;
        for(var i = 0;i < childNode.length;i++){
            this.callbackElementArray.push(childNode[i]);
            childNode[i].children[0].number = i;
        }
        this.callbackAction = this.callbackElementArray[0];
    },
    left:function() {
        var arr = this.elementArray;
        width = this.width;
        if(this.count == arr.length - 1){
            forEach(arr,function(item,index,array){
                constant(item,{"left":index*width + ""},200);
            })
            this.count = 0;
        } else {

            forEach(arr,function(item,index,array) {
                constant(item,{"left":parseInt(item.style.left) - width},200);
            });
            this.count++;
        }
        !!this.callbackElementArray[0]&&this.callBack();
        this.timer = setTimeout(bind(this.left,this),this.speed);
    },
    stop:function() {
        if(this.timer) clearTimeout(this.timer);
    },
    callBack:function() {
        this.callbackAction.className = "";
        this.callbackAction = this.callbackElementArray[this.count];
        this.callbackAction.className = "action";
    },
    click:function(num) {
        this.stop();
        var count = num,
            width = this.width,
            arr = this.elementArray;
        forEach(arr,function(item,index,array) {
            constant(item,{"left":(index - count) * width + ""},200);
        })
        this.count = num;
        if (this.callbackElementArray.length > 1) {
            this.callBack();
        }
        this.start();
    }
}

function getStyle(target,style) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(target,null)[style];
	} else {
		return target.currentStyle[style];
	}
}


function bind(fn,context,ag) {
	return function() {
		fn.call(context,ag)
	}
}


function constant(target,json,speed,callback) {
	var timeScale = 1000 / 60,
		count = speed / timeScale,
		begin;

	if(target.timer) {
		clearTimeout(target.timer);
	}

	//设初值
	for(var key in json) {
		if(window.getComputedStyle) {
			begin = parseFloat(window.getComputedStyle(target,null)[key]);
		} else {
			begin = parseFloat(target.currentStyle[key]);
		}
		target[key] = (json[key] - begin) / count;
	}

	target.timer = setInterval(function() {
		var oldValue,newValue;
		var stop = true;
		for(var key in json) {
			//运动算法
			if(window.getComputedStyle) {
				oldValue = parseFloat(window.getComputedStyle(target,null)[key]);
			} else {
				oldValue = parseFloat(target.currentStyle[key]);
			}

			if(oldValue != json[key]) {
				stop = false;
			}

			if(target.addEventListener && Math.abs(oldValue - json[key]) < 1) {
				target.style[key] = json[key] + "px";
			} else if(!target.addEventListener &&  Math.abs(oldValue - json[key]) < 25) {
				target.style[key] = json[key] + "px";
			} else {
				newValue = oldValue + target[key];
				target.style[key] = newValue + "px";
			}
		}

		if(stop) {
			clearInterval(target.timer);
			typeof callback == "function" && callback();
		}

	},timeScale);
}

(function() {//回到顶部
	var go_top = document.getElementById("go_top");
	function top(speed) {
		var timeScale = 1000/60,
			timer,
			speed = speed / timeScale;
		y = window.scrollY || document.documentElement.scrollTop,
			xy = y / speed;
		if(!timer) {

			timer = setInterval(function() {
				if(window.scrollY < 100 || !window.scrollY && document.documentElement.scrollTop < 100){
					window.scrollTo(0,0);
					clearInterval(timer);
					timer = null;
				}
				window.scrollTo(0,y = y - xy);
			},timeScale)
		}
	}
	eventHandler.addEvent(go_top,"click",function(e) {
		top(200);
		return false;
	})
})();


(function() {//Top渐隐
	var go_top = document.getElementById("go_top"),
		b = true;
	eventHandler.addEvent(window,"scroll",function(e) {
		if(window.scrollY > 100 ||!window.scrollY && document.documentElement.scrollTop > 100) {
			if(b){
				b = false;
				animation.move(go_top,{"bottom":"200","opacity":"1.0"},300);
			}
		} else {
			if(!b) {
				b = true;
				animation.move(go_top,{"bottom":"100","opacity":"0"},300);
			}
		}
	})
})();


(function(speed,num) {//顶部渐隐
	var oheader = document.getElementById("header"),
		timer,
		timeScale = 1000/60,
		count = speed / timeScale,
		x = num / count,
		bCount = true,
		exp = /[0-9]+/,
		IeFileter,
		number;
	eventHandler.addEvent(window,"scroll",function(e) {
		if(window.scrollY > 300 ||!window.scrollY && document.documentElement.scrollTop > 300){
			if(!bCount) return false;
			bCount = false;
			clearInterval(timer);
			oheader.className = "header fixed";
			if(oheader.addEventListener){
				oheader.style.opacity = 0;
			}else{
				oheader.style.filter = "alpha(opacity=0)";
				//filter:alpha(opacity=50);
			}

			oheader.style.top = "0px";
			timer = setInterval(function() {
				if(oheader.addEventListener) {
					oheader.style.opacity = parseFloat(oheader.style.opacity) + x + "";
				} else {
					IeFileter = oheader.style.filter;
					number = IeFileter.match(exp)[0];
					oheader.style.filter = "alpha(opacity=" +  (parseFloat(number) + x*100) + ")";
					number = oheader.style.filter.match(exp)[0];
				}
				if(oheader.addEventListener && oheader.style.opacity >= "1") {
					clearInterval(timer);
				} else if(number >= 100) {
					clearInterval(timer);
				}
			},timeScale);
		} else {
			if(bCount) return false;
			bCount = true;
			clearInterval(timer);
			timer = setInterval(function() {
				if(oheader.addEventListener) {
					oheader.style.opacity = parseFloat(oheader.style.opacity) - x + "";
				} else {
					IeFileter = oheader.style.filter;
					number = IeFileter.match(exp)[0];
					oheader.style.filter = "alpha(opacity=" +  (parseFloat(number) - x*100) + ")";
					number = oheader.style.filter.match(exp)[0];
				}
				if(oheader.addEventListener&& oheader.style.opacity <= "0") {
					clearInterval(timer);
					oheader.className = "header";
					oheader.style.opacity = 1;
					oheader.style.filter = "alpha(opacity=100)";
				} else if(number <= 10) {
					clearInterval(timer);
					oheader.className = "header";
					oheader.style.opacity = 1;
					oheader.style.filter = "alpha(opacity=100)";
				}
			},timeScale);
		}
	})
})(500,1);
(function() {//云动画
	var c1 = document.getElementById("cloud01"),
		c5 = document.getElementById("cloud04");
	if(!c1.addEventListener) return "IE8.........";
	function c1R() {
		animation.move(c1,{"left":100},5000,c1L);
	}
	function c1L() {
		animation.move(c1,{"left":-70},5000,c1R);
	}
	function c5R() {
		animation.move(c5,{"right":50},5000,c5L);
	}
	function c5L() {
		animation.move(c5,{"right":20},5000,c5R);
	}
	c1R();
	c5R();

})();



(function() {//登录
	var user_name_c = document.getElementById("user_name"),
		password_c = document.getElementById("password"),
		phone_d = document.getElementById("phone_d"),
		qq_d = document.getElementById("qq_d"),
		b_d = document.getElementById("behavior_d"),
		div01 = document.getElementById("user_name_d"),
		div02 = document.getElementById("password_d"),
		sub = document.getElementById("login_sub"),
		big = document.getElementById("login_page_father"),
		notice = document.getElementById("warming"),
		logo = document.getElementById("login_logo"),
		skip = document.getElementById("skip"),
		yes = document.getElementById("yes"),
		close = document.getElementById("close"),
		wap = document.getElementById("wap"),
		login1 = document.getElementById("login1"),
		login2 = document.getElementById("login2"),
        phone = document.getElementById("phone"),
		xhr = ajaxObject.createXhr(),
		send,
		b_arr = [false,false],
		userTest = /[\u4E00-\u9FA5]{2,}/,
		passwordTest = /[0-9]{5}([0-9]|[Xx])/,
		b_c = true,
		completeInfo = false,
        fav = [
            '动漫', '极客', '摄影',
            '吃货', 'lol', '篮球',
            '旅游', '电影', '学霸',
            '健身', '音乐', '综艺',
        ],
        ins = [],
		timer;
	eventHandler.addEvent(window,"resize",function() {
		if(big.style.display == "none") return;
		clearTimeout(timer);
		timer = setTimeout(function(){
			big.style.top = (document.documentElement.clientHeight - 280)/2 + "px";
		},300)
	})
	eventHandler.addEvent(user_name_c,"blur",function() {
		if(this.value.match(userTest) == null){
			if(this.value != "") {
				this.style.border = "2px solid #FF3030";
			} else {
				this.style.border = "none";
			}
			b_arr[0] = false;
		} else {
			this.style.border = "2px solid #50930c";
			b_arr[0] = true;
		}
	})
	eventHandler.addEvent(password_c,"blur",function() {
		if(this.value.length != 6 || (this.value.length == 6 && !passwordTest.test(this.value))){
			if(this.value != ""){
				this.style.border = "2px solid #FF3030";
			} else {
				this.style.border = "none";
			}
			b_arr[1] = false;
		} else {
			this.style.border = "2px solid #50930c";
			b_arr[1] = true;
		}
	})
	eventHandler.addEvent(sub,"click",function() {
		if(b_arr[0] && b_arr[1]) {
			send = ajaxObject.encode({"name":user_name_c.value,"pwd":password_c.value});
			ajaxObject.POST(xhr,send, http, function(res) {
                var data = JSON.parse(res);
                if(data) {
                    notice.textContent = data.info + (!data.describe ? '' : data.describe);
                }
                if(data.status == 202 && !completeInfo) {
                    if (data.data) {
                        var qq = data.data.qq,
                            tel = data.data.tel;
                        var input_qq = document.getElementById('qq'),
                            input_phone = document.getElementById('phone');
                        if(qq) {
                            input_qq.setAttribute('disabled', 'true');
                            input_qq.value = qq;
                        } else if (tel) {
                            input_phone.setAttribute('disabled', 'true');
                            input_phone.value = tel;
                        }
                        var bav = data.data.behavior;
                        if(bav) {
                            bav.forEach(function(v){
                               for(var i = 0; i < 12; i++) {
                                   if (v == fav[i]) {
                                       ins.push(i);
                                       break;
                                   }
                               }
                            });
                            if(ins.length == 3) {
                                post_beh.children[ins[0]].style.background = '#FF8636';
                                post_beh.children[ins[1]].style.background = '#FF8636';
                                post_beh.children[ins[2]].style.background = '#FF8636';
                                beh_arr = [
                                    post_beh.children[ins[0]].textContent,
                                    post_beh.children[ins[1]].textContent,
                                    post_beh.children[ins[2]].textContent,
                                ];
                            }
                        }
                    }
                    logo.src = anlyDomain() + "Public/image/finish.png";
                    animation.move(big, {
                        "height": "460",
                        "top": (document.documentElement.clientHeight - 460) / 2 + ""
                    }, 500);
                    animation.move(div01, {"left": "-100", "opacity": "0"}, 500);
                    setTimeout(function () {
                        animation.move(div02, {"left": "-100", "opacity": "0"}, 500);
                        animation.move(document.getElementById("login_sub"), {"left": "-100", "opacity": "0"}, 500);
                    }, 150)
                    animation.move(b_d, {"top": "192", "opacity": "1.0"}, 500, function () {
                        div01.style.display = "none";
                        div02.style.display = "none";
                    });
                    phone_d.style.visibility = "visible";
                    qq_d.style.visibility = "visible";
                    animation.move(phone_d, {"top": "72", "opacity": "1.0"}, 1000);
                    animation.move(qq_d, {"top": "132", "opacity": "1.0"}, 1000);
                    animation.move(skip, {"top": "380", "opacity": "1.0"}, 1000);
                    animation.move(yes, {"top": "380", "opacity": "1.0"}, 1000);
                    b_c = true;
                } else if (data.status >= 200 && data.status < 202) {
                    b_c = true;
                    wap.style.display = "none";
                    animation.move(big,{"top":"-280","opacity":"0"},1000,function(){
                        big.style.display = "none";
                        window.location = window.location.href;
                    })
                } else if (data.status >= 400 || !data) {
                    b_c = false;
                    notice.style.display = "block";
                    animation.move(notice,{"top":"110","opacity":"1.0"},1000,
                        function() {
                            animation.move(notice,{"top":"80","opacity":"0"},1000,function(){
                                notice.style.top = "140px";
                                notice.style.display = "none";
                            })
                        }
                    );
                }
                notice.style.display = "block";
                animation.move(notice,{"top":"110","opacity":"1.0"},1000,
                    function() {
                        animation.move(notice,{"top":"80","opacity":"0"},1000,function(){
                            notice.style.top = "140px";
                            notice.style.display = "none";
                        })
                    }
                );
            });
		} else {
            notice.style.display = "block";
            animation.move(notice,{"top":"110","opacity":"1.0"},1000,
                function() {
                    animation.move(notice,{"top":"80","opacity":"0"},1000,function(){
                        notice.style.top = "140px";
                        notice.style.display = "none";
                    })
                }
            );
			if(!b_c) {return;}
		}

	})

	eventHandler.addEvent(login1,"click",function() {
        wap.style.display = "block";
        big.style.display = "block";
        animation.move(big, {"top": "300", "opacity": "1.0"}, 500, function () {
            if (parseFloat(getStyle(big, "top")) > 280) {
                animation.move(big, {"top": "200"}, 300, function () {
                    animation.move(big, {"top": "280"}, 300);
                });
            };
        });
	})
	eventHandler.addEvent(login2,"click",function() {
        wap.style.display = "block";
        big.style.display = "block";
        animation.move(big, {"top": "300", "opacity": "1.0"}, 500, function () {
            if (parseFloat(getStyle(big, "top")) > 280) {
                animation.move(big, {"top": "200"}, 300, function () {
                    animation.move(big, {"top": "280"}, 300);
                });
            };
        });
	})
	eventHandler.addEvent(close,"click",function(){
		animation.move(big,{"top":"-280","opacity":"0"},1000,function(){
			big.style.display = "none";
            wap.style.display = "none";
            return true;
		})
        return true;
	})
    eventHandler.addEvent(phone,"blur",function(){
        if(this.value.length != 11){
            alert("你输入的手机号格式有误");
        }
    })
    var post_beh = document.getElementById("post_behavior"),
        stu_tel = document.getElementById("phone"),
        stu_qq = document.getElementById("qq"),
        sub = document.getElementById("yes"),
        xhr = ajaxObject.createXhr(),
        json,
        mob = /1[0-9]{10}/,
        qq = /[1-9][0-9]{4,10}/,
        value01,
        value02,
        notice = document.getElementById("warming"),
        beh_arr = [];
    eventHandler.live(post_beh,post_beh.children,"click",function(e){
        if(this.check == undefined){
            this.check = true;
        }
        if(this.check){
            if(beh_arr.length > 2){
                return;
            }
            this.style.background = "rgb(255,134,54)";
            beh_arr.push(this.innerHTML);
            this.check = false;
        }else{
            this.style.background = "rgb(92,179,220)";
            for(var i = 0;i < beh_arr.length;i++){
                if(beh_arr[i] == this.innerHTML){
                    beh_arr.splice(i,1);
                }
            }
            this.check = true;
        }
        return false;
    });
    eventHandler.addEvent(sub,"click",function(e){
        value01 = stu_tel.value;
        value02 = stu_qq.value;
        if ( (!value02 || qq.test(value02)) && (!value01 || mob.test(value01))) {
            json = {"stu_tel":value01,"stu_qq":value02};
            for(var i = 0;i < beh_arr.length;i++){
                json["beh_arr" + i] = beh_arr[i];
            }
            json = ajaxObject.encode(json);
            ajaxObject.POST(xhr,json,'getExtraInfo',function(res){
                var data = JSON.parse(res);
                if(data.status == 203) {
                    completeInfo = true;
                    window.location = window.location.href;
                } if (data.status > 400) {
                    notice.textContent = data.info;
                    notice.style.display = "block";
                    animation.move(notice,{"top":"110","opacity":"1.0"},1000,
                        function() {
                            animation.move(notice,{"top":"80","opacity":"0"},1000,function(){
                                notice.style.top = "140px";
                                notice.style.display = "none";
                            })
                        }
                    );
                    return;
                }
            });
        } else {
            return;
        }
    });
})();
