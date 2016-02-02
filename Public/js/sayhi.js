var oUl = document.getElementById("hi-artcle"),
    oFooter = document.getElementById("bottom"),
    oUl1 = document.getElementById("big"),
    oFooter1= document.getElementById("foo");

var a = new Paging(oUl,oFooter,11, false);
a.dispaly();
a.mclick(oFooter);
a.sclick(oFooter);
var b = new Paging(oUl1,oFooter1,5 ,false);
b.dispaly();
b.mclick(oFooter1);
b.sclick(oFooter1);
   