
//*****************左插入条形***********************
/*
*Number: 由于Input中的值为字符型，而非数字，所以准换为数字
*margin-top:为了底部对齐
*num_in.value: 清空input,方便再次输入
*/
function laddBar(){
  var bar_chart = document.getElementById("bar"),
      num_in    = document.getElementById("num_in"),
      li        = document.createElement("li");

  var h = Number(num_in.value)*2;
  li.style.height = h + "px";
  li.style.marginTop = (200 - h) + "px";
 
  bar_chart.insertBefore(li,bar_chart.childNodes[0]);
  num_in.value = "";
}

//******************同做插入条形********************
function raddBar(){
  var bar_chart = document.getElementById("bar"),
      num_in    = document.getElementById("num_in"),
      li        = document.createElement("li");

  var h = Number(num_in.value)*2;
  li.style.height = h + "px";
  li.style.marginTop = (200 - h) + "px";
 
  bar_chart.appendChild(li);
  num_in.value = "";
}

function laddNum(){
  var num_in   = document.getElementById("num_in"),
      list     = document.getElementById("num_list"),
      li       = document.createElement("li");
  li.innerHTML = num_in.value;
  list.insertBefore(li,list.childNodes[0]);  
}


//********************显示排序的结果***************************
/*条形图和数字列表的排列结果都是随着排序的结果来的
*numArr: 数组，存放从数字列表中取得的数字（字符型）
*quickSort: 将数组中的数组进行排序
*result: 数组，排序后的数组（数组元素为数字）
*/
function sortShOW(tag){
  var list      = document.getElementById("num_list"),
      num_li    = list.getElementsByTagName("li"),
      bar_chart = document.getElementById("bar"),
      bar_li    = bar_chart.getElementsByTagName("li"),
      numArr    = [],
      result    = [];
  for(var i=0; i<num_li.length; i++){
    numArr.push(Number(num_li[i].innerHTML));
  }

  result = quickSort(numArr,tag);

  for(var j=0; j<num_li.length; j++){
    num_li[j].innerHTML = result[j];

    var h = result[j]*2;
    bar_li[j].style.height = h + "px";
    bar_li[j].style.marginTop = (200 - h) + "px";
  }

  console.log(result);
}

//***************快速排序*****************
/*
*tag表示排序的类型
*true表示顺序
*false表示倒序
*arr表示排序的数组
*/
function quickSort(arr,tag){
  if(arr.length<2){return arr;}

  var preIndex = Math.floor(arr.length / 2),
      mid      = arr.splice(preIndex,1)[0],
      left     = [],
      right    = [];
  if(tag){
    for(var i=0; i<arr.length; i++){
      if(arr[i] < mid){
        left.push(arr[i]);
      }else{
        right.push(arr[i]);
      }
    }
  }else{
    for(var i=0; i<arr.length; i++){
      if(arr[i] > mid){
        left.push(arr[i]);
      }else{
        right.push(arr[i]);
      }
    }
  }
  
  return quickSort(left,tag).concat([mid],quickSort(right,tag));//不要忽略tag，与传入的tag值是一个值
}

function raddNum(){
  var num_in   = document.getElementById("num_in"),
      list     = document.getElementById("num_list"),
      li       = document.createElement("li");
  li.innerHTML = num_in.value;
  list.appendChild(li);
}



window.onload = function(){
	var num_in   = document.getElementById("num_in"),
   		ladd_btn = document.getElementById("left_add"),
    	radd_btn = document.getElementById("right_add"),
    	ldel_btn = document.getElementById("left_del"),
    	rdel_btn = document.getElementById("right_del"),
      list     = document.getElementById("num_list"),
      sort     = document.getElementById("sortNum"),
      bar      = document.getElementById("bar");
  var flag     = false,
      tag      = false;

  /*正则表达式确认输入的是数字字符*/
  function test(num){
      var re = /\d+/;
      flag = re.test(num);
  }

  /*左插入*/
  ladd_btn.onclick = function(){
    if(list.childNodes.length<60){
      test(num_in.value);
      if(flag){
        if(num_in.value < 10 || num_in.value > 100){
          alert("请输入大于或者等于10小于或等于100的数字");
        }else{
          laddNum(); //显示添加的数字
          laddBar();
        }          
      }else{
        alert("请输入数字！");
        num_in.value = "";
      }     
    }else{
      alert("您添加的数字已经超过60个了");
    }
  }

  /*右插入*/
  radd_btn.onclick = function(){

     if(list.childNodes.length<60){
      test(num_in.value);
      if(flag){
        if(num_in.value < 10 || num_in.value > 100){
          alert("请输入大于或者等于10小于或等于100的数字");
        }else{
          raddNum();
          raddBar();
        }          
      }else{
        alert("请输入数字！");
        num_in.value = "";
      }     
    }else{
      alert("您添加的数字已经超过60个了");
    }
  }

  ldel_btn.onclick = function(){
    if(list.childNodes.length){
      var re = confirm("确认删除"+ list.childNodes[0].innerHTML);
      if(re){
        list.removeChild(list.childNodes[0]);
        bar.removeChild(bar.childNodes[0]);
      }
    }
  }
  rdel_btn.onclick = function(){
    if(list.childNodes.length){
      var re =confirm("确认删除"+ list.childNodes[list.childNodes.length - 1].innerHTML);
      if(re){
        list.removeChild(list.childNodes[list.childNodes.length - 1]);
        bar.removeChild(bar.childNodes[list.childNodes.length - 1]);
      }
    }
  }

  sort.onclick = function(){
    sortShOW(tag);
    tag = (tag? false: true);//每点击一下，排序的规则和前一个不同，顺序或者倒序
  }
}