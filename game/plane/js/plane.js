var Plane = Class.extend({
	init : function(){
		this.image = game.R['chuan2'];
		this.baozha = game.R["chuanbaozha"];
		this.w = 60;
		this.h = 76;
		this.x = (game.width - 60) / 2;
		this.y = game.height - 100;
		// 是否爆炸
		this.baozha = "F";
		// this.die = "F";

	},
	update : function(){
		var self = this;
		game.canvas.onmousemove = function(event){
			// console.log(event.offsetX,event.offsetY);
			self.x = event.offsetX;
			self.y = event.offsetY;
		}
		// 碰撞盒子
		this.x1 = (this.x - this.w / 2) + 35;
		this.x2 = (this.x - this.w / 2) + this.w + 25;
		this.y1 = (this.y - this.h / 2);
		this.y2 = (this.y - this.h / 2) + 70;
		
	},
	render : function(){
		// game.ctx.fillText(this.x1, this.x - 40, (this.y - this.h / 2) + 20);
		// game.ctx.fillText(this.x2, this.x + 30, (this.y - this.h / 2) + 20);
		// game.ctx.fillText(this.y1, this.x , (this.y - this.h / 2) );
		// game.ctx.fillText(this.y2, this.x , (this.y - this.h / 2) + 80);
		if(this.baozha == "T"){
			// game.ctx.drawImage(this.image , (this.x - this.w / 2) ,(this.y - this.h / 2), this.w , this.h);
			game.ctx.drawImage(game.R["chuanbaozha"] , (this.x - this.w / 2) ,(this.y - this.h / 2), this.w , this.h);
			// 声音播放
			document.getElementById("gameover").load();
			document.getElementById("gameover").play();
			
			document.getElementById("bgm").pause();
			alert("GAME OVER 分数：" + game.score);
			// GAME OVER回到第一场景
			game.sm.changeScene(1);
			game.score = 0;
		
		}else{
			// alert("message")
			game.ctx.drawImage(this.image , (this.x - this.w / 2) ,(this.y - this.h / 2), this.w , this.h);
			// game.ctx.drawImage(this.baozha , (this.x - this.w / 2) ,(this.y - this.h / 2), this.w , this.h);
			// clearInterval(game.timer);
		}
		
	}
})