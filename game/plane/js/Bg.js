var Bg = Class.extend({
	init : function(){
		this.image = [game.R["bg2"],game.R["bg3"],game.R["bg4"]];
		// 变化的位置Y
		this.y = 0;
	},
	update : function(){
		this.y+=5;
		if(this.y > 600){
			this.y = 0;
		}
	},
	render : function(){
		
		game.ctx.drawImage(this.image[0],  0 , this.y);
		game.ctx.drawImage(this.image[0],  0 , this.y - 600);
		if(game.score > 3000 && game.score < 7000){
			game.ctx.drawImage(this.image[1],  0 , this.y);
			game.ctx.drawImage(this.image[1],  0 , this.y - 600);
			game.ctx.drawImage(this.image[1],  0 , this.y - 1200);
		}else if(game.score >= 7000){
			game.ctx.drawImage(this.image[2],  0 , this.y);
			game.ctx.drawImage(this.image[2],  0 , this.y - 600);
			game.ctx.drawImage(this.image[2],  0 , this.y - 1200);
		}
	}
})