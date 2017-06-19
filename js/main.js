$(function(){

    EZ.Init();  //初始化函数

});


var EZ = {
    Init : function(){
        this.EventHandler()    //事件处理函数
    },
    EventHandler:function(){
        $(".loadnum").click(function(){
         
            $(".pageA .ezTitle").addClass("tran1");
            $(".pageA .ezlogo img").addClass("tranlogo");
            $(".pageB").addClass("tran1_1");
            $(".pageA .tranlogo").on("webkitTransitionEnd",function(){
               
                $(".loadcar").addClass("twocar");
                $(".pageB").addClass("tran2");
            });

            // $(".pageB .lamp").on("webkitAnimationEnd", function () {
            //     $(".pageA").fadeOut(300);
            //     $(".pageB").fadeOut(300);
            //     $(".pageC").fadeIn("slow");
            // });

          
        });
        $(".pageC .op2").on("webkitAnimationEnd", function () {
            $(".pageC .curve").css("width", 0);
            $(".pageC .pgc").fadeOut(300);
            $(".pageC").addClass("tran3");
           
        });

    }
}