 // 取所有看需要的节点
    let $dom =  $("#carsousel");
    let $imageLis = $("#carsousel ul li");
    let $leftBtn = $("#carsousel .btns a:nth-child(1)");
    let $rightBtn = $("#carsousel .btns a:nth-child(2)");
    let $cover_box = $("#carsousel .cover_box");
    // 信号量
    let idx = 0;
    // 函数节流
    let lock = true;
    // 开启定时器
    let timer = setInterval(right_change,800);
    // 触碰关闭定时器
    $(".carsousel").mouseenter(function(){
        clearInterval(timer);
    })
    // 离开开始定时器
     $(".carsousel").mouseleave(function(){
       timer = setInterval(right_change,800);
    })
    // 模版
    let templateStr = $("#template").html();
   for (var i = 0; i < 3; i++) {
        for (var k = 0; k < 6; k++) {
            $(templateStr).css({
                "width":180,
                "height":120,
                "position":"absolute",
                "top":i*160,
                "left":k*125
            }).attr({
                "data-row":i,
                "data-col":k
            }).appendTo(".cover_box");
        };
   };
   // 找到碎片定位
   $(".inner_box").each(function(){
        var row = $(this).attr("data-row");
        var col = $(this).attr("data-col");
        $(this).css({
            "perspective":"1000px"
        });
        $(this).find(".suipian").css({
            "height":180,
            "background-position":col*-160 + "px "+ row* -180 + "px"
        });
   });
   // 右按钮变化事件 绑定了定时器
   function right_change(){
        var number = idx + 1;
        if( number > $imageLis.length - 1){
            number = 0;
        };
        change(number);
   }
   // 添加事件
   $rightBtn.click(function(){
        right_change();
   });
   $leftBtn.click(function(){
        var number = idx - 1;
        if( number < 0 ){
            number =  $imageLis.length - 1;
        };
        change(number);
   });
   // 核心动画
   function change(number){
        if(!lock) return;
        lock = false;
        // 换图
        $(".suipian").css("background-image","url('"+$imageLis.find("img").eq(idx).attr("src")+"')");
        //改变信号量
        idx = number;
        // 换图
        $imageLis.eq(idx).addClass('cur').siblings().removeClass('cur');
        $(".cover_box").show();
        $(".suipian").css("opacity",1);
        // 爆炸效果
        $(".suipian").each(function(i){
            var rx = Math.random()*150 - 75; //-30~30
            var ry = Math.random()*150 - 75;
            var rz = Math.random()*160 - 80;
            $(this).animate({
                "transform":"rotateX("+rx+"deg) rotateY("+ry+"deg) translateZ(1000px) rotateZ("+rz+"deg)",
                "opacity":0
            },{
                "duration":1500,
                "easing":"cubic-bezier(0.5,-0.45,0.5,1.5)",
                "complete":function(){
                    $(this).css({
                        "transform":"none"
                    });
                    if(i == 17){
                        // 标志着最后一个小碎片动画完成
                        lock = true;
                        // 隐藏替身
                        $(".cover_box").hide();
                    }
                }
            });
        })
   }