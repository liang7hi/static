function Map(){
	this.code = [
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX□□□□□□□□□□□□XXX",
		"XXX111111111111XXX",
		"XXXXXXXXXXXXXXXXXX",
		"XXXXXXXXXXXXXXXXXX",
		"XXXXXXXXXXXXXXXXXX",
		"XXXXXXXXXXXXXXXXXX",
		"XXXXXXXXXXXXXXXXXX"
	]
	this.fenshu = 0;
	document.getElementById("fenshu").innerHTML = "分数：" + this.fenshu;
}
// 渲染地图
Map.prototype.render = function(){
	for(var i = 0 ; i < 20 ; i++){
		for(var j = 0 ; j < 12 ; j++){
			var char = this.code[i][j + 3];
			if(char != "□"){
				// 如果不是块 就渲染地图上的颜色
				game.setClass(i , j , "b" + char);
				// console.log(i,j);
			}
		}
	}
}
// 功能就是来判断是否可以下落
// 通过参数 行数 列数 来判断是否可以下落
Map.prototype.check = function(row , col ,blockCode){
	// 得到切割的区域
	var cutSquare = [];
	for(var i = 0; i < 4 ; i++){
		cutSquare.push(this.code[row + i].substr(col + 3 , 4));
	}


	for (var i = 0 ; i < 4 ; i++) {
		for (var j = 0; j < 4; j++) {
			// 是否下落语句 关键
			if(get(blockCode , i , j) == 1 && cutSquare[i][j] != "□"){
				return false;
			}	
		};
	}
	return true;
}
// 添加死亡方块
// Map.prototype.addDiedBlock = function(row , col , blockCode ， color){
// 	// 先循环所有的td
// 	for(var i = 0 ; i < 4 ; i++){
// 		for(var j = 0 ; j < 4 ; j++){
// 			// 在来判断这个方块的code对应的位置是1
// 			if(get(blockCode, i , j ) == 1){
// 				// 那么地图数组对象的row行的字符串就改变
// 				this.code[row + i] = changeChar(this.code[row + i] , col + j + 3 , color);
// 			}
// 		}
// 	}
// }
//添加死亡方块
Map.prototype.addDiedBlock = function(row , col , blockCode , color){
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(get(blockCode , i , j) == 1){
				// console.log(row+i ,this.code[row + i],col + j + 3,color);
				// console.log(this.code[row + i]);
				this.code[row + i] = changeChar(this.code[row + i] , col + j + 3 , color );
			}
		}
	}
}
// 判断是否可以清除的一个方法
Map.prototype.qingchu = function(){
	
	
	// 循环所有的行
	for(var i = 0 ; i < 20 ; i++){
		// 判断这一行是否有空方块 -1就是没有空方块
		if(this.code[i].indexOf("□") == -1){

			// 删除这项
			this.code.splice(i , 1);
			this.fenshu += 100;
			console.log(this.fenshu);
			document.getElementById("fenshu").innerHTML = "分数：" + this.fenshu;
			// 为了保证剩下的行沉下去 所以要首添一项初始行
			this.code.unshift("XXX□□□□□□□□□□□□XXX");
			
		}
	}
}

function changeChar(str , n , newchar){
	// 改变str的n下标为newstr （只能改一项） 删掉要改的字符串后面全部 加新字符串 再加上后面删除的 下标从n+1开始 
	return str.substr(0,n) + newchar + str.substr(n + 1);
}
// 可以得到code编码的m行n个 如果为1 就渲染颜色
function get(code,m,n){
	return (((code >> 4 * (3 - m)) & 0xf) >> (3 - n)) & 0x1
}
// document.getElementById("fenshu").innerHTML = "分数：" + this.fenshu;