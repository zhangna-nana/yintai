	function getInner(obj,value){
		// 判断是否有该方法
     if(obj.textContent){
     	// 判断value是否赋值
         if(value==undefined){
         	// 如果没有赋值获取内容
            return obj.textContent;
         }else{
         	// 如果赋值显示输入内容
         	 obj.textContent=value;
         }
     }else{
     	// IE浏览器
           if(value==undefined){
           	return obj.innerText;
           }else{
         	 obj.innerText=value;
         }
     }
}





function getStyle(obj,style){
	if(obj.currentStyle){
		return obj.currentStyle[style];
	}else{
		return getComputedStyle(obj,null)[style];
	}

}




function $(search,obj){
	var obj=obj||document;
	// 如果要寻找的第一个字符是#，通过Id获取
	// 判断第一个字符
  if(typeof(search)=="string"){
    if(search.charAt(0)=="#"){
    // 截取除第一个字符之外的所有
    return document.getElementById(search.substr(1));
    // 第一个字符为.则是类名
  }else if(search.charAt(0)=="."){
    // 截取除第一个字符之外的所有
        return getClass(search.substr(1),obj);
  }else{
    // 其余情况为通过标签名来获取所需元素
    return obj.getElementsByTagName(search);
     }
  }
	else if(typeof(search)=="function"){
    window.onload=function(){
      search();
    }
  }
}







// 创建函数  需要获取的类名 方法
function getClass(className,obj){
	// 方法若传入obj参数则为输入值，否则为document
     var obj=obj||document;  
     // 判断是否有获取方法      
     if(obj.getElementsByClassName){
     	// 若有则返回该方法
     	return obj.getElementsByClassName(className);
     }else{
     	// 获取所有的对象 建立空数组
     	var arr=[];
      var alls=obj.getElementsByTagName("*"); 
        // 类数组形式           
        for(var i=0;i<alls.length;i++){
        	// 判断alls中的类名是否和所需相等 
        	// 调用checkClass函数判断是否相等  
        	if(checkClass(alls[i].className,className)){
        		// 若等放入空数组当中
        		arr.push(alls[i]);
        	}
        }
        return arr;
     }
}





// 类名可能有多个，需要将类名都放入数组当中与所需类名进行逐个比较
function checkClass(search,match){
	// 将类名以空格分割成数组
       var brr=search.split(" ");
       // 进行比较
       for(var i=0;i<brr.length;i++){
       	if(brr[i]==match){
       		return true;
       	}
       }
       return false;
}




function getChilds(obj,type){
      var type=type||"a";
      var all=obj.childNodes;
      var arr=[];
      for(var i=0;i<all.length;i++){
        if(type=="a"){
             if(all[i].nodeType==1){
              arr.push(all[i]);
             }
         }else if(type=="b"){
             if(all[i].nodeType==1||(all[i].nodeType==3&&all[i].nodeValue.replace(/^\s*|\s*$/g,""))){
              arr.push(all[i]);
             }
         }
      }
      return arr;
      
}

// 获取第一个子节点
function getFirst(obj){
    return getChilds(obj)[0];
}

// 获取最后一个子元素
function getLast(obj){
    return getChilds(obj)[getChilds(obj).length-1];
}


// 获取下一个兄弟元素
function getNext(obj){
  var next=obj.nextSibling;
  // 如果没有下一个兄弟返回false
   if(next==null){
    return false;
   }
   // 循环获取下一个兄弟，若下一个为文本 注释继续循环 若没有返回false
    while(next.nodeType==3||next.nodeType==8){
      next=next.nextSibling;
      if(next==null){
       return false;
       }
    }
    // 最后返回next
    return next;
   }



// 同getNext
   function getPrevious(obj){
  var previous=obj.previousSibling;
  // 如果没有上一个兄弟返回false
   if(previous==null){
    return false;
   }    
    while(previous.nodeType==3||previous.nodeType==8){
      previous=previous.previousSibling;
      if(previous==null){
       return false;
       }
    }
    return previous;
   }



function insertBefore(obj,before){
  var parent=before.parentNode;
  parent.insertBefore(obj,before);
}


function insertAfter(obj,after){
  var next=getNext(after,"b");
  var parent=after.parentNode; 
  if(next){
    insertBefore(obj,next);
  } 
  else{
    parent.appendChild(obj);
  }
}

//添加事件
function addEvent(obj,event,fun){
    if(obj.attachEvent){
       obj.attachEvent("on"+event,fun);
    }else if(obj.addEventListener){
      obj.addEventListener(event,fun,false)
    }
}
//删除事件
function delEvent(obj,event,fun){
     if(obj.detachEvent){
       obj.detachEvent("on"+event,fun);
    }else if(obj.removeEventListener){
       obj.removeEventListener(event,fun,false)
      }
}

//鼠标滚轮事件，缩放，拖动时用
function mouseWheel(obj,funUp,funDown){//鼠标滚轮事件
    if(obj.attachEvent){//ie鼠标滚轮事件
      obj.attachEvent("onmouseWheel",scroll);
    }else if(obj.addEventListener){//一般浏览器鼠标滚轮事件
      obj.addEventListener("mousewheel",scroll,false);//谷歌浏览器鼠标滚轮
      obj.addEventListener("DOMMouseScroll",scroll,false);//火狐鼠标滚轮
    }
    function scroll(e){
            var ev=e||window.event;
            var d=ev.wheelDelta||ev.detail;
            if(obj.attachEvent){
              ev.returnValue=false;
            }else if(obj.addEventListener){
              ev.preventDefault();
            }

            if(d==-120||d==3){
              if(funUp){
                funUp();
              }
            }else if(d==120||d==-3){
              if(funDown){
                  funDown();
              }
            
            }
    }

}

//双下标轮播
  //img_box 为存放图片的父元素
  //imgs 为多张图片
  //dians 为多个小圆点
  //leftbtn 左按钮(点击图片向左滚动)
  //rightbtn 右按钮（点击图片向右滚动）
  //width 图片的宽度
function doubleSubscript(box,imgs,circle,left,right)
  {   
    var n = 0;
    var t=setInterval(move, 5000)
    // 时间函数
    function move(type) {

      var type=type||"r";
      //判断type初始值
        if (type=="r") {
          n++;
            if (n>=circle.length) {
              n=0;
            }
        }else{
          n--;
          if (n<0) {
            n=circle.length-1;
          };
        }
      for (var i = 0; i < imgs.length; i++) {
        animate(imgs[i],{opacity:0},300)
        // 将所有图片变为透明
        circle[i].style.background = "#d3d3d3";
        // 将所有小圆变为#d3d3d3
      }
      animate(imgs[n],{opacity:1},300)
      // 将下标为1的透明度调为1
      circle[n].style.background = "#e71d64";
      // 将下标为n圆圈调为#e71d64
    }
    box.onmouseover = function() {
      left.style.display="block"
      right.style.display="block"
      clearInterval(t)
      // 鼠标放上去清除进程
    }
    box.onmouseout = function() {
      left.style.display="none"
      right.style.display="none"
      t = setInterval(move, 5000)
      // 鼠标离开重新调用
    }
    for (var i = 0; i < circle.length; i++) {
      circle[i].index = i;
      // 保存当前页面小标
      circle[i].onclick = function() {
        // 点击事件

        for (var i = 0; i < circle.length; i++) {
          circle[i].style.background = "#d3d3d3"
          // 循环将小圆颜色变为
          animate(imgs[i],{opacity:0},300)
          // 将小圆变成透明
        }
        circle[this.index].style.background = "#e71d64"
        // 将当前小圆变色
        animate(imgs[this.index],{opacity:1},300)
        // 将当前图片调为1
      }
    }
    right.onclick = function() {
      move("r")
      // 右点击调用函数
    }
    left.onclick = function() {
      move("l")
      // 左点击调用函数
    } 
  }

//节点轮播
  function nodelunbo(back,box,left,right){
    // left.style.display="none";
    // right.style.display="none";
    var t = setInterval(dong, 2000) //设定时间机制
    var flag = true;//设定开关，并开启
    function dong() {
      if (!flag) {//开关机制：重复点击不改变动画效果
        return;
      }
      flag = false;//关闭开关
      var img = getFirst(box); //获取第一张图片
      animate(box, {left: -1140}, 500, function() {
        box.appendChild(img); //将图片放在图片框最后
        box.style.left = 0; //恢复图片框的位置
        flag=true;//打开开关
      })
    }

    function dong1() {
      if (!flag) {
        return;
      }
      flag = false;
      var img = getFirst(box); //获取第一张图片
      var img1 = getLast(box); //获取最后一张图片
      insertBefore(img1, img); //用最后一张放在第一张前边
      box.style.left = -1140 + "px"; //图片框的向左移动
      animate(box, {
        left: 0
      }, 500,function  () {
        flag=true;
      }) //恢复图片框的位置
    }
    back.onmouseover=function(){
      clearInterval(t);
      left.style.display="block";
      right.style.display="block";
    }//鼠标放上去之后清除间隔机制（停止轮播）
    back.onmouseout = function() {
      t = setInterval(dong, 2000);
      left.style.display="none";
      right.style.display="none";
    }//鼠标离开效果恢复
    left.onclick = function() {
      dong1()
    }
    right.onclick = function() {
      dong()
    }
  }
