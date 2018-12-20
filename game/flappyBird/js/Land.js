var Land = Class.extend({
	init : function(){
		this.image = game.R["land"];
		//x坐标
		this.x = 0;
	},
	//更新
	update : function(){
		this.x -= 2;
		if(this.x < -336){
			this.x = 0 ;
		}
	},
	//渲染
	render : function(){
		//API不值钱，算法为王！
		//336、112是图片的宽度、高度
		game.ctx.drawImage(this.image , this.x , game.height - 112);
		game.ctx.drawImage(this.image , this.x + 336 , game.height - 112);
		game.ctx.drawImage(this.image , this.x + 336 * 2 , game.height - 112);
	}
});