var SceneManager = Class.extend({
	init : function(){
		this.scenenumber = 1;	 

		//进入场景1
		this.changeScene(1);

		//绑定监听
		this.bindEvent();
	},
	//不管你什么时候来到这个场景，此时都有一个默认的就位状态
	//我们动画是可以重复的
	// 这个函数不是每帧执行的。
	changeScene : function(number){
		this.scenenumber = number;	 
		switch(this.scenenumber){
			case 1 : 
			 	//title的位置
			 	this.titleY = -48;
			 	//title要停留的位置
			 	this.titleYtarget = 160;
			 	//按钮的位置
			 	this.buttonY = game.height;
			 	//按钮要停留的位置
			 	this.buttonYtarget = 360;
			 	//小鸟的位置
			 	this.birdY = 210;
			 	//小鸟的运动方向
			 	this.birdDirection = "DOWN";
				break;
			case 2 : 
				//教程透明度
				this.tutorialOpacity = 1;
				//教程透明度的方向
				this.tutorialDirection = "DOWN";
				break;
			case 3 :
				this.bird = new Bird();
				this.bg = new Background();
				this.land = new Land();
				this.pipes = [];
				break;
			case 4:
				//红色边框的图片的透明度
				this.bgopacity = 1;
				//爆炸序号
				this.bombNumber = 0;

		}
	},
	//updateandrender在定时器中每帧执行！！
	updateandrender : function(){
		switch(this.scenenumber){
			case 1 : 
				//渲染背景
				game.ctx.fillStyle = "#4ec0ca";
				game.ctx.fillRect(0 , 0 , game.width , game.height - 512);
				game.ctx.drawImage(game.R["bg_day"] , 0 , game.height - 512);
				game.ctx.drawImage(game.R["bg_day"] , 288 , game.height - 512);

				//title下降
				this.titleY += 6;
				if(this.titleY > this.titleYtarget){
					this.titleY = this.titleYtarget;
				}
				game.ctx.drawImage(game.R["title"] , (game.width - 178) / 2 , this.titleY);

				//按钮的上升
				this.buttonY -= 8;
				if(this.buttonY < this.buttonYtarget){
					this.buttonY = this.buttonYtarget;
				}

				game.ctx.drawImage(game.R["button_play"] , (game.width - 116) / 2 , this.buttonY);

				//渲染小鸟
				if(this.birdDirection == "DOWN"){
					this.birdY += 2;
					if(this.birdY > 280){
						this.birdDirection = "UP";
					}
					game.ctx.drawImage(game.R["bird0_0"] , (game.width - 48) / 2 , this.birdY);
				}else{
					this.birdY -= 2;
					if(this.birdY < 210){
						this.birdDirection = "DOWN";
					}
					game.ctx.drawImage(game.R["bird0_0"] , (game.width - 48) / 2 , this.birdY);
				}
				break;
			case 2 :
				//渲染背景
				game.ctx.fillStyle = "#4ec0ca";
				game.ctx.fillRect(0 , 0 , game.width , game.height - 512);
				game.ctx.drawImage(game.R["bg_day"] , 0 , game.height - 512);
				game.ctx.drawImage(game.R["bg_day"] , 288 , game.height - 512);

				//渲染小鸟
				game.ctx.drawImage(game.R["bird0_0"] , (game.width - 48) / 2 , 120);

				//渲染教程
				if(this.tutorialDirection == "DOWN"){
					this.tutorialOpacity -= 0.1;
					if(this.tutorialOpacity < 0){
						this.tutorialOpacity = 0;
						this.tutorialDirection = "UP";
					}
				}else{
					this.tutorialOpacity += 0.1;
					if(this.tutorialOpacity > 1){
						this.tutorialOpacity = 1;
						this.tutorialDirection = "DOWN";
					}
				}

				game.ctx.save();
				game.ctx.globalAlpha = this.tutorialOpacity;
				game.ctx.drawImage(game.R["tutorial"] , (game.width - 114) / 2 , 280);
				game.ctx.restore();
				break;
			case 3 : 
				this.bg.update();
				this.bg.render();

				this.land.update();
				this.land.render();

				this.bird.update();
				this.bird.render();

				if(game.f % 70 == 0) new Pipe();

				for(var i = 0 ; i < this.pipes.length ; i++){
					this.pipes[i].update();
					this.pipes[i].render();
				}
				break;
			case 4: 
				//世界变静。只渲染不更新。
				this.bg.render();
				this.land.render();
				
				if(this.bird.y > game.height - 112){
					//鸟已经落入黄土了
					//渲染爆炸动画
					if(game.f % 2 == 0) this.bombNumber ++;
					if(this.bombNumber == 11){
						this.changeScene(1)
					}
					game.ctx.drawImage(game.R["b" + this.bombNumber] , game.width / 2 * 0.618 - 30 , this.bird.y - 100); 
				}else{
					this.bird.y+=10;
					this.bird.render();
				}
				

				//渲染所有管子
				for(var i = 0 ; i < this.pipes.length ; i++){
					this.pipes[i].render();
				}

				//渲染红色边框图片
				this.bgopacity-=0.03;
				if(this.bgopacity < 0){
					 this.bgopacity = 0;
				}
				game.ctx.save();
				game.ctx.globalAlpha = this.bgopacity;
				game.ctx.drawImage(game.R["gameoverbg"] , 0 , 0 , game.width , game.height);
				game.ctx.restore();
				break;

		}
	},
	//绑定监听
	bindEvent : function(){
		var self = this;
		game.canvas.onmousedown = function(event){
			var x = event.offsetX;
			var y = event.offsetY;

			switch(self.scenenumber){
				case 1 : 
					if(x >= (game.width - 116) / 2 && x <= (game.width + 116) / 2 && y >= self.buttonY && y <= self.buttonY + 70){
						self.changeScene(2);
					}
					break;
				case 2 :
					self.changeScene(3);
					break;
				case 3 : 
					self.bird.fly();
			}
		}
	}
});