var Dan = Class.extend({
	init : function(){
		// 子弹样式数组
		this.image = [game.R["zidan8"] , game.R["zidan7"] , game.R["zidan9"] , game.R["zidan11"] , game.R["zidan4"] , game.R["zidan5"] , game.R["zidan12"] ];
		this.w = 22;
		this.h = 15;
		this.x = game.sm.pl.x;
		this.y = game.sm.pl.y;
		game.sm.dan.push(this);
		// 累加器
		this.sum = 0;
		// 子弹音效
		document.getElementById("zidan").load();
		document.getElementById("zidan").play();

	},
	update : function(){
		this.y -= 5;

		// 碰撞盒子
		this.x1 = this.x - 2;
		this.x2 = this.x - 2 + 7;
		this.y1 = this.y - 45;
		this.y2 = this.y - 45 + 13;


		// 所有敌机碰撞判断
		for(var i = 0 ; i < game.sm.diji.length ; i++){
			// console.log(i)
			// console.log(game.diji[i].x1 , game.diji[i].x2 , game.diji[i].y1 , game.diji[i].y2);
			// console.log(this.x)
			// console.log((this.y1 < game.diji[i].y2),(this.y2 > game.diji[i].y1),(this.x1 > game.diji[i].x),  (this.x1  < game.diji[i].x + 7))
			if((this.y1 < game.sm.diji[i].y2) && (this.y2 > game.sm.diji[i].y1) && (this.x1 > (game.sm.diji[i].x - 22) ) && (this.x1  < game.sm.diji[i].x + 45)){
		
				// 分数
				game.score += 100;
				// 爆炸音效
				document.getElementById("bbz").load();
				document.getElementById("bbz").play();
				// 设置爆炸属性
				game.sm.diji[i].baozha = "T";
				// 渲染
				game.sm.diji[i].render();
				this.goDie_diji(game.sm.diji[i])
				this.goDie();
			}
		}
		// 中型敌机碰撞
		for(var k = 0 ; k < game.sm.bigdi.length ; k++){


			if((this.y1 < game.sm.bigdi[k].y2) && (this.y2 > game.sm.bigdi[k].y1) && (this.x1 + 30 > game.sm.bigdi[k].x1) && (this.x1  + 20 < game.sm.bigdi[k].x2)){
				// 实验得出的值
				// console.log(this.x1 + 30 , game.bigdi[i].x1);
				// console.log(this.x1  + 20,  game.bigdi[i].x2)
					this.goDie();
					// 这里
					game.sum ++;
					if(game.sum >=  7){
						game.sum = 0;


						game.score += 300;
						document.getElementById("bbz").load();
						document.getElementById("bbz").play();
						// 带T渲染
						game.sm.bigdi[k].baozha = "T";
						game.sm.bigdi[k].render();
						// 敌机狗带
						this.goDie_bigdi(game.sm.bigdi[k]);
						// 子弹狗带
						this.goDie()
					}
			}

		}
		// 大飞机碰撞
		for(var j = 0 ; j < game.sm.boss.length ; j++){

			if((this.y1 < game.sm.boss[j].y2) && (this.y2 > game.sm.boss[j].y1) && (this.x1 + 30 > game.sm.boss[j].x1) && (this.x1  + 20 < game.sm.boss[j].x2)){
				// 实验得出的值
				// console.log(this.x1 + 30 , game.bigdi[i].x1);
				// console.log(this.x1  + 20,  game.bigdi[i].x2)
					this.goDie();
					// 这里
					game.sum2 ++;
					if(game.sum2 >=  12){
						game.sum2 = 0;
						game.score += 600;
						document.getElementById("bbz").load();
						document.getElementById("bbz").play();
						// 带T渲染
						game.sm.boss[j].baozha = "T";
						game.sm.boss[j].render();
						// 敌机狗带
						this.goDie_boss(game.sm.boss[j]);
						// 子弹狗带
						this.goDie()
					}
			}

		}

		if(this.y <= 0){
			this.goDie();
		}
	},
	// 子弹渲染
	render : function(){
	
		game.ctx.drawImage(this.image[game.sm.dan_style] , this.x -8  ,this.y - 45 , this.w , this.h);
		
	},
	// 子弹狗带
	goDie : function(){
		game.sm.dan = _.without(game.sm.dan , this);
	},
	// 小敌机狗带
	goDie_diji : function(o){
		game.sm.diji = _.without(game.sm.diji , o);
	},
	// 中敌机狗带
	goDie_bigdi : function(o){
		game.sm.bigdi = _.without(game.sm.bigdi , o);
	},
	// 超大飞机狗带
	goDie_boss : function(o){
		game.sm.boss = _.without(game.sm.boss , o);
	}
})