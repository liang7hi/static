var Boss = Class.extend({
	init : function(){
		this.image = game.R["boss"];
		this.baozha = game.R["boss_baozha"];
		this.w = 165;
		this.h = 246;
		// 在地图上的位置
		this.x = _.random(90,(game.width - 80));
		this.y =  - this.h;
		// // 判断是否被击中 被击中变成T
		this.baozha = "F";
		game.sm.boss.push(this);
	},
	update : function(){
		if(this.baozha == "F"){
			this.y += 1;
			// 敌机被击中判断
		}else{
			return;
		}
		// 碰撞盒子
		this.x1 = this.x - this.w / 2 + 30;
		this.x2 = this.x + this.w - 20;
		this.y1 = this.y -20 + 45;
		this.y2 = this.y + this.h - 30;


		if(this.y > 600){
			this.goDie();
		}
	
		if( game.sm.pl.y1 < this.y2  && game.sm.pl.y2 > this.y1){
			// game.pl.baozha = "T";
			// alert("1")
			// game.pl.baozha = "T";
			if(this.x1 < game.sm.pl.x2 && this.x2 > game.sm.pl.x1){
				game.sm.pl.baozha = "T";
			}
			// console.log(this.x1 < game.pl.x2,this.x2 > game.pl.x1);
			// if(this.x1 < game.pl.x2 && this.x2 > game.pl.x1){
			// 	game.pl.baozha = "T";
			// }
		}
	},
	render : function(){
		// if(game.baozha = "F"){
			for (var i = 0; i < game.sm.boss.length; i++) {
				if(game.sm.boss[i].baozha != "T" ){
					game.ctx.drawImage(this.image,  (this.x - this.w / 2), this.y);
				}else{
					game.ctx.drawImage(game.R["boss_baozha"],  (this.x - this.w / 2), this.y);
				}
			};
		// game.ctx.fillText(this.x1, this.x1 - 40 - 30, this.y1 + 50 - 20);
		// game.ctx.fillText(this.x2, this.x1 + 80 - 30, this.y1 + 50 - 20);
		// game.ctx.fillText(this.y1, this.x1 , this.y1 - 30);
		// game.ctx.fillText(this.y2, this.x1 , this.y1 + 80);
	},
	goDie : function(){
		game.sm.boss = _.without(game.sm.boss , this);
	}
	});
