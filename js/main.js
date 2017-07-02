(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth; //clientHeight
            // var clientHeight = docEl.clientHeight;
            //   console.log(2);
            if (clientWidth > 640) {
                clientWidth = 640;
            }

            docEl.style.fontSize = 100 * (clientWidth / 1000) + 'px';
            // var scale =  clientHeight/clientWidth;
            // if(scale<0.54){
            //     docEl.style.fontSize = 54 + 'px';
            // }else{

            // }
            // if(clientWidth>1000){clientWidth=1000}

        };
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


// window.onload = function() {

// };


var EZ = {
    stop: 1,
    Init: function() {
        this.EventHandler() //事件处理函数
    },
    EventHandler: function() {
        //前3页
        var that = this;

        $(".loadnum").click(function() {
            $(".pageA .ezTitle").addClass("tran1");
            $(".pageA .ezlogo img").addClass("tranlogo");
            $(".pageB").addClass("tran1_1");
            $(".pageA .tranlogo").on("webkitTransitionEnd", function() {
                $(".loadcar").addClass("twocar");
                $(".pageB").addClass("tran2");
            });
            $(".pageB .lamp").on("webkitAnimationEnd", function() {
                $(".pageA").fadeOut(300);
                $(".pageB").fadeOut(300);
                $(".pageC").fadeIn("slow");
            });

        });
        $(".pageC .op2").on("webkitAnimationEnd", function() {
            $(".pageC .curve").css("width", 0);
            $(".pageC .pgc").delay(600).fadeOut(300);
            $(".pageC").delay(600).addClass("tran3");
        });

        $(".pageC .mus1").on("webkitAnimationEnd", function() {
            $(".pageC").fadeOut(300);
            $(".pageD").fadeIn("slow");

        });


        $(".pageD .op2").on("webkitAnimationEnd", function() {
            that.CanvasDrop().init({
                id: "canvas",
                type: "rain", // drop类型，有rain or snow
                speed: [0.4, 1.5], //速度范围
                size_range: [0.5, 1.5], //大小半径范围
                hasBounce: false, //是否有反弹效果or false,
                wind_direction: -105, //角度
                hasGravity: true, //是否有重力考虑
                maxNum: 40,
                numLevel: 1
            });

            $(".pageD .pgd").delay(600).fadeOut(300);
            $(".pageD").delay(600).addClass("tran4");
        });

        $(".pageD .mus1").on("webkitAnimationEnd", function() {
            $(".pageD").delay(300).fadeOut(300);
            $(".pageE").delay(300).fadeIn("slow");
            $("#canvas").remove();
            that.stop = 0;
        });

        $(".pageE .op2").on("webkitAnimationEnd", function() {
            that.stop = 1;
            that.CanvasDrop().init({
                id: "canvas2",
                type: "snow", // drop类型，有rain or snow
                speed: [0.4, 1.5], //速度范围
                size_range: [0.5, 1.5], //大小半径范围
                hasBounce: false, //是否有反弹效果or false,
                wind_direction: -105, //角度
                hasGravity: true, //是否有重力考虑
                maxNum: 40,
                numLevel: 1
            });

            $(".pageE .pge").delay(600).fadeOut(300);
            $(".pageE").addClass("tran5");
        });

        $(".pageE .mus1").on("webkitAnimationEnd", function() {
            $("#canvas2").remove();
            that.stop = 0;
            $(".pageE").delay(300).fadeOut(300);
            $(".pageF").delay(300).fadeIn("slow");
            // that.BarrageService();
        });

        $(".pageF .seretit").on("webkitAnimationEnd", function() {
            window.clearTimeout();
            that.BarrageService();
            $(".pageF").addClass("tran6");
        });

        $(".pageF .carvix").on("webkitTransitionEnd", function() {
            $(".seretit").hide();
        });
    },

    BarrageService: function() {
        var content = ["精致洗车", "普通洗车", "打蜡", "封釉", "镀膜", "镀晶", "室内清洗", "太阳膜", "电镀膜", "车身透明膜", "车身改色膜", "DVD导航", "汽车音响", "地图升级", "行车记录仪", "倒车影像",
            "底盘装甲", "大能隔音", "汽车精品", "汽车维修", "汽车喷漆", "汽车轮胎", "补胎", "等等......"
        ]
        var count = 1; //每次随机出来的次数
        var nowi = 0; //目前位置
        var time = null;
        var winHeight = $(window).height() - 100;

        function move() {
            if (nowi < content.length) {
                var z_top = Math.random() * winHeight;
                z_top <= 100 ? z_top += 80 : z_top;
                var zlr = parseInt(Math.random() * 2);
                if (zlr) {
                    $("<div class='sertxt active' style='top:" + z_top + "'>" + content[nowi] + "</div>").appendTo($('.pagecon'));
                } else {
                    $("<div class='sertxt active2' style='top:" + z_top + "'>" + content[nowi] + "</div>").appendTo($('.pagecon'));
                }
                nowi++;
            }
            clearTimeout(time);
            time = setTimeout(function() {
                if (nowi < content.length) {
                    move();
                } else {
                    clearTimeout(time);
                }
            }, 500);
        }


        move();

    },

    CanvasDrop: function() {

        var _that = this;

        //定义两个对象数据
        //分别是drops下落物体对象
        //和反弹物体bounces对象
        var drops = [],
            bounces = [];
        //这里设定重力加速度为0.2/一帧
        var gravity = 0.02;

        var speed_x_x, //横向加速度
            speed_x_y, //纵向加速度
            wind_anger; //风向
        //画布的像素宽高
        var canvasWidth,
            canvasHeight;
        //创建drop的几率
        var drop_chance;
        //配置对象
        var OPTS;
        //判断是否有requestAnimationFrame方法，如果有则使用，没有则大约一秒30帧
        window.requestAnimFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 30);
            };


        var Vector = function(x, y) {
            //私有属性  横向速度x ,纵向速度y
            this.x = x || 0;
            this.y = y || 0;
        };
        //公有方法- add : 速度改变函数,根据参数对速度进行增加
        //由于业务需求，考虑的都是下落加速的情况，故没有减速的，后期可拓展
        /*
         * @param v  object || string  
         */
        Vector.prototype.add = function(v) {
            if (v.x != null && v.y != null) {
                this.x += v.x;
                this.y += v.y;
            } else {
                this.x += v;
                this.y += v;
            }
            return this;
        };
        //公有方法- copy : 复制一个vector，来用作保存之前速度节点的记录
        Vector.prototype.copy = function() {
            //返回一个同等速度属性的Vector实例
            return new Vector(this.x, this.y);
        };


        var Drop = function() {
            //随机设置drop的初始坐标 
            //首先随机选择下落对象是从从哪一边
            //  var randomEdge = Math.random() * 2;
            // if (randomEdge > 1) {
            this.pos = new Vector(50 + Math.random() * canvas.width, -80);
            // } else {
            //    this.pos = new Vector(canvas.width, Math.random() * canvas.height);
            // }

            //设置下落元素的大小
            //通过调用的OPTS函数的半径范围进行随机取值
            this.radius = (OPTS.size_range[0] + Math.random() * OPTS.size_range[1]) * DPR;

            //获得drop初始速度
            //通过调用的OPTS函数的速度范围进行随机取值
            this.speed = (OPTS.speed[0] + Math.random() * OPTS.speed[1]) * DPR;

            this.prev = this.pos;
            //将角度乘以 0.017453293 （2PI/360）即可转换为弧度。
            var eachAnger = 0.017453293;
            //获得风向的角度
            wind_anger = OPTS.wind_direction * eachAnger;
            //获得横向加速度 
            speed_x = this.speed * Math.cos(wind_anger);
            //获得纵向加速度
            speed_y = -this.speed * Math.sin(wind_anger);

            //绑定一个速度实例
            this.vel = new Vector(speed_x, speed_y);

        };

        Drop.prototype.update = function() {

            this.prev = this.pos.copy();
            //如果是有重力的情况，则纵向速度进行增加
            if (OPTS.hasGravity) {
                this.vel.y += gravity;
            }
            //
            this.pos.add(this.vel);
        };

        Drop.prototype.draw = function() {

            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            //目前只分为两种情况，一种是rain  即贝塞尔曲线
            if (OPTS.type == "rain") {
                gravity = 0.02;
                ctx.moveTo(this.prev.x, this.prev.y);
                var ax = Math.abs(this.radius * Math.cos(wind_anger));
                var ay = Math.abs(this.radius * Math.sin(wind_anger));
                ctx.bezierCurveTo(this.pos.x + ax, this.pos.y + ay, this.prev.x + ax, this.prev.y + ay, this.pos.x, this.pos.y + 8);
                ctx.stroke();

                //另一种是snow--即圆形     
            } else {
                gravity = 0.01;
                ctx.moveTo(this.pos.x, this.pos.y);
                ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        var Bounce = function(x, y) {

            var dist = Math.random() * 7;
            var angle = Math.PI + Math.random() * Math.PI;

            this.pos = new Vector(x, y);
            this.radius = 0.2 + Math.random() * 0.8;
            this.vel = new Vector(
                Math.cos(angle) * dist,
                Math.sin(angle) * dist
            );
        };

        Bounce.prototype.update = function() {

            this.vel.y += gravity;

            this.vel.x *= 0.95;
            this.vel.y *= 0.95;

            this.pos.add(this.vel);
        };

        Bounce.prototype.draw = function() {
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius * DPR, 0, Math.PI * 2);
            ctx.fill();
        };

        function update() {

            var d = new Date;
            //清理画图
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            var i = drops.length;
            while (i--) {
                var drop = drops[i];
                drop.update();
                //如果drop实例下降到底部，则需要在drops数组中清楚该实例对象
                if (drop.pos.y >= canvas.height) {
                    //如果需要回弹，则在bouncess数组中加入bounce实例
                    if (OPTS.hasBounce) {
                        var n = Math.round(4 + Math.random() * 4);
                        while (n--)
                            bounces.push(new Bounce(drop.pos.x, canvas.height));
                    }
                    //如果drop实例下降到底部，则需要在drops数组中清楚该实例对象
                    drops.splice(i, 1);
                }
                drop.draw();
            }
            //如果需要回弹
            if (OPTS.hasBounce) {
                var i = bounces.length;
                while (i--) {
                    var bounce = bounces[i];
                    bounce.update();
                    bounce.draw();
                    if (bounce.pos.y > canvas.height) bounces.splice(i, 1);
                }
            }
            //每次产生的数量

            if (drops.length < OPTS.maxNum) {

                if (Math.random() < drop_chance) {
                    var i = 0,
                        len = OPTS.numLevel;
                    for (; i < len; i++) {
                        drops.push(new Drop());

                    }
                }

            }
            //不断循环update
            if (_that.stop) {
                requestAnimFrame(update);
            }
            console.log(1);
        }

        function init(opts) {
            OPTS = opts;

            canvas = document.getElementById(opts.id);
            ctx = canvas.getContext("2d");

            ////兼容高清屏幕，canvas画布像素也要相应改变
            DPR = window.devicePixelRatio;
            //canvas画板像素大小， 需兼容高清屏幕，故画板canvas长宽应该乘于DPR
            canvasWidth = $(window).width();
            canvasHeight = $(window).height();


            //设置画板宽高
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            drop_chance = 0.4;
            //设置样式
            setStyle();
            update();

        }

        function setStyle() {
            if (OPTS.type == "rain") {
                ctx.lineWidth = 1 * DPR;

                ctx.strokeStyle = 'rgba(223,223,223,0.6)';
                ctx.fillStyle = 'rgba(223,223,223,0.6)';


            } else {
                ctx.lineWidth = 2 * DPR;
                ctx.strokeStyle = 'rgba(255,255,255,1)';
                ctx.fillStyle = 'rgba(255,255,255,1)';
            }
        }

        return {
            init: init
        };
    }
}