// var Dijidan = Class.extend({
// 	init : function(){
// 		this.image = game.R["zidan5"];
// 		this.w = 7;
// 		this.h = 13;
// 		// 位置
// 		this.x = game.diji.x;
// 		this.y = game.diji.y;

// 		console.log(this.x);
// 		console.log(this.y);
// 		game.Dijidan.push(this);
// 	},
// 	update : function(){
// 		this.y += 10;
// 		if(this.y > game.height){
// 			// alert("message")
// 			this.goDie();
// 		}
// 	},
// 	render : function(){
// 		game.ctx.drawImage(this.image , this.x + 5   ,this.y + 45 , this.w , this.h);
// 	},
// 	goDie : function(){
// 		game.Dijidan = _.without(game.Dijidan , this);
// 	}
// })