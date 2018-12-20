function Game(){

	this.init();
	// 先让它渲染一下盒子
	this.block = new Block();
	//下一个方块
	this.nextBlock = new Block();
	//实例化一个地图
	this.map = new Map();
	// 开始
	this.start();
	// 监听按键
	this.getJian();
}
// show
Game.prototype.init = function(){
	this.dom = document.createElement("table");
	this.dom.style.float = "left";
	this.dom.style.marginRight = "10px";
	for(var i = 0 ; i < 20 ; i++){
		var tr = document.createElement("tr");
		for(var j = 0 ; j < 12 ; j++){
			var td = document.createElement("td");
			tr.appendChild(td);
		}this.dom.appendChild(tr);
	}
	document.getElementById("app").appendChild(this.dom);

	//创建预览表格 包括了样式
	this.dom2 = document.createElement("table");
	this.dom2.style.float = "left";
	this.dom2.style.marginRight = "10px";
	for(var i = 0 ; i < 4 ; i++){
		var tr = document.createElement("tr");
		for(var j = 0 ; j < 4 ; j++){
			var td = document.createElement("td");
			tr.appendChild(td);
		}
		this.dom2.appendChild(tr);
	}
	
	document.getElementById("app").appendChild(this.dom2);
}
// 渲染第二个预览盒子
Game.prototype.renderNextBlock = function(){
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(get(this.nextBlock.code , i , j) == 1){
				// alert("message")
				this.dom2.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className = "b" + this.nextBlock.zimuxiang; 
			}
		}
	}
}

// 渲染颜色
Game.prototype.setClass = function(r,c,cln){
		// this.dom.getElementsByTagName("tr")[r].getElementsByTagName("td")[c].className = cn;
	this.dom.getElementsByTagName("tr")[r].getElementsByTagName("td")[c].className = cln;
	// console.log(this.dom.getElementsByTagName("tr")[r].getElementsByTagName("td")[c]);
	// this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].className = classn;
}
// 开始事件
Game.prototype.start = function(){
	this.f = 0;
	var self = this;
	this.timer = setInterval(function(){
		self.f++;
		document.getElementById("zhen").innerHTML = "帧：" + self.f;


		self.clear();
		self.f % 20 == 0 && self.block.update();
		self.block.render();
		// 渲染地图
		self.map.render();
		// 渲染砖块
		self.renderNextBlock();
	},40)
}

Game.prototype.clear = function(){
	for(var i = 0 ; i < 20 ; i++){
		for(var j = 0; j < 12 ; j++){
			this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className = "";
		}
	}
	// 清除Dom2的样式
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			this.dom2.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className = 
			"";
		}
	}
}
Game.prototype.getJian = function(){
	var self = this;
	document.onkeydown = function(event){
		if(event.keyCode == 37){
			game.block.leftMove();
		}else if(event.keyCode == 38){
			game.block.rotate();
			// alert(5)
		}else if(event.keyCode == 39){
			game.block.rightMove();
		}else if(event.keyCode == 32){
			self.block.gotoBottom();
		}else if(event.keyCode == 40){
			self.block.update();
		}
	}
}
// 可以得到code编码的m行n个 如果为1 就渲染颜色
function get(code,m,n){
	return (((code >> 4 * (3 - m)) & 0xf) >> (3 - n)) & 0x1
}

