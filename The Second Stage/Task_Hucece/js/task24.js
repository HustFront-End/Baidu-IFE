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
	this.checking = false;
	this.checkedNode;
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
					if(find){
						alert("没有找到");
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
TraTree.prototype.checkingNode = function(target) {
	
	if(target.nodeName.toLowerCase() == "div"){
		this.checkedNode =  target;
	}else if(target.nodeName.toLowerCase() == "p"){
		this.checkedNode =  target.parentNode;
	}		

	if(!this.checking){

		this.checking = true;
		this.checkedNode.style.backgroundColor = "blue";

	}
}
TraTree.prototype.delNode = function() {
	
	var parent = this.checkedNode.parentNode;
	parent.removeChild(this.checkedNode);
	this.checking = false;

}
TraTree.prototype.addNode = function(text) {
	
	var parent = this.checkedNode,
		child = document.createElement("div"),
		par = document.createElement("p");

	par.innerHTML = text;
	child.appendChild(par);
	parent.appendChild(child);

	this.checking = false; 
	parent.style.backgroundColor = "#fff";
}



window.onload = function(){
	var root 		= document.getElementById("root"),
		preBtn 		= document.getElementById("pre"),
		postBtn 	= document.getElementById("post"),
		searchBtn 	= document.getElementById("search"),
		text        = document.getElementById("text"),
		del    		= document.getElementById("delete"),
		add         = document.getElementById("add");

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
		tree .preTraverse(root,"div");
		tree.animation();
		
	})
	EventUtil.addHandler(root,"click",function(event){

		var e = EventUtil.getEvent(event);
		var target = EventUtil.getEventTarget(e);
		EventUtil.stopEventBubble(e);

		tree.checkingNode(target);

	})
	
	EventUtil.addHandler(del,"click",function() {
		
		if(tree.checking){
			var re = confirm("确定要删除该节点及其子节点？");

			if(re){
				tree.delNode();
			}
		}else{
			alert("请先选中节点");
		}
	})

	EventUtil.addHandler(add,"click",function() {
		
		if(tree.checking){
			var text = document.getElementById("text_add").value;
			if(text){
				var re = confirm("确定要为此节点添加子节点吗？");
				tree.addNode(text);
			}
		}else{
			alert("请先选中节点");
		}
	})

}