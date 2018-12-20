var Pipe = Class.extend({
	init : function(){
		this.image1 = game.R["pipe_down"];
		this.image2 = game.R["pipe_up"];

		//上面的管子的高度（因）
		this.height1 = _.random(50,360);
		//上下管子的间隔（因）
		this.distance = 170;
		//下面管子的高度随之而定了（果）
		this.height2 = game.height - 112 - this.distance - this.height1;
		//位置
		this.x = game.width;

		game.sm.pipes.push(this);
	},
	update : function(){
		this.x -= 5;

		//包围盒
		this.x1 = this.x;
		this.x2 = this.x + 52;
		this.y1 = this.height1;
		this.y2 = this.height1 + this.distance;
		

		//碰撞检测
		if(game.sm.bird.x2 > this.x1 && game.sm.bird.x1 <this.x2 && (game.sm.bird.y1 < this.y1 || game.sm.bird.y2 > this.y2)){
			game.sm.changeScene(4);
			return;
		}

		if(this.x < -52){
			this.goDie();
		}
	},
	render : function(){
		//渲染上面的管子，这里的8个数字参数自己体会一下
		game.ctx.drawImage(this.image1 , 0 , 400 - this.height1 , 52 , this.height1 , this.x , 0 , 52 , this.height1);
		//渲染下面的管子，这里的8个数字参数自己体会一下
		game.ctx.drawImage(this.image2 , 0 , 0 , 52 , this.height2 , this.x , this.height1 + this.distance , 52 , this.height2);
		
		//为了方便测试，这里显示数值
		game.ctx.fillStyle = "black";
		// game.ctx.fillText(this.x1 , this.x - 30, this.height1 + this.distance / 2);
		// game.ctx.fillText(this.x2 , this.x + 60, this.height1 + this.distance / 2);
		// game.ctx.fillText(this.y1 , this.x , this.height1 + 10);
		// game.ctx.fillText(this.y2 , this.x , this.height1 + this.distance);
	},
	goDie : function(){
		game.pipes = _.without(game.pipes , this);
	}
});