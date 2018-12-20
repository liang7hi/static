var Game = Class.extend({
	init : function(){
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.width = 350;
		this.height = 600;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		// 打击次数累加器
		// 重型飞机
		this.sum = 0;
		// 超大飞机
		this.sum2 = 0;
		// 分数
		this.score = 0;

		// 资源对象
		this.R = {
			"bg" 		:	"image/bg.png",
			"bg2" 		:	"image/bg2.png",
			"chuan"		:	"image/chuan.png",
			"chuan2"	:	"image/chuan2.png",
			"diji" 		:	"image/diji.png",
			"diji2" 	:	"image/diji2.png",
			"zidan" 	:	"image/zidan.png",
			"zidan2" 	:	"image/zidan2.png",
			"zidan3" 	:	"image/zidan3.png",
			"boss" 		:	"image/boss.png",
			"baozha1" 		:	"image/baozha1.png",
			"baozha2" 		:	"image/baozha2.png",
			"baozha3" 		:	"image/baozha3.png",
			"baozha4" 		:	"image/baozha4.png",
			"baozha2_gif"	:  "image/baozha2_gif.gif",
			"chuanbaozha"	:  "image/chuanbaozha.png",
			"diji3"			:  "image/diji3.png",
			"diji3_baozha"	:  "image/diji3_baozha.png",
			"boss_baozha"	:  "image/boss_baozha.png",
			"title"			:  "image/title.png",
			"button"			:  "image/button.png",
			"gameover"			:  "image/gameover.png",

			"bg4"			:  "image/bg4.png",
			"bg3"			:  "image/bg3.png",
			// 子弹数组
			"zidan4"			:  "image/zidan4.png",
			"zidan5"			:  "image/zidan5.png",
			"zidan6"			:  "image/zidan6.png",
			"zidan7"			:  "image/zidan7.png",
			"zidan8"			:  "image/zidan8.png",
			"zidan9"			:  "image/zidan9.png",
			"zidan10"			:  "image/zidan10.png",
			"zidan11"			:  "image/zidan11.png",
			"zidan12"			:  "image/zidan12.png",
			// // body背景
			// "body_bg1"			:  "image/body_bg1.png",
			// "body_bg2"			:  "image/body_bg2.png",
			// "body_bg3"			:  "image/body_bg3.png"
		};
		// 加载
		var self = this;
		this.jiazai(function(){
			// 加载完成开始
			self.start()
		});
		// 等待鼠标移动添加监听
	},
	jiazai : function(callback){
		var count = 0;
		var length = Object.keys(this.R).length;

		// 开始加载
		for(var k in this.R){
			var image = new Image();
			image.src = this.R[k];
			this.R[k] = image;
			// 全部加载完成回调函数

			var self = this;
			image.onload = function(){
				count++;
				self.clear();
				self.ctx.fillText("正在加载图片 " + count + "/" + length, 100 ,100);
				
				if(count == length){
					self.clear();
					
					callback();
				}
			}

		}

	},
	clear : function(){
		this.ctx.clearRect(0, 0, 350, 600);
	},
	start : function(){

		var self = this;
		this.f = 0;
		this.sm = new SceneManager();
		
		this.timer = setInterval(function(){
			// 根据分数才决定实例化的速度
			self.f++;
			//更新并且渲染自己的场景管理器
			self.sm.updateandrender();
		
		},20)
	}
})