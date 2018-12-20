// 游戏表格 中介者模式 其他类都要在这声明
function Game(){
	// 行数
	this.rowAmount = 15;
	// 列数
	this.colAmount = 38;
	// 显示出来
	this.init();
	// 实例化小蛇
	this.snake = new Snake();
	// 创建新food
	this.food = new Food(this);
		// 游戏开始
	this.start();
	// 绑定个键盘监听
	this.bindEvent();
}
//*******************************************
Game.prototype.init = function(){
	// 创建节点
	this.dom = document.createElement("table");
	// for循环里面的tr td
	var tr,td;
	for(var i = 0 ; i < this.rowAmount ; i++){
		tr = document.createElement("tr");
		for(var j = 0 ; j < this.colAmount ; j++){
			td = document.createElement("td");
			// 添加到tr
			tr.appendChild(td);
		}
		this.dom.appendChild(tr);
	}
	// 把dom上树
	document.getElementById("app").appendChild(this.dom);
}
//*******************************************
// 给蛇设置颜色 ??
Game.prototype.setColor = function(row , col , color){
	this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color;
	// this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color;
}

// 游戏开始
Game.prototype.start = function(){
	// 帧
	var self = this;
	this.f = 0;
	// 定时器 清除屏幕-更新蛇-渲染蛇
	this.timer = setInterval(function(){
		self.f++;
		// 显示帧编号
		document.getElementById("info1").innerHTML = "帧编号：" + self.f;
		// 先清屏
		self.clear();
		// 更新状态 时间其实是自定义的
		var during;
		if(self.snake.body.length < 30){
			during = 15 - self.snake.body.length;
		}else{
			during = 1;
		}
		if(self.f % during == 0){
			self.snake.update();
		}
		//渲染蛇
		self.snake.render();
		// 渲染食物
		self.food.render();
	},20)
}
// 清除食物和清除屏幕颜色
Game.prototype.clear = function(){
	// 原理 设置所有表格为白色
	for (var i = 0; i < this.rowAmount ; i++) {
		for(var  j  = 0 ; j < this.colAmount ; j++){
			// 从table中选择到所有td
			this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.background = "white";
			// 清除食物
			this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = "";
		}
	};
}
//************************************
// 功能：得到按键并传给snake的一条属性 通过属性改变方向
Game.prototype.bindEvent = function(){
	// 因为绑定事件所有要备份
	var self = this;
	// alert("message")
	document.onkeydown = function(event){
		// 错误在keycode 忘记大写 服了

		// if(event.keycode == 37 ){
		// 	// 每次改变另外一个类的属性 需要通过对方的函数来改变
		// 	// 传入的参数 就是蛇类要改变的方向
		// 	self.snake.changeDirection("L");
		// }else if(event.keycode == 38 ){
		// 	self.snake.changeDirection("U");
		// }else if (event.keyCode == 39){
		// 	self.snake.changeDirection("R");
		// }else if (event.keyCode == 40){
		// 	self.snake.changeDirection("D");
		// }
		// console.log(event.keyCode);
		// console.log(self.snake.direction);
		if(event.keyCode == 37){
			//按了左箭头，如果现在是往右走，我们不允许调头
			if(self.snake.direction == "R") return;
			self.snake.changeDirection("L");
		}else if(event.keyCode == 38){
			if(self.snake.direction == "D") return;
			self.snake.changeDirection("U");
		}else if(event.keyCode == 39){
			if(self.snake.direction == "L") return;
			self.snake.changeDirection("R");
		}else if(event.keyCode == 40){
			if(self.snake.direction == "U") return;
			self.snake.changeDirection("D");
		}
	}
}
Game.prototype.setHTML = function(row,col,html){
	this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = html;
}