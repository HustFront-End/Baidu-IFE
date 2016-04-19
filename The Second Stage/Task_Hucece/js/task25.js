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
	this.stack 	= [];   //装载遍历的数据
	this.traverseing = false;     // 表示不再遍历中
	this.find = false;         // 没有找到我们要找的文本
	this.preChecked;           //用来装载前一个被我们选中的div
	this.checking = false;      //表示没有选中div
	this.checkedNode;           //现在我们所选中的div
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
	var myArr = [];   //由于有可能几个块的内容都是一样，所以需要用数组来保存

	for(var i=0; i<nodes.length; i++){

		if(nodes[i].innerHTML == tag){

			nodes[i].parentNode.setAttribute("find" , "find");  //当确实包含要找的内容时，由于是写在p中，所以给p的父节点div设置属性find
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
	}else if(target.nodeName.toLowerCase() == "i"){   //如果是icon时，就进行展开和收起
		var icon = target;
		this.showOrHide(target.parentNode.getElementsByTagName("div"),icon);
	}		

	if(this.checkedNode){

		if(this.preChecked){        //我们上一步的选择，这样就可以在选择下一步的时候 把上一步的选择取消掉（主要是标识的颜色）
			this.preChecked.style.backgroundColor = "#fff";
		}

		this.checkedNode.style.backgroundColor = "yellow";
		this.preChecked  = this.checkedNode;
		this.checking = true;

	}
}
TraTree.prototype.delNode = function() {
	
	var parent = this.checkedNode.parentNode;
	if(parent.nodeName.toLowerCase() != "body"){
		parent.removeChild(this.checkedNode);
	}
	

	//当没有子节点div时，就要删除icon
	if(parent.getElementsByTagName("div").length == 0){

		var icon = parent.getElementsByTagName("i")[0];
		parent.removeChild(icon);
	}
	this.checking = false;//删除之后就没有选中任何块

}
TraTree.prototype.addNode = function(text) {
	
	var parent = this.checkedNode,
		child  = document.createElement("div"),
		icon   = document.createElement("i"),
		par    = document.createElement("p");

	par.innerHTML = text;
	child.appendChild(par);
	parent.appendChild(child);

	//当没有icon时，就要添加icon
	if(parent.getElementsByTagName("i").length == 0){
		icon.innerHTML = "+";
		parent.insertBefore(icon,parent.getElementsByTagName("p")[0]);
	}

	this.checking = false; 
	parent.style.backgroundColor = "#fff";
}
TraTree.prototype.showOrHide = function(arr,icon){
	
	var innContent = icon.innerHTML;

	if(innContent == "+"){
		icon.innerHTML = "-";
		for(var i=0; i<arr.length; i++){
			arr[i].style.display = "block";
		}
		
	}else{
		for(var i=0; i<arr.length; i++){
			arr[i].style.display = "none";
		}
		icon.innerHTML = "+";
	}
}



window.onload = function(){
	var root 		= document.getElementById("root"),
		searchBtn 	= document.getElementById("search"),
		text        = document.getElementById("text"),
		del    		= document.getElementById("delete"),
		add         = document.getElementById("add");

	var tree = new TraTree();


	//点击查找按钮
	EventUtil.addHandler(search,"click",function(){

		var targetList = root.getElementsByTagName("p");

		tree.contain(targetList, text.value);  //查找是否包含

		//显示找的过程和结果
		tree .preTraverse(root,"div");
		tree.animation();
		
	})
	EventUtil.addHandler(root,"click",function(event){    //由于有很多的块，所以用事件代理

		var e = EventUtil.getEvent(event);
		var target = EventUtil.getEventTarget(e);
		EventUtil.stopEventBubble(e);   //防止冒泡，这样我们就可以准确定位到所选择的块

		tree.checkingNode(target);     //在页面展示我们所选中的块，如果是icon时，就会产生展开和收缩的表现

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