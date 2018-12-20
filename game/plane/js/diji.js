var Diji = Class.extend({
	init : function(){
		// 组图
		this.images = [game.R["diji2"],game.R["baozha1"],game.R["baozha2"],game.R["baozha3"],game.R["baozha4"]];
		// 爆炸图片
		this,baozha_i = game.R["baozha2_gif"];
		this.h = 32;
		// 在地图上的位置
		this.x = _.random(25,(game.width - 30));
		this.y =  -this.h;
		// 判断是否被击中 被击中变成T
		this.baozha = "F";
		game.sm.diji.push(this);
	},
	update : function(){
		if(this.baozha == "F"){
			this.y += 5;
			// 敌机被击中判断
		}else{
			return;
		}
		
		// 碰撞盒子
		// console.log(this.x,this.y)
		this.x1 = this.x;
		this.x2 = this.x + 45;
		// console.log("敌机x1 ,x2 "+ this.x1,this.x2)
		this.y1 = this.y;
		this.y2 = this.y + 32;
		// console.log(this.x1,this.x2,this.y1,this.y2)

		if(this.y > 600){
			this.goDie();
		}
		// 飞船敌机碰撞
		// console.log(game.pl.y1 , game.pl.y2 , game.pl.x1 , game.pl.x2);
		// console.log(game.pl.y1 < this.y2 , game.pl.y2 > this.y1 , this.x1 > game.pl.x1 , this.x2 < game.pl.x2)
		// if(game.pl.y1 < this.y2 && game.pl.y2 > this.y1 && this.x1 > game.pl.x1 && this.x2 < game.pl.x2){
		// 	game.pl.baozha = "T";
		if( game.sm.pl.y1 < this.y2  && game.sm.pl.y2 > this.y1){
			// game.pl.baozha = "T";
			// alert("1")
			if(this.x1 < game.sm.pl.x2 && this.x2 > game.sm.pl.x1){
				game.sm.pl.baozha = "T";
			}
			// if(this.x1 < game.pl.x2 || this.x2 > game.pl.x1){
			// 	alert("2");
			// }
			
			// clearInterval(game.timer)
			// alert("nisi le ")
			// game.pl.baozha = "T";
		}
	},
	render : function(){
		// if(game.baozha = "F"){
			for (var i = 0; i < game.sm.diji.length; i++) {
				if(game.sm.diji[i].baozha != "T" ){
					game.ctx.drawImage(this.images[0],  (this.x - 22), this.y);
				}else{
					game.ctx.drawImage(this.images[3],  (this.x - 26), this.y - 2);
				}
			};
		// game.ctx.fillText(this.x1, this.x1 - 40, this.y1);
		// game.ctx.fillText(this.x2, this.x1 + 40, this.y1);
		// game.ctx.fillText(this.y1, this.x1, this.y1 -10);
		// game.ctx.fillText(this.y2, this.x1, this.y1 + 50);
		// }else{
		// 	game.ctx.drawImage(this.images[0],  (this.x - 22), this.y);
		// }
		
		// game.ctx.drawImage(this.image,  0 , this.y - 600);
	},
	// baozha_render : function(){
	// 	game.ctx.drawImage(this.images[1],  (this.x - 22), this.y);
	// }
	goDie : function(){
		// 从数组中删除
		// console.log(o)
		game.sm.diji = _.without(game.sm.diji , this);
	}
	});
	
