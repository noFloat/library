(function (){
        var opage_ul = document.getElementById("color_ul"),
            opage = document.querySelectorAll(".page_mid"),
            obtn = opage_ul.getElementsByTagName("a");
            prefix = anlyDomain();
            for(var i = 0; i<opage.length;i++){
                var index = 2;
                obtn[i].onclick = (function (i){       
                    return function(){
                        opage[index].style.display = "none";    
                        opage[i].style.display = "block";
                        obtn[index].removeAttribute("class","page_active");
                        obtn[i].setAttribute("class","page_active");
                        index = i;
                        if(i == 0){
                            ostuturn();
                        }
                        else if(i == 1){
                            oteaturn(0);
                        }
                        else if(i == 2){
                            opicturn(0);
                        }
                        else if(i == 3){
                            ovideoturn(0,1,1,2);
                        }
                    }
                })(i);
            }
        var stu = document.getElementById("stu").getElementsByTagName("a");
        function ostuturn(){
            for(var i = 0;i < stu.length; i++){
                var num = i+1;
                stu[i].style.background="url('" + prefix + "Public/image/person/person_"+ num +".png') no-repeat 50% 50%";
                stu[i].style.backgroundSize = "cover";
            }
        }

        var opic_btn = document.getElementById("pic_btn"),
            opic = document.getElementById("pic_main"),
            main_page = opic.querySelectorAll(".page_fix"),
            opicbtn = opic_btn.querySelectorAll(".page_bottom_li"),
            opicbtnstyle = opic_btn.getElementsByTagName("a");
            opicpre = opic_btn.querySelectorAll(".page_bottom_li_special")[0],
            opicnex = opic_btn.querySelectorAll(".page_bottom_li_special")[1],
            opicindex = 0,
            oimg0 = document.getElementById("win_img_1"),
            oimg1 = document.getElementById("win_img_2"),
            oimg2 = document.getElementById("win_img_3"),
            oimg3 = document.getElementById("win_img_4"),
            img0  = oimg0.getElementsByTagName("a"),
            img1  = oimg1.getElementsByTagName("a"),
            img2  = oimg2.getElementsByTagName("a"),
            img3  = oimg3.getElementsByTagName("a");
            function opicturn(page){
                if( page < 0 ){
                    page = 0;
                }
                else if(page > 3){
                    page = 3;
                    opicindex = 2;
                }
                else if(page == 0){
                    for(var i = 0;i < img0.length;i++){
                        img0[i].style.background = "url('" + prefix + "Public/image/thumbnail/color/color_"+ i +".png') no-repeat";
                        img0[i].style.backgroundSize = "cover";
                    }
                }
                else if(page == 1){
                    for(var i = 0;i < img1.length;i++){
                        var num = i+8;
                        img1[i].style.background = "url('" + prefix + "Public/image/thumbnail/color/color_"+ num +".png') no-repeat";
                        img1[i].style.backgroundSize = "cover";
                    }
                }
                else if(page == 2){
                    for(var i = 0;i < img2.length;i++){
                        var num = i+16;
                        img2[i].style.background = "url('" + prefix + "Public/image/thumbnail/color/color_"+ num +".png') no-repeat";
                        img2[i].style.backgroundSize = "cover";
                    }
                }
                else if(page == 3){
                    for(var i = 0;i < img3.length;i++){
                        var num = i+24;
                        img3[i].style.background = "url('" + prefix + "Public/image/thumbnail/color/color_"+ num +".png') no-repeat";
                        img3[i].style.backgroundSize = "cover";
                    }
                }
                main_page[opicindex].style.display = "none";
                main_page[page].style.display = "block";
                opicbtnstyle[opicindex+1].removeAttribute("class","page_bottom_spe");
                opicbtnstyle[page+1].setAttribute("class","page_bottom_spe");
                opicindex = page;

            }
            opicpre.onclick = function (){
                opicturn(opicindex-1)
            };
            opicnex.onclick = function (){
                opicturn(opicindex+1)
            };
            opicbtn[0].onclick = function (){
                opicturn(0)
            };
            opicbtn[1].onclick = function (){
                opicturn(1)
            };
            opicbtn[2].onclick = function (){
                opicturn(2)
            };
            opicbtn[3].onclick = function (){
                opicturn(3)
            };

        var teacher_btn = document.getElementById("teacher_choose"),
            oteacher = document.getElementById("teacher_page"),
            teacher_page = oteacher.querySelectorAll(".page_fix"),
            oteabtn = teacher_btn.querySelectorAll(".page_bottom_li"),
            oteabtnstyle = teacher_btn.getElementsByTagName("a");
            oteapre = teacher_btn.querySelectorAll(".page_bottom_li_special")[0],
            oteanex = teacher_btn.querySelectorAll(".page_bottom_li_special")[1],
            oteaindex = 0,
            oteacher1 =  document.getElementById("teacher_1"),
            oteacher2 =  document.getElementById("teacher_2"),
            oteacher3 =  document.getElementById("teacher_3"),
            teacher1  = oteacher1.getElementsByTagName("a"),
            teacher2  = oteacher2.getElementsByTagName("a"),
            teacher3  = oteacher3.getElementsByTagName("a");

        function oteaturn(page){
            if( page < 0 ){
                page = 0;
            }
            else if(page > 2){
                page = 2;
                oteaindex = 1;
            }
            else if(page == 0){
                for(var i = 0;i < teacher1.length;i++){
                    var num = i+1;
                    teacher1[i].style.background = "url('" + prefix + "Public/image/teacher/teacher_"+ num +".jpg') no-repeat 50% 50%";
                    teacher1[i].style.backgroundSize = "cover";
                }
            }
            else if(page == 1){
                for(var i = 0;i < teacher2.length;i++){
                    var num = i+9;
                    teacher2[i].style.background = "url('" + prefix + "Public/image/teacher/teacher_"+ num +".jpg') no-repeat 50% 50%";
                    teacher2[i].style.backgroundSize = "cover";
                }
            }
            else if(page == 2){
                for(var i = 0;i < teacher3.length;i++){
                    var num = i+17;
                    teacher3[i].style.background = "url('" + prefix + "Public/image/teacher/teacher_"+ num +".jpg') no-repeat 50% 50%";
                    teacher3[i].style.backgroundSize = "cover";
                }
            }
            teacher_page[oteaindex].style.display = "none";
            teacher_page[page].style.display = "block";
            oteabtnstyle[oteaindex+1].removeAttribute("class","page_bottom_spe");
            oteabtnstyle[page+1].setAttribute("class","page_bottom_spe");
            oteaindex = page;
        }
        oteapre.onclick = function (){
            oteaturn(oteaindex-1)
        };
        oteanex.onclick = function (){
            oteaturn(oteaindex+1)
        };
        oteabtn[0].onclick = function (){
            oteaturn(0)
        };
        oteabtn[1].onclick = function (){
            oteaturn(1)
        };
        oteabtn[2].onclick = function (){
            oteaturn(2)
        };

        var ovideo = document.getElementById("choose_video"),
            turn_video = ovideo.querySelectorAll(".page_fix"),
            ovideo_btn = document.getElementById("video_btn"),
            ovideobtn = ovideo_btn.getElementsByTagName("a"),
            ovideo = document.getElementById("video"),
            ovideo1 = document.getElementById("video1"),
            video = ovideo.getElementsByTagName("a"),
            video1 = ovideo1.getElementsByTagName("a");
        function ovideoturn(a,b,x,y){
            turn_video[a].style.display = "block";
            turn_video[b].style.display = "none";
            ovideobtn[x].setAttribute("class","page_bottom_spe");
            ovideobtn[y].removeAttribute("class","page_bottom_spe");
            if(a == 0){
                for(var i = 0;i < video.length;i++){
                    var n = i + 1;
                    video[i].style.background = "url('" + prefix + "Public/image/thumbnail/video/video"+ n +".png') no-repeat 50% 50%";
                    video[i].style.backgroundSize = "cover";
                }
            }
            else if(a == 1){
                for(var i = 0;i < video1.length;i++){
                    var n = i + 9;
                    video1[i].style.background = "url('" + prefix + "Public/image/thumbnail/video/video"+ n +".png') no-repeat 50% 50%";
                    video1[i].style.backgroundSize = "cover";
                }
            }
        }
        ovideobtn[0].onclick = function (){
            ovideoturn(0,1,1,2);
        }
        ovideobtn[1].onclick = function (){
            ovideoturn(0,1,1,2);
        }
        ovideobtn[2].onclick = function (){
            ovideoturn(1,0,2,1);
        }
        ovideobtn[3].onclick = function (){
            ovideoturn(1,0,2,1);
        }
        opicturn(0);
    })();