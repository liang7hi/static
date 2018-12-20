function Block(){
	var zimu = ["S","Z","J","L","O","T","I"];
	// 随机选中自字母的项
	this.zimuxiang = parseInt(Math.random() * 7);
	// 连接上面两个语句 得到可以随机得到字母
	this.suijizimu = zimu[this.zimuxiang];
// 得到是随机字每
//**********************************************************

	// 所有字母的形态
	var allzimu = {
		"S" : [0x6c00 , 0x8c40],
		"Z"	: [0xc600 , 0x4c80],
		"J" : [0x44c0 , 0x8e00 , 0x6440 , 0x0e20],
		"L" : [0x4460 , 0x0e80 , 0xc440 , 0x2e00],
		"O" : [0x6600],
		"T" : [0x0e40 , 0x4c40 , 0x4e00 , 0x4640],
		"I" : [0x4444 , 0x0f00]
	}
	// 所以随机的字母形态
	this.allsuiji = allzimu[this.suijizimu];

// 得到allzimu中所有随机的字母
//*******************************************************
	// 随机的方向
	// 所有方向可能的项
	this.fangxiangAmount = this.allsuiji.length;
	// 随机这个方向 因为是length 所以得到项random后就不用加一了
	this.fangxiang = parseInt(this.fangxiangAmount * Math.random());
	// 最终的编码
	this.code = this.allsuiji[this.fangxiang];
	// console.log(this.code);



//**************************************
	// 自己block出现的row
	this.row = 0;
	// 自己的列
	this.col = 4;

}
Block.prototype.render = function(){
	for(var i = 0 ; i < 4 ; i++){
		for(var j = 0 ; j < 4 ; j++){
			if(get(this.code , i  , j) == 1){
				// console.log(this.row + i ,this.col + j , "b" + this.zimuxiang);
				game.setClass(this.row + i , this.col + j , "b" + this.zimuxiang);
			}

			
		}
	}
}
// 可以得到code编码的m行n个 如果为1 就渲染颜色
function get(code,m,n){
	return (((code >> 4 * (3 - m)) & 0xf) >> (3 - n)) & 0x1
}
Block.prototype.update = function(){
	// 假装先row上走一步 如果check判断函数返回的true 就走
	if(game.map.check(this.row + 1 , this.col , this.code)){
		this.row++;
	}else{
		// 否则触底
		// 到这里已经不动了
		// 转换成死亡类 改变的是地图类所以要引用地图类里面的方法
		game.map.addDiedBlock(this.row , this.col , this.code , this.zimuxiang);
		// 从预览盒子内拿取新盒 预览盒子是new出来的
		game.block = game.nextBlock;
		// block有new 的新盒子 nextblock也有new的新盒子 一赋值 就被消掉了
		game.nextBlock = new Block();
		game.map.qingchu();
		// 死亡判定
		// 原理：判断第0行 第4列 是否可以落 如果不可以落就是死亡
		if(!game.map.check(0 , 4 , this.code)){
			alert("GAME OVER 得分" + game.map.fenshu);
			// 停止计时器
			clearInterval(game.timer);
		}
	}
	// if(this.row > 16){
	// 	this.row = 16;
		// this.block2 = new block();
	// }
}
Block.prototype.leftMove = function(){
	// 先判断是否可以向左移动 判断成功就可以移了
	if(game.map.check(this.row , this.col - 1, this.code)){
		this.col --;
	}
}
	
	// if(this.col < 0 ){
	// 	this.col = 0;
	// }

Block.prototype.rightMove = function(){
	// 和左移同理
	if(game.map.check(this.row , this.col + 1, this.code)){
		this.col ++;
	}

	
	// if(this.col > 8){
	// 	this.col = 8;
	// }
}
Block.prototype.rotate = function(){
	this.fangxiang++;
	// 因为是length 得到每项所以要减一
	if(this.fangxiang > this.fangxiangAmount - 1){
		this.fangxiang = 0;
	}
	// 赋值
	// 新code  测试成功在更改
	var nextCode = this.allsuiji[this.fangxiang];
	// 是否可以旋转 需要用到check函数来判断
	// this.row 和this.col 是定时器实时更新的
	if(game.map.check(this.row , this.col , nextCode)){
		//测试通过了再改
		this.code = nextCode;
	}
	/*this.code = this.allsuiji[this.fangxiang];*/
}
Block.prototype.gotoBottom = function(){
	var i = 0;
	// 如果可以下落的话 就让下落的高度i加加 +i是关键 每次要判断不同的高度是否可以降落
	while(game.map.check(this.row + i , this.col , this.code)){
		i++;
	} 
	this.row = this.row + i - 1;
	// alert("message")

}
	