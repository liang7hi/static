var Game = Class.extend({
	//构造函数
	init : function(){
		//得到画布
		this.canvas = document.getElementById("canvas");
		//画布的宽高
		this.width = 414;
		this.height = 650;
		//反设回去宽度、高度。注意这里不是.style = ... + "px"
		//因为我们知道canvas标签不能将width和height写在CSS中
		//应该写在标签身上，没有单位！！！！
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		//显示canvas
		this.canvas.style.display = "block";
		//上下文
		this.ctx = this.canvas.getContext("2d");
		
		//资源对象
		this.R = {
			"bg_day" 	: "images/bg_day.png"	, 
			"bg_night" 	: "images/bg_night.png"	,
			"bird0_0" 	: "images/bird0_0.png"	,
			"bird0_1" 	: "images/bird0_1.png"	,
			"bird0_2" 	: "images/bird0_2.png"	,
			"land"		: "images/land.png",
			"pipe_down" : "images/pipe_down.png",
			"pipe_up"   : "images/pipe_up.png" ,
			"title"   : "images/title.png",
			"button_play"   : "images/button_play.png",
			"tutorial"   : "images/tutorial.png" ,
			"gameoverbg"   : "images/gameoverbg.png" ,
			"b0" : "images/b0.png",
			"b1" : "images/b1.png",
			"b2" : "images/b2.png",
			"b3" : "images/b3.png",
			"b4" : "images/b4.png",
			"b5" : "images/b5.png",
			"b6" : "images/b6.png",
			"b7" : "images/b7.png",
			"b8" : "images/b8.png",
			"b9" : "images/b9.png",
			"b10" : "images/b10.png",
			"b11" : "images/b11.png"
		};
		//加载资源
		var self = this;
		this.loadResources(function(){
			//回调函数表示所有的图片资源已经加载完毕了
			self.start();
		});
	},
	loadResources : function(callback){
		//已经加载完毕的图片的个数
		var count = 0;
		//图片的总数，使用了ES6的语法。
		var length = Object.keys(this.R).length;
		//遍历R对象中的所有属性
		for(var k in this.R){
			//发出请求
			var image = new Image();
			image.src = this.R[k];
			//改写R对象的属性，把字符串变为真的image对象
			this.R[k] = image;
			//备份
			var self = this;
			//当图片加载完毕
			image.onload = function(){
				//计数器加1
				count++;
				//清屏
				self.clear();
				//提示用户
				self.ctx.font = "20px 微软雅黑";
				self.ctx.textAlign = "center";
				self.ctx.fillText("正在加载图片" + count + "/" + length + "... 请稍后" , self.width / 2 , 100);
				//当已经加载完毕的图片个数等于了总数，此时调用回调函数
				if(count === length){
					callback();
				}
			}
		}
	},
	//清屏方法
	clear : function(){
		this.ctx.clearRect(0 , 0 , this.width , this.height);
	},
	//游戏开始
	start : function(){
		//主循环
		var self = this;
		//设置一个帧编号
		this.f = 0 ;

		//实例化自己的场景管理器
		this.sm = new SceneManager();

		//主循环
		this.timer = setInterval(function(){
			//清屏
			self.clear();
			//帧编号加1
			self.f++;

			//更新并且渲染自己的场景管理器
			self.sm.updateandrender();

			//显示帧编号
			self.ctx.fillStyle = "#333";
			self.ctx.textAlign = "left";
			self.ctx.font = "16px consolas";
			self.ctx.fillText(self.f , 10 , 20);
			//显示场景编号
			self.ctx.fillText(self.sm.scenenumber , 10 , 40);
		},20);
	}
});