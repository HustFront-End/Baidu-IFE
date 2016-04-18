function getElements(children,element){
	
	var arr = [];
	for(var i=0; i<children.length; i++){
		if(children[i].nodeName.toLowerCase() == element){
			arr.push(children[i]);
		}
	}
	return arr;
}


function TraTree(){
	this.stack 	= [];
	this.traverseing = false;
	this.find = false;
}

TraTree.prototype.preTraverse = function(node,element){
	if(node){
		
		this.stack.push(node);

		var children = getElements(node.childNodes,element);

		if(children){			

			for(var i=0; i<children.length; i++){
				
				this.preTraverse(children[i],element);
				
			}	

		}
	}
}
TraTree.prototype.postTraverse = function(node,element){
	if(node){

		var children = getElements(node.childNodes, element);

		if(children){			

			for(var i=0; i<children.length; i++){
				
				this.postTraverse(children[i], element);
				
			}	

		}
		
		this.stack.push(node);
	}
}
TraTree.prototype.animation = function(){
	var myArr = this.stack.splice(0),
		index = 0,
		that = this,
		timer;

		that.stack = []; //每点击一次要清空stack
		if(!that.traverseing){

			//清除查找时，添加的颜色，不影响本次
			for(var i=0; i<myArr.length; i++){
				myArr[i].style.backgroundColor = "#fff";
			}

			that.traverseing = true;

			myArr[index].style.backgroundColor = "red";

			timer = setInterval(function(){ 

				if(index == myArr.length-1){

					if(myArr[index].getAttribute("find")){

						myArr[index].style.backgroundColor = "yellow";
						myArr[index].removeAttribute("find");

					}else{
						myArr[index].style.backgroundColor   = "#fff" ;
					}
					
					
					that.traverseing = false;
					clearInterval(timer);

					if(!that.find){
						alert("没有你要找的");
					}else{
						that.find = false;
					}

				}else{
					if(myArr[index].getAttribute("find")){
						myArr[index].style.backgroundColor = "yellow";
						myArr[index].removeAttribute("find");
					}else{
						myArr[index].style.backgroundColor   = "#fff" ;
					}
					

					myArr[++index].style.backgroundColor = "red";					
				}

			},500);
		}


}
TraTree.prototype.contain = function(nodes,tag){
	var myArr = [];

	for(var i=0; i<nodes.length; i++){

		if(nodes[i].innerHTML == tag){

			nodes[i].parentNode.setAttribute("find" , "find");
			myArr.push(nodes[i].parentNode);

		}
	}

	if(myArr.length){

		this.find = true;
	}else{
		this.find = false;
	}

}


window.onload = function(){
	var root 		= document.getElementById("root"),
		preBtn 		= document.getElementById("pre"),
		postBtn 	= document.getElementById("post"),
		searchBtn 	= document.getElementById("search")
		text        = document.getElementById("text");

	var tree = new TraTree();

	EventUtil.addHandler(preBtn,"click",function(){

		tree.preTraverse(root,"div");
		tree.animation();

	})
	EventUtil.addHandler(postBtn,"click",function(){

		tree.postTraverse(root,"div");
		tree.animation();

	})
	EventUtil.addHandler(search,"click",function(){

		var targetList = root.getElementsByTagName("p");

		tree.contain(targetList, text.value);

		tree.preTraverse(root,"div");
		tree.animation();
		
	})
	

}