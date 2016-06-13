window.onload=function(){
//header部分
 //微信
   var hdtop_wechat_ewm=$('.hdtop-wechat-ewm')[0];
   var hdtop_wechat=$('.hdtop-wechat')[0];
   hdtop_wechat.onmouseover=function(){
   		hdtop_wechat_ewm.style.display='block';
   }
   hdtop_wechat.onmouseout=function(){
   		hdtop_wechat_ewm.style.display='none';
   }
 //手机银泰
   var hdtop_sjyt=$('.hdtop-sjyt')[0];
   var hdtop_sjyt_ewm=$('.hdtop-sjyt-ewm')[0];
   hdtop_sjyt.onmouseover=function (){
   		 setTimeout(function(){
   			hdtop_sjyt_ewm.style.display='block';
   		 });
   }
   hdtop_sjyt.onmouseout=function (){
   		 setTimeout(function(){
   			hdtop_sjyt_ewm.style.display='none';
   		 });
   }
 //我的银泰
   var my_yt=$('.my-yt')[0];
   var my_yt_top=$('.my-yt-top')[0];
   my_yt_top.onmouseover=function(){
   		my_yt.style.display='block';
   }
   my_yt_top.onmouseout=function(){
   		my_yt.style.display='none';
   }
 //购物袋
   var shopbag=$('.shopbag')[0];
   var loadgif=$('.loadgif')[0];
   var shopbagxl=$('#shopbagxl');
   shopbag.onmouseover=function(){
   		loadgif.style.display='block';
   		setTimeout(function(){
   			shopbagxl.style.display='block';
   			loadgif.style.display='none';
   		},500)
   }
   shopbag.onmouseout=function(){
   		setTimeout(function(){
   			shopbagxl.style.display='none';
   		},500)
   }
 //banner轮播
	var box=$(".pannels")[0];
	var imgs = $(".banner");
	var circle = $(".dian");
	var rightr = $(".ri")[0];
	var leftl = $(".le")[0];
	doubleSubscript(box,imgs,circle,leftl,rightr);
//banner下第一个选项卡
	var bct=$(".brand-content-top")[0]
	var bcbf=$("li",bct);
	var bcb=$(".brand-content-bottom");
	for (var i = 0; i < bcbf.length; i++) {
		bcbf[i].index=i;
		bcbf[i].onmouseover=function(){
			for (var i = 0; i < bcbf.length; i++) {
				bcbf[i].classList.remove("bctf")
				bcb[i].style.zIndex=0;
			};
			bcbf[this.index].classList.add("bctf")
			bcb[this.index].style.zIndex=1;
		}
	}
//专柜同款选项卡
	var mains=$(".mains");
	var title=$(".title-lis");
	for (var i = 0; i < title.length; i++) {
		title[i].index=i;
		title[i].onmouseover=function(){
			for (var i = 0; i < mains.length; i++) {
				mains[i].style.zIndex=0;
				title[i].classList.remove("tl-active")
			}
			mains[this.index].style.zIndex=1;
			title[this.index].classList.add("tl-active")
		}
	};
//楼层导航轮播
var banner=$(".floor-nav-bottom")  
for(var i=0;i<banner.length;i++){
	function bb(){
  var banner1=$(".floor-nav-bottom")[i];
  var imgs=$(".floor-scroll",banner1);
  var left=$(".floor-nav-bottom-leftbtn",banner1)[0];
  var right=$(".floor-nav-bottom-rightbtn",banner1)[0];
  var n=0;
  var next=0;
  var flag=true;
  function move(){
    if(!flag){
      return;
    }
    flag=false;
    next=n+1;
    if(next>=imgs.length){
      next=0;
    }
    for(var i=0;i<imgs.length;i++){
           imgs[i].style.background="#F2F2F2";
    }
    animate(imgs[n],{opacity:0},600)
    imgs[next].style.opacity = 0;
        animate(imgs[next],{opacity:1},600,function(){
          flag=true;
        })
        n=next;
    }
    function move1(){
      if(!flag){
      return;
    }
    flag=false;
      next=n-1;
      if(next<0){
        next=imgs.length-1;
      }
      for(var i=0;i<imgs.length;i++){
           imgs[i].style.background="#F2F2F2";
    }
    animate(imgs[n],{opacity:0},600);
    imgs[next].style.opacity = 0;
    
        animate(imgs[next],{opacity:1},600,function(){
          flag=true;
        })
        n=next;
    }
    left.onclick=function(){
      move1();
    }
    right.onclick=function(){
      move();
    }
  }
  bb();
}

  //楼层图片轮播
   var floor_center=$('.floor-center');//先获取每一个大盒子，再获取每一个大盒子下的内容
   for(var i=0;i<floor_center.length;i++){
    var aa=$('.floor-center')[i];//获取第i个大盒子并赋给aa
    var floorimgs=$('.floorimgs',aa);//获取aa下的floorimgs
    var diandian=$('.diandian',aa);
    var jt_left=$('.jt-left',aa)[0];
    var jt_right=$('.jt-right',aa)[0];
    doubleSubscript(aa,floorimgs,diandian,jt_left,jt_right);
  }
  //楼层跳转
    var floor=$(".floors");
    var lis=$(".sidebar-content");
    var box=$(".sidebar")[0];
    var cw=document.documentElement.clientWidth;
    var ch=document.documentElement.clientHeight;
    var sign=true;
    var bh=box.offsetHeight;
    box.style.top=(ch-bh)/2+"px";
    for (var i=0;i<lis.length;i++){
      lis[i].index=i;
      lis[i].onclick=function(){
        sign=false;
        var obj=document.documentElement.scrollTop? document.documentElement:document.body;
        var top=floor[this.index].offsetTop;
        // obj.scrollTop=top;
        animate(obj,{scrollTop:top},300,function(){
          sign=true;
        });
          for (var i = 0; i < lis.length; i++) {
              lis[i].style.background="none"
              lis[i].innerHTML=null;
            }
          var imgs=$(".sidebar-content");
          var aa=imgs[this.index].getAttribute("aa");
          lis[this.index].style.background="#e5004f";
          lis[this.index].innerHTML=aa;
      }

      //需要修改的地方
      // lis[i].onmouseover=function(){
      //   var imgs=$(".sidebar-content");
      //   var aa=imgs[this.index].getAttribute("aa");
      //   lis[this.index].style.background="#e5004f";
      //   lis[this.index].innerHTML=aa;
      // }
      // lis[i].onmouseout=function(){
      //   lis[this.index].style.background="none";
      //   lis[this.index].innerHTML=null;
      // }




      var flag=true;
      var flag1=true;
      window.onscroll=function(){
        if(!sign){
          return
        }
        var obj=document.documentElement.scrollTop? document.documentElement:document.body;
        for (var i=0;i<floor.length;i++){
          lis[i].index=i;
          if(obj.scrollTop>=(floor[i].offsetTop-ch+300)){
            for (var j = 0; j < lis.length; j++) {
              lis[j].style.background="none"
              lis[j].innerHTML=null;

              lis[j].onmouseover=function(){
               var imgs=$(".sidebar-content");
               var aa=imgs[this.index].getAttribute("aa");
               lis[this.index].style.background="#e5004f";
               lis[this.index].innerHTML=aa;
              }      
              lis[j].onmouseout=function(){
                lis[this.index].style.background="none";
                lis[this.index].innerHTML=null;
               }
              }




            var imgs=$(".sidebar-content");
            var bbb=imgs[i].getAttribute("aa");
            lis[i].style.background="#e5004f";
            lis[i].innerHTML=bbb;

          }
        }
        if(obj.scrollTop>=(floor[0].offsetTop-ch+300)){
          if(flag){//双开关
            flag=false;
            animate(box,{opacity:1},500,function(){
              flag1=true;
            });
          }
        }else{
          if(flag1){
            flag1=false;
            animate(box,{opacity:0},500,function(){
              flag=true;
            });
          }
        }
      }
    }



} 
  
    








  