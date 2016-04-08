
/*正则表达式*/
  function reg(str){
    var re = /[,;\s\r\n\t，；`.。]+/g;
    return str.split(re);
  }

function laddNum(arr){
  var text     = document.getElementById("text"),
      list     = document.getElementById("word_list");
  for(var i=0; i<arr.length; i++){
    if(arr[i]){        //判断是为了将最后的空格删除掉
      var  li   = document.createElement("li");
      li.innerHTML = arr[i];
      list.insertBefore(li,list.childNodes[0]); 
    }    
  }
   
}

function raddNum(arr){
  var text     = document.getElementById("text"),
      list     = document.getElementById("word_list");
  for(var i=0; i<arr.length; i++){
    if(arr[i]){    //判断是为了将最后的空格删除掉
      var  li   = document.createElement("li");
      li.innerHTML = arr[i];
      list.appendChild(li);
    }    
  }  
}


/*匹配*/
function matchWord(str){
  var li = document.getElementById("word_list").getElementsByTagName("li");
  for(var j=0; j<li.length; j++){
    li[j].style.color = "black";
  }
  for(var i=0; i<li.length; i++){
    var flag = (li[i].innerHTML).match(str);  //配成功，flag是一个数组反之为空
   
    if(flag){
      li[i].style.color = "blue";
    }
  }

}

window.onload = function(){
	var text      = document.getElementById("text"),
   		ladd_btn  = document.getElementById("left_add"),
    	radd_btn  = document.getElementById("right_add"),
    	ldel_btn  = document.getElementById("left_del"),
    	rdel_btn  = document.getElementById("right_del"),
      check_btn = document.getElementById("check_btn"),
      word      = document.getElementById("word"),
      list      = document.getElementById("word_list");

  
  /*左插入*/
  ladd_btn.onclick = function(){
    if(text.value){
      var myArr = reg(text.value);
      laddNum(myArr);
      text.value = "";
    }else{
      alert("请输入内容！");
    }
  }

  /*右插入*/
  radd_btn.onclick = function(){
    if(text.value){
      var myArr = reg(text.value);
      raddNum(myArr);
      text.value = "";
    }else{
      alert("请输入内容！");
    }
  }

  /*左删除*/
  ldel_btn.onclick = function(){
    if(list.childNodes.length){
      var re = confirm("确认删除"+ " “ " +  list.childNodes[0].innerHTML + " ” ");
      if(re){
        list.removeChild(list.childNodes[0]);
      }
    }
  }
  /*右 删除*/
  rdel_btn.onclick = function(){
    if(list.childNodes.length){
      var re =confirm("确认删除"+ " “ " +list.childNodes[list.childNodes.length - 1].innerHTML+ " ” ");
      if(re){
        list.removeChild(list.childNodes[list.childNodes.length - 1]);
      }
    }
  }

 check_btn.onclick = function(){
  if(word){
    matchWord(word.value);
  }
 }


}