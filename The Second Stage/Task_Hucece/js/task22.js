function TraTree(){
	this.stack = [];
	this.flag = false;
}

TraTree.prototype.preTraverse = function(node){
	if(node){
		this.stack.push(node);
		if(node.firstElementChild){
			this.preTraverse(node.firstElementChild);
		}
		if(node.lastElementChild){
			this.preTraverse(node.lastElementChild);
		}	
		
	}
}
TraTree.prototype.inTraverse = function(node){
	if(node){
		this.inTraverse(node.firstElementChild);
		this.stack.push(node);
		this.inTraverse(node.lastElementChild);
	}
}
TraTree.prototype.postTraverse = function(node){
	if(node){
		this.postTraverse(node.firstElementChild);
		this.postTraverse(node.lastElementChild);
		this.stack.push(node);
	}
}
TraTree.prototype.animation = function(){
	var myArr = this.stack,
		index = 0,
		that = this,
		timer;

		that.stack = []; //每点击一次要清空stack
		if(!that.flag){
			flag = true;
			myArr[index].style.backgroundColor = "red";
			timer = setInterval(function(){ 		
				if(index == myArr.length-1){
					myArr[index].style.backgroundColor = "#fff";
					that.flag = false;
					clearInterval(timer);
				}else{
					myArr[index].style.backgroundColor = "#fff";
					myArr[++index].style.backgroundColor = "red";
				}
			},500);
		}
}

window.onload = function(){
	var root 	= document.getElementById("col1"),
		preBtn 	= document.getElementById("pre"),
		inBtn 	= document.getElementById("in"),
		postBtn = document.getElementById("post");

	var tree = new TraTree();

	EventUtil.addHandler(preBtn,"click",function(){
		tree.preTraverse(root);
		tree.animation();
	})
	EventUtil.addHandler(inBtn,"click",function(){
		tree.inTraverse(root);
		tree.animation();
	})
	EventUtil.addHandler(postBtn,"click",function(){
		tree.postTraverse(root);
		tree.animation();
	})
	

}