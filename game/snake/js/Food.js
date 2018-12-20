// 主要功能 确定位置
function Food(a){
	//  备份 因为下面是IIFE
	var self = this;
	// 食物的位置 不可以在蛇上 do...while
	do{
		this.row = parseInt(Math.random() * a.rowAmount);
		this.col = parseInt(Math.random() * a.colAmount);
	}
	// 如果是true 就在do一次 这里来判断食物是否在蛇上 
	while((function(){
		// 遍历蛇的body 如果位置和其中一个i的cr 一致就在do一次
		for(var i = 0 ; i < a.snake.body.length ; i++){
			if(a.snake.body[i].row == self.row && a.snake.body[i].col == self.col){
				return true;
			}else{
				return false;
			}
		}
	})());
}
// 来实施 要和game做通信 通过game的方法
Food.prototype.render = function(){
	game.setHTML(this.row , this.col , "*");
}
