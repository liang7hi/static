var SceneManager = Class.extend({
	init : function(){
		// 当前场景数
		
		// 改变 运行场景函数
		this.scenenumber = 1;
		this.changeScene(1);
		// 监听来改变场景号
		this.bindEvent();
		// 是否死亡判断
		this.die = "F";
		// alert("message")
	},
	// 来判断和更改场景 不在主循环里
	changeScene : function(number){
		this.scenenumber = number;
		// console.log(number);
		console.log(this.scenenumber)

		if(this.scenenumber == 1){
			// alert("1")
				// alert("message");
				this.titleY = -147;
				this.titleYtarget = 100;
				this.buttonY = game.height;
				this.buttonYtarget = 400;
		}else if(this.scenenumber == 2){
			// alert("1111message")
				// alert("message")
				this.bg = new Bg();
				this.pl = new Plane();
				this.dan = [];
				// console.log(this.dan);
				this.diji = [];
				// 大敌机
				this.bigdi = [];
				// boss 厉害
				this.boss = [];
				this.dan_style = 0;
			}
	},
	// 每次更新渲染 主循环
	updateandrender : function(){

		// console.log(this.scenenumber);

		if(this.scenenumber == 1){
			// 场景1的渲染
			game.ctx.drawImage(game.R["bg4"] , 0 , 0);
			this.titleY += 6;
			// title下落
			if(this.titleY > this.titleYtarget){
				this.titleY = this.titleYtarget;
			}
			game.ctx.drawImage(game.R["title"] , (game.width - 280) / 2 , this.titleY);
			// button的上升
			this.buttonY -= 8;
			if(this.buttonY < this.buttonYtarget){
				this.buttonY = this.buttonYtarget;
			}

			game.ctx.drawImage(game.R["button"] , (game.width - 190) / 2 , this.buttonY);
		}
		else if(this.scenenumber == 2){
			// alert("2");
			// 渲染背景

			this.bg.update();
			this.bg.render();
			// 飞船
			this.pl.update();
			this.pl.render();
			// 敌机和子弹实例化速度
			if(game.score < 2000){
				this.dan_style = 0;
				if(game.f % 15 == 0){
					new Dan();
				}
				if(game.f % 30 == 0){
					new Diji();
				}
				if(game.f % 300 == 0){
					new Bigdi();
				}
				if(game.f % 1000 == 0){
					new Boss();
				}

			}else if(game.score < 4000){
				this.dan_style = 1;
				if(game.f % 10 == 0){
					new Dan();
				}
				if(game.f % 20 == 0){
					new Diji();
				}
				if(game.f % 120 == 0){
					new Bigdi();
				}
				if(game.f % 400 == 0){
					new Boss();
				}

			}else if(game.score < 8000){
				this.dan_style = 2;
				if(game.f % 8 == 0){
					new Dan();
				}
				if(game.f % 15 == 0){
					new Diji();
				}
				if(game.f % 50 == 0){
					new Bigdi();
				}
				if(game.f % 300 == 0){
					new Boss();
				}

			}
			else if(game.score < 18000){
				this.dan_style = 3;
				if(game.f % 5 == 0){
					new Dan();
				}
				if(game.f % 10 == 0){
					new Diji();
				}
				if(game.f % 120 == 0){
					new Boss();
				}

			}
			else if(game.score < 35000){
				this.dan_style = 4;
				if(game.f % 3 == 0){
					new Dan();
				}
				if(game.f % 8 == 0){
					new Diji();
				}
				if(game.f % 25 == 0){
					new Bigdi();
				}
				if(game.f % 80 == 0){
					new Boss();
				}

			}
			else if(game.score < 50000){
				this.dan_style = 5;
				if(game.f % 2 == 0){
					new Dan();
				}
				if(game.f % 5 == 0){
					new Diji();
				}
				if(game.f % 15 == 0){
					new Bigdi();
				}
				if(game.f % 50 == 0){
					new Boss();
				}

			}else if(game.score < 70000){
				this.dan_style = 6;
				if(game.f % 1 == 0){
					new Dan();
				}
				if(game.f % 3 == 0){
					new Diji();
				}
				if(game.f % 10 == 0){
					new Bigdi();
				}
				if(game.f % 35 == 0){
					new Boss();
				}

			}
			else if(game.score > 70000){
				this.dan_style = 6;
				if(game.f % 1 == 0){
					new Dan();
				}
				if(game.f % 2 == 0){
					new Diji();
				}
				if(game.f % 10 == 0){
					new Bigdi();
				}
				if(game.f % 20 == 0){
					new Boss();
				}
			}
				// 子弹
				for(var i = 0 ; i < this.dan.length ; i++){
					// console.log(1)
					// 每项更新
					this.dan[i].update();
					this.dan[i] && this.dan[i].render();
				}

				// 敌机
				for(var i = 0 ; i < this.diji.length ; i++){
					this.diji[i].update();
					this.diji[i] && this.diji[i].render();
				}

				// 大敌机
				for(var i = 0 ; i < this.bigdi.length ; i++){
					// 每项更新
					// if(game.diji)
					this.bigdi[i].update();
					this.bigdi[i] && this.bigdi[i].render();
				}

				// boss机
				for(var i = 0 ; i < this.boss.length ; i++){
					// 每项更新
					// if(game.diji)
					this.boss[i].update();
					this.boss[i] && this.boss[i].render();
				}	
			game.ctx.fillText("帧编：" + game.f , 10 , 20);
			// 字体颜色
			game.ctx.fillStyle = "yellowgreen";
			game.ctx.fillText("分数：" + game.score , 10 , 50);
		}
	},

	bindEvent : function(){
		var self = this; 
		game.canvas.onmousedown = function(event){
			var x = event.offsetX;
			var y = event.offsetY;
			if(self.scenenumber == 1){
				if(x >= (game.width - 190) / 2 && x <= (game.width + 190) / 2 && y >= self.buttonY && y <= self.buttonY + 38){
					self.changeScene(2);
					document.getElementById("zhuanchang").load();
					document.getElementById("zhuanchang").play();
					document.getElementById("bgm").load();
					document.getElementById("bgm").play();
					document.getElementById("bgm").loop = true;
				}
			}
		}	
	}	
})