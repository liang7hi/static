var Background = Class.extend({
	init : function(){
		//自己的图片
	 	this.image = game.R["bg_day"];
	 	//x位置
	 	this.x = 0;
	},
	update : function(){
		this.x --;
		//当猫腻背景达到左边线的时候，立刻拉回。就是张敏老师时代的无缝连续滚动。
		if(this.x < -288){
			this.x = 0;
		}
	},
	render : function(){
		//画一个矩形，补充一下天空的颜色
		game.ctx.fillStyle = "#4ec0ca";
		game.ctx.fillRect(0 , 0 , game.width , game.height - 512);
		//绘制背景，288、512分别是图片的宽度和高度。
		//我们这里绘制了三个背景，为的是不穿帮
		game.ctx.drawImage(this.image , this.x ,game.height - 512 );
		game.ctx.drawImage(this.image , this.x + 288 ,game.height - 512 );
		game.ctx.drawImage(this.image , this.x + 288 * 2 ,game.height - 512 );
	}
});