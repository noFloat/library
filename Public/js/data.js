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

var oUl = document.getElementById("page_mid"),
    oFooter = document.getElementById("page_bottom");
if(oUl && oFooter) {
    page = new Paging(oUl,oFooter,1, true);
    page.dispaly();
    page.mclick(oFooter);
    page.sclick(oFooter);
}


require.config({
    paths:{
        echarts:"http://echarts.baidu.com/build/dist"
    }
});

function charst(name, value, value1, title, bili) {
    require([
        "echarts",
        "echarts/chart/pie"
        ],

        function(ec){
            myChart = ec.init(document.getElementById("page_mid_next"));
            option = {
                color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                title:{
                    show:true,
                    text:title,
                    subtext:bili,
                    x:"center",
                    textStyle:{
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#8e6946'
                    },
                    subtextStyle:{
                        fontSize: 16,
                        fontWeight: 'bolder',
                        color: '#ff7b3e',
                    }
                },
                legend: {
                    orient : 'vertical',
                    x : 650,
                    y:250,
                    data:name
                },
                toolbox: {
                    show : true,
                    feature : {
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                {
                    type:'pie',
                    radius : "30%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                position : 'center',
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:value1
                },
                {
                    name:"男女比例",
                    type:'pie',
                    x:0,
                    y:0,
                    radius :['40%',"55%"],
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data: value
                    //    [
                    //{"name":"男","value":"30"},
                    //{"name":"女","value":"70"},
                    //]
                },
                ]
            };

            myChart.setOption(option);
        });
changebg(data_btu1);
page_mid_next.style.display = "block";
row.style.display = "none";
clomu.style.display = "none";
}


var data_btu1 = document.getElementById("data_btu1");
var data_btu2 = document.getElementById("data_btu2");
var data_btu3 = document.getElementById("data_btu3");
var data_btu4 = document.getElementById("data_btu4");
var data_btu5 = document.getElementById("data_btu5");
var page_mid_next = document.getElementById("page_mid_next");
var row = document.getElementById("row");
var clomu = document.getElementById("clomu");
var WH1 = document.getElementById("WH1");
var WH2 = document.getElementById("WH2");
var index = data_btu1;

(function (){
    var opage_ul = document.getElementById("page_ul"),
        opage = document.querySelectorAll(".page_mid"),
        obtn = opage_ul.getElementsByTagName("a");
    for(var i = 0; i < opage.length;i++){
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

function charst_sex(singleDog,notalone){
    require([
        "echarts",
        "echarts/chart/pie"
        ],

        function(ec){
            myChart = ec.init(document.getElementById("row1"));
            option = {
                color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                title:{
                    show:true,
                    text:"所在学院男女比",
                    x:"center",
                    y:"300",
                    textStyle:{
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#8e6946'
                    }, 
                    subtextStyle:{
                        fontSize: 16,
                        fontWeight: 'bolder',
                        color: '#ff7b3e',
                    }
                },
                legend: {
                    orient : 'vertical',
                    x : 350,
                    y:200,
                    data:["男","女","已脱单","未脱单"]
                },
                calculable : true,
                series : [
                {
                    type:'pie',
                    x:0,
                    y:0,
                    radius :'25%',
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:singleDog
                },
                {
                    name:"脱单率",
                    type:'pie',
                    x:0,
                    y:0,
                    radius :['30%',"40%"],
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:notalone
                },
                ]
            };
            myChart.setOption(option);
        });
require([
    "echarts",
    "echarts/chart/pie"
    ],

    function(ec){
        myChart = ec.init(document.getElementById("row2"));
        option = {
            color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title:{
                show:true,
                text:"学校男女比",
                x:"center",
                y:"300",
                textStyle:{
                    fontSize: 18,
                    fontWeight: 'bolder',
                    color: '#8e6946'
                },
            },
            legend: {
                orient : 'vertical',
                x : 350,
                y:200,
                data:["男","女","已脱单","未脱单"]
            },
            calculable : true,
            series : [
            {
                type:'pie',
                x:0,
                y:0,
                radius : "25%",
                itemStyle : {
                    normal : {
                        label : {
                            show : true
                        },
                        labelLine : {
                            show : true
                        }
                    },
                    emphasis : {
                        label : {
                            show : false,
                            position:"center",
                            textStyle : {
                                fontSize : '20',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:[
                {"name":"男","value":"3026"},
                {"name":"女","value":"1685"},
                ]
            },
            {
                name:"脱单率",
                type:'pie',
                x:0,
                y:0,
                radius :['30%',"40%"],
                itemStyle : {
                    normal : {
                        label : {
                            show : true
                        },
                        labelLine : {
                            show : true
                        }
                    },
                    emphasis : {
                        label : {
                            show : false,
                            textStyle : {
                                fontSize : '20',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:[
                {"name":"已脱单","value":"1344"},
                {"name":"未脱单","value":"3367"},
                ]
            },
            ]

        };   
        myChart.setOption(option);
    });
changebg(data_btu2);
page_mid_next.style.display = "none";
row.style.display = "block";
clomu.style.display = "none";
WH1.style.display = "block";
WH2.style.display = "none";
}


function chart_age(age,agevalue,star,starvalue){
    require([
        "echarts",
        "echarts/chart/pie"
        ],

        function(ec){
            myChart = ec.init(document.getElementById("row1"));
            option = {
                color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                title:{
                    show:true,
                    text:"同年同月比",
                    x:"center",
                    y:"300",
                    textStyle:{
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#8e6946'
                    }, 
                    subtextStyle:{
                        fontSize: 16,
                        fontWeight: 'bolder',
                        color: '#ff7b3e',
                    }
                },
                legend: {
                    orient : 'vertical',
                    x : 300,
                    y:250,
                    data:age
                },
                calculable : true,
                series : [
                {
                    type:'pie',
                    x:0,
                    y:0,
                    radius : ['25%', '35%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                position:"center",
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:agevalue
                }
                ]

            };

            myChart.setOption(option);
        });
require([
    "echarts",
    "echarts/chart/pie"
    ],

    function(ec){
        myChart = ec.init(document.getElementById("row2"));
        option = {
            color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title:{
                show:true,
                text:"同星座比例",
                x:"center",
                y:"300",
                textStyle:{
                    fontSize: 18,
                    fontWeight: 'bolder',
                    color: '#8e6946'
                },
            },
            legend: {
                orient : 'vertical',
                x : 300,
                y:250,
                data:star
            },
            calculable : true,
            series : [
            {
                type:'pie',
                x:0,
                y:0,
                radius : ['25%', '35%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : true
                        },
                        labelLine : {
                            show : true
                        }
                    },
                    emphasis : {
                        label : {
                            show : false,
                            position:"center",
                            textStyle : {
                                fontSize : '20',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:starvalue
            }
            ]

        };   
        myChart.setOption(option);
    });
changebg(data_btu3);
page_mid_next.style.display = "none";
row.style.display = "block";
clomu.style.display = "none";
WH1.style.display = "none";
WH2.style.display = "block";
}


function charst_subject(){
    require([
            "echarts",
            "echarts/chart/pie"
        ],

        function(ec){
            myChart = ec.init(document.getElementById("page_mid_next"));
            option = {
                color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],

                timeline:{
                    show:true,
                    data:["通信","计科","光电","自动化","理学院","生物","经管","体育","外国语","先进制造","传媒","软件","法学","半导体",""],
                    label:{
                        rotate:-25,
                        textStyle:{
                            fontSize:10,
                        }
                    },
                    type:"number",
                },
                options :[
                    {
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        title :{
                            show:true,
                            text:"各个学院学生心中最难的科目",
                            x:"center",
                            textStyle:{
                                fontSize: 18,
                                fontWeight: 'bolder',
                                color: '#8e6946'
                            }
                        },
                        legend: {
                            orient : 'vertical',
                            x : 650,
                            y:250,
                            data:["电子电路","大学物理","高等数学"]
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"电子电路","value":62},
                                    {"name":"大学物理","value":20},
                                    {"name":"高等数学","value":18}
                                ]
                            }
                        ]
                    },
                    {
                        legend: {
                            orient : 'vertical',
                            x : 650,
                            y:250,
                            data:["大学物理","高等数学","线性代数"]
                        },
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"大学物理","value":40},
                                    {"name":"高等数学","value":35},
                                    {"name":"线性代数","value":25}
                                ]
                            }
                        ]
                    },
                    {
                        legend: {
                            orient : 'vertical',
                            x : 650,
                            y:250,
                            data:["大学物理","概率论","工程图学"]
                        },
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"大学物理","value":54},
                                    {"name":"概率论","value":26},
                                    {"name":"工程图学","value":20}
                                ]
                            }
                        ]
                    },
                    {
                        legend: {
                            orient : 'vertical',
                            x : 650,
                            y:250,
                            data:["大学物理","高等数学","C语言"]
                        },
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"大学物理","value":45},
                                    {"name":"高等数学","value":30},
                                    {"name":"C语言","value":25}
                                ]
                            }
                        ]
                    },
                    {legend: {
                        orient : 'vertical',
                        x : 650,
                        y:250,
                        data:["数学分析","高等数学","大学物理"]
                    },
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"数学分析","value":49},
                                    {"name":"高等数学","value":28},
                                    {"name":"大学物理","value":23}
                                ]
                            }
                        ]
                    },
                    {  legend: {
                        orient : 'vertical',
                        x : 650,
                        y:250,
                        data:["高等数学","视听说","化学"]
                    },
                        series : [
                            {

                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"高等数学","value":45},
                                    {"name":"视听说","value":31},
                                    {"name":"化学","value":24}
                                ]
                            }
                        ]
                    },
                    {
                        legend: {
                            orient : 'vertical',
                            x : 650,
                            y:250,
                            data:["概率论","高等数学","C语言"]
                        },
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"概率论","value":42},
                                    {"name":"高等数学","value":38},
                                    {"name":"C语言","value":20}
                                ]
                            }
                        ]
                    },
                    {
                        legend: {
                            orient : 'vertical',
                            x : 650,
                            y:250,
                            data:["运动解剖学","体育概论","健美操"]
                        },
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"运动解剖学","value":56},
                                    {"name":"体育概论","value":22},
                                    {"name":"健美操","value":22}
                                ]
                            }
                        ]
                    },
                    {
                        legend: {
                            orient : 'vertical',
                            x : 650,
                            y:250,
                            data:["基础英语","英语语音","英语阅读"]
                        },
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"基础英语","value":49},
                                    {"name":"英语语音","value":31},
                                    {"name":"英语阅读","value":30}
                                ]
                            }
                        ]
                    },
                    {
                        legend: {
                            orient : 'vertical',
                            x : 650,
                            y:250,
                            data:["工程图学","大学物理","高等数学"]
                        },
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"工程图学","value":55},
                                    {"name":"大学物理","value":24},
                                    {"name":"高等数学","value":21}
                                ]
                            }
                        ]
                    },
                    {
                        legend: {
                            orient : 'vertical',
                            x : 650,
                            y:250,
                            data:["视听说","读写译","美术史"]
                        },
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"视听说","value":43},
                                    {"name":"读写译","value":32},
                                    {"name":"美术史","value":25}
                                ]
                            }
                        ]
                    },
                    {
                        legend: {
                            orient : 'vertical',
                            x : 650,
                            y:250,
                            data:["高等数学","离散数学","C++"]
                        },
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"高等数学","value":56},
                                    {"name":"离散数学","value":23},
                                    {"name":"C++","value":21}
                                ]
                            }
                        ]
                    },
                    {
                        legend: {
                            orient : 'vertical',
                            x : 650,
                            y:250,
                            data:["刑法","民法","法理"]
                        },
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"刑法","value":56},
                                    {"name":"民法","value":25},
                                    {"name":"法理","value":21}
                                ]
                            }
                        ]
                    },
                    {
                        legend: {
                            orient : 'vertical',
                            x : 650,
                            y:250,
                            data:["软件设计基础","线性代数","大学物理"]
                        },
                        series : [
                            {
                                name:'科目',
                                type:'pie',
                                radius : '50%',
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : true
                                        },
                                        labelLine : {
                                            show : true
                                        }
                                    },
                                    emphasis : {
                                        label : {
                                            show : false,
                                            textStyle : {
                                                fontSize : '20',
                                                fontWeight : 'bold'
                                            }
                                        }
                                    }
                                },
                                data:[{"name":"软件设计基础","value":52},
                                    {"name":"线性代数","value":32},
                                    {"name":"大学物理","value":16}
                                ]
                            }
                        ]
                    }
                ]
            };

            myChart.setOption(option);
        });
    changebg(data_btu4);
    page_mid_next.style.display = "block";
    row.style.display = "none";
    clomu.style.display = "none";
}

function charst_end(content){
    require([
        "echarts",
        "echarts/chart/pie"
        ],

        function(ec){
            myChart = ec.init(document.getElementById("clomu1"));
            option = {
                color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],

                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                title:{
                    show:true,
                    text:"全校本科生就业情况",
                    textStyle:{
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#8e6946'
                    }, 
                    subtextStyle:{
                        fontSize: 10,
                        color: '#ff7b3e',
                    }
                },
                legend: {
                    orient : 'vertical',
                    x : 650,
                    y:80,
                    data:["签就业协议","升学出国","灵活就业","待就业"]
                },
                toolbox: {
                    show : true,
                    feature : {
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                {
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":3826},
                    {"name":"升学出国","value":772},
                    {"name":"灵活就业","value":49},
                    {"name":"待就业","value":187}
                    ]
                }
                ]
            };

            myChart.setOption(option);
        });
require([
    "echarts",
    "echarts/chart/pie"
    ],

    function(ec){
        myChart = ec.init(document.getElementById("clomu2"));
        option = {
            color:["#00CCCC","#FF9999","#33FF66","#CCFF33"],
            timeline:{
                show:true,
                data:["通信","计科","光电","自动化","理学院","生物","经管","体育","外国语","先进制造","传媒","软件","半导体","法学",""],
                label:{
                    rotate:-25,
                    textStyle:{
                        fontSize:10,
                    }    
                },
                type:"number",
            },
            options :[
            {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                title :{
                    show:true,
                    text:"本学院本科生就业情况",
                    subtext:content,
                    textStyle:{
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#8e6946'
                    }, 
                    subtextStyle:{
                        fontSize: 10,
                        color: '#ff7b3e',
                    }
                },
                legend: {
                    orient : 'vertical',
                    x : 650,
                    y:50,
                    data:["签就业协议","升学出国","待就业","灵活就业"]
                },
                toolbox: {
                    show : true,
                    feature : {
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":688},
                    {"name":"升学出国","value":203},
                    {"name":"待就业","value":19},
                    {"name":"灵活就业","value":3}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":360},
                    {"name":"升学出国","value":106},
                    {"name":"待就业","value":23},
                    {"name":"灵活就业","value":4}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":167 },
                    {"name":"升学出国","value":55},
                    {"name":"待就业","value":13},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":349},
                    {"name":"升学出国","value":74},
                    {"name":"待就业","value":6},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":123},
                    {"name":"升学出国","value":23},
                    {"name":"待就业","value":8},
                    {"name":"灵活就业","value":4}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":192},
                    {"name":"升学出国","value":63},
                    {"name":"待就业","value":12},
                    {"name":"灵活就业","value":1}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":488},
                    {"name":"升学出国","value":53},
                    {"name":"待就业","value":29},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":52},
                    {"name":"升学出国","value":7},
                    {"name":"待就业","value":1},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":54},
                    {"name":"升学出国","value":10},
                    {"name":"待就业","value":0},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":102},
                    {"name":"升学出国","value":12},
                    {"name":"待就业","value":5},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":538},
                    {"name":"升学出国","value":69},
                    {"name":"待就业","value":17},
                    {"name":"灵活就业","value":27}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":494},
                    {"name":"升学出国","value":40},
                    {"name":"待就业","value":26},
                    {"name":"灵活就业","value":8}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":111},
                    {"name":"升学出国","value":27},
                    {"name":"待就业","value":8},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            },
            {
                series : [
                {
                    name:'毕业生',
                    type:'pie',
                    radius : "40%",
                    itemStyle : {
                        normal : {
                            label : {
                                show : true
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {
                            label : {
                                show : false,
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[{"name":"签就业协议","value":51},
                    {"name":"升学出国","value":25},
                    {"name":"待就业","value":4},
                    {"name":"灵活就业","value":0}
                    ]
                }
                ]
            }
            ]
        };

        myChart.setOption(option);
    });
changebg(data_btu5);
page_mid_next.style.display = "none";
row.style.display = "none";
clomu.style.display = "block";
}


function changebg(target) {
    index.removeAttribute("class","stu_li_active");
    target.setAttribute("class","stu_li_active");
    index = target;
}

(function(){

    var timer = setInterval(function(){
        var btu = document.querySelectorAll(".jtico");
        if (btu.length == 0) {
            console.log(1);
            return;
        }else{
          for (var i = 0; i < btu.length; i++) {
            btu[i].style.opacity = "0";
        }; 
        clearInterval(timer); 
    }
},500); 
})();