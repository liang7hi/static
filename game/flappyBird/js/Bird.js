var Bird = Class.extend({
	init : function(){
		this.images = [game.R["bird0_0"] , game.R["bird0_1"]  , game.R["bird0_2"]];
		//翅膀的位置
		this.wing = 0;
		//位置，这里的x、y不是小鸟的左上角的位置，而是小鸟的中心点
		this.x = game.width / 2 * 0.618;
		this.y = 100;
		//每帧的恒定变
		this.dy = 0.4;
		//角度
		this.deg = 0;
	},
	update : function(){
		//变化的量也在变，这就是自由落体
		this.dy += 0.5; 
		this.y += this.dy;

		//当y变化的时候（y是小鸟的中心点）
		//此时小鸟的x1、x2、y1、y2四个包围边也会变化
		this.x1 = this.x - 17;
		this.x2 = this.x + 17;
		this.y1 = this.y - 12;
		this.y2 = this.y + 12;

		//每2帧扑打一次翅膀
		game.f % 2 == 0 && this.wing++;
		if(this.wing > 2){
			this.wing = 0;
		}

		//鸟头的慢慢变化
		this.deg += 0.03;
	},
	render : function(){
		//之所以减去24此时是因为x、y是中心点的位置，减去宽度的一半、高度的一半
		game.ctx.save();
		game.ctx.translate(this.x , this.y);
		game.ctx.rotate(this.deg);
		game.ctx.drawImage(this.images[this.wing] , -24 , -24);
		game.ctx.restore();


		//显示小鸟的值
		game.ctx.fillStyle = "black";
		// game.ctx.fillText(this.x1 , this.x - 110 , this.y);
		// game.ctx.fillText(this.x2 , this.x + 40 , this.y);
		// game.ctx.fillText(this.y1 , this.x - 30 , this.y - 30);
		// game.ctx.fillText(this.y2 , this.x - 30, this.y + 30);
	},
	fly : function(){
		//小鸟只要有一个负的dy此时就会立即上飞，因为this.y += 一个数组
		//加的数字如果是负数，此时就是上飞
		//这里的数组会影响蹦的高度
		this.dy = -9;
		//鸟头瞬间向上扬
		this.deg = -0.7;
	}
});