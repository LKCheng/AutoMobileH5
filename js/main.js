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
        });
    }
}