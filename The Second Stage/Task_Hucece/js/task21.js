
/*正则表达式*/
  function reg(str){
    var re = /[,;\s\r\n\t，；`.。]+/g;
    return str.trim().split(re);
  }

function addNum(arr,list){
 
  for(var i=0; i<arr.length; i++){
    if(arr[i]){        //判断是为了将最后的空格删除掉
  		var flag = true;  //判断是否有重合的
  		for(var j=0; j<list.childNodes.length; j++){
  			if(arr[i] == list.childNodes[j].innerHTML){
  				flag = false;
  			}
  		}

      if(flag){    //表示没有重合的可以添加

        if(list.childNodes.length == 10){   //判断如果已经有了10个tag，那么删除第一个
          list.removeChild(list.childNodes[0]);
        }

        var  li = document.createElement("li");     
        li.innerHTML = arr[i];
        list.appendChild(li);
        var temp = arr[i];
        if(li.parentNode.id.toLowerCase() == "tag_list" ){
          li.onmouseover = function(){
            delTag(li,list);
          }
          li.onmouseout = function(){
            li.innerHTML = temp;
          }

        }       
      }         
    }    
  }
  
}
function delTag(tag,tags){
  tag.innerHTML = "删除" + tag.innerHTML;
  tag.onclick = function(){
    tags.removeChild(tag);
  }
}

window.onload = function(){
	var tag     = document.getElementById("tag"),
		  tags    = document.getElementById("tag_list"),
		  text    = document.getElementById("text"),
		  hobys   = document.getElementById("hoby_list"),
      confBtn = document.getElementById("conf");
		

	tag.onkeypress = function(event){
		event = event || document.event;
		var keyc  = event.keyCode;
   
		if((keyc == 13) || (keyc == 32)){
			var myArr = reg(tag.value);
      console.log(myArr);
      addNum(myArr, tags);   
      tag.value = "";  
		}
	}

  confBtn.onclick = function(){
    var myArr = reg(text.value);
    text.value = "";
    addNum(myArr,hobys);
  }




  


 
  /*左删除*/
 /* ldel_btn.onclick = function(){
    if(list.childNodes.length){
      var re = confirm("确认删除"+ " “ " +  list.childNodes[0].innerHTML + " ” ");
      if(re){
        list.removeChild(list.childNodes[0]);
      }
    }
  } */
  /*右 删除*/
  /* rdel_btn.onclick = function(){
    if(list.childNodes.length){
      var re =confirm("确认删除"+ " “ " +list.childNodes[list.childNodes.length - 1].innerHTML+ " ” ");
      if(re){
        list.removeChild(list.childNodes[list.childNodes.length - 1]);
      }
    }
  }   */
  

 


}