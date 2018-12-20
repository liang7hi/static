function Snake(){
	// 蛇的身体
	this.body = [
	{"row" : 4 , "col" : 7},
	{"row" : 4 , "col" : 6},
	{"row" : 4 , "col" : 5},
	{"row" : 4 , "col" : 4},
	{"row" : 4 , "col" : 3}
	];
	// 等待game里面的事件来改变
	this.direction = "R";

	// this.gr();
}
// 渲染方法
Snake.prototype.render = function(){
	// 给所有的body添加颜色
 	// 头的颜色
	game.setColor(this.body[0].row , this.body[0].col , "purple" );	
	for(var i = 1 ; i < this.body.length ; i++){
		// game是new Game()
		game.setColor(this.body[i].row , this.body[i].col , "green" );	
	}

}
// 运动状态 每多少帧来改变
Snake.prototype.update = function(){
	// 尾删一个
	// this.body.pop();
	//  首添一个 对应的位置要加一呢~~~
	if(this.direction == "R"){
		// 首添 向右 row不变 相当于第一项的row 需要col加一
		var tou = {"row" : this.body[0].row , "col" : this.body[0].col + 1 };
		this.body.unshift(tou);	
	}else if(this.direction == "D"){
		var tou = {"row" : this.body[0].row + 1 , "col" : this.body[0].col}
		this.body.unshift(tou);
	}else if(this.direction == "L"){
		var tou = {"row" : this.body[0].row , "col" : this.body[0].col - 1 };
		this.body.unshift(tou);
		// alert("L");
	}else if(this.direction == "U"){
		var tou = {"row" : this.body[0].row - 1, "col" : this.body[0].col};
		this.body.unshift(tou);
		// alert("U");
	}
	// tou的碰墙判断
	if(tou.row < 0 || tou.col < 0 || tou.row > game.rowAmount - 1 || tou.col > game.colAmount - 1){
		alert("你撞墙了分数" + (this.body.length - 1));
		clearInterval(game.timer);
	}
	// 撞自己判断
	for(var i = 1 ; i < this.body.length ; i++){
		// 头部位置等于蛇的位置
		if(tou.row == this.body[i].row && tou.col == this.body[i].col){
			alert("你撞到自己啦长度是"+ (this.body.length - 1));
			clearInterval(game.timer);
		}
	}
	// 食物判断
	if(tou.row == game.food.row && tou.col == game.food.col){
		game.food = new Food(game);
		//让帧编号清零，这里为了防止吃了食物突然蹿一下
		game.f = 0;
	}else{
		// 否则 没吃到食物就尾删一项
		this.body.pop();
	}
	document.getElementById("gr").innerHTML = "分数：" + this.body.length;
}
Snake.prototype.changeDirection = function(str){
	this.direction = str;
}
// Snake.prototype.gr = function(){
	
// }
