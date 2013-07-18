/*
 * floatBar v1.0
 * Copyright (c) 2013 Wendell  http://blog.webql.info/
 * https://github.com/wendellvian/floatBar.git

*/
/*
//	liveHeight:360,	// 活动高度: 取0时边栏位置为固定样式
//	bodyWidth:960,	// 页面布局宽度
//	winMinHeight:600,	// 浏览器最小高度
//	topFixHeight:30,	// 顶部Fixed层的高度 middle:top共用
//	spaceWidth:10,	// 浮动边栏与页面的间距
//	align:"right",	// 浮动边栏左右停靠方式：right | left
//	middle:"bottom",	// 浮动边栏上下停靠方式：bottom | top
//	speed:300,	// 速度：非0毫秒数值 | "slow" | "fast"
//	aniOnOff:true,	// 效果开关：true | false
//	moveOnOff:true	// 运动开关：true | false
*/

(function($){
	$.fn.extend({
		floatBar:function(options){
			var defaults = {
				liveHeight:360,
		    	bodyWidth:960,
		    	winMinHeight:600,
		    	topFixHeight:30,
		    	spaceWidth:10,
		    	align:"right",
		    	middle:"bottom",
		    	speed:300,
		    	aniOnOff:true,
		    	moveOnOff:true
			}
			var options = $.extend(defaults,options);
			var thisObj = $(this);

			function dataEle(attrObj){
				switch(options.middle){
					case "bottom":
						thisObj.data(attrObj,parseInt(thisObj.css(attrObj)));	// 存储样式表中bottom的值
						return thisObj.data(attrObj);
					break;
					case "top":
						thisObj.data(attrObj,parseInt(thisObj.css(attrObj)));	// 存储样式表中top的值
						if(navigator.userAgent.indexOf("MSIE 6")!=-1){
							thisObj.data(attrObj,parseInt(thisObj.css("margin-top")));
						}
						return thisObj.data(attrObj);
					break;
				}
			}
			var dataConBottom = dataEle("bottom");	// 提取bottom值
			var dataConTop = dataEle("top");	// 提取bottom值
			var posiObj = posiEle();	//	首次函数加载
			thisObj.show();

			function posiEle(){
				var posiAlign;
				var posi = {};
					posi.oWinWidth = $(window).width();
					posi.oWinHeight = $(window).height();
					posi.oFloatElementWidth = thisObj.width();	// 浮动边栏宽度
					oWinTop = $(window).scrollTop();	// 滚动条首次距离顶部的坐标

				var posiRight = (posi.oWinWidth-options.bodyWidth)/2 - posi.oFloatElementWidth - options.spaceWidth;
				// 左侧窗口停靠，相当left:0
				var posiLeft = posiRight + (options.bodyWidth + posi.oWinWidth)/2 + options.spaceWidth;
				// 左侧页面停靠
				var posiLeftExp = posiLeft - (posi.oWinWidth-options.bodyWidth)/2 + posi.oFloatElementWidth + options.spaceWidth;
				
				// 浏览器可视窗口大小判断
				if(posi.oWinWidth <= (((posi.oWinWidth-options.bodyWidth)/2) + options.bodyWidth + posi.oFloatElementWidth + options.spaceWidth)){
					switch(options.align){
						case "right":
							posiAlign = {right:'0'};
						break;
						case "left":
							posiAlign = {right:posiLeft};
						break;
					}
					thisObj.css(posiAlign);
				}else{
					switch(options.align){
						case "right":
							posiAlign = {right:posiRight};
						break;
						case "left":
							posiAlign = {right:posiLeftExp};
						break;
					}
					thisObj.css(posiAlign);
				}

				options.moveOnOff ? chaScroll(posi) : " ";

				return posi;
			}

			function chaScroll(cObj){
				var floSwi = function(fT,fB){
					switch(options.middle){
						case "bottom":
							options.aniOnOff ? thisObj.stop().animate(fT,options.speed) : thisObj.css(fT);
						break;
						case "top":
							options.aniOnOff ? thisObj.stop().animate(fB,options.speed) : thisObj.css(fB);
						break;
					}
				}

				if(navigator.userAgent.indexOf("MSIE 6")!=-1){	// 判断IE6
					if(oWinTop < options.liveHeight && cObj.oWinHeight > options.winMinHeight){
						floSwi({marginTop:"0"},{marginTop:dataConTop});
					}else if(oWinTop < options.liveHeight && cObj.oWinHeight < options.winMinHeight){
						floSwi({marginTop:"0"},{marginTop:options.topFixHeight});
					}else if(oWinTop > options.liveHeight && cObj.oWinHeight > options.winMinHeight){
						floSwi({marginTop:-dataConBottom},{marginTop:options.topFixHeight});
					}else if(oWinTop > options.liveHeight && cObj.oWinHeight < options.winMinHeight){
						floSwi({marginTop:"0"},{marginTop:options.topFixHeight});
					}
				}
				else{
					if(oWinTop < options.liveHeight && cObj.oWinHeight > options.winMinHeight){
						floSwi({bottom:"0"},{top:dataConTop});
					}else if(oWinTop < options.liveHeight && cObj.oWinHeight < options.winMinHeight){
						floSwi({bottom:"0"},{top:options.topFixHeight});
					}else if(oWinTop > options.liveHeight && cObj.oWinHeight > options.winMinHeight){
						floSwi({bottom:dataConBottom},{top:options.topFixHeight});
					}else if(oWinTop > options.liveHeight && cObj.oWinHeight < options.winMinHeight){
						floSwi({bottom:"0"},{top:options.topFixHeight});
					}
				}
			}

			// 重置尺寸大小事件
			$(window).resize(function (){
				var posiObj = posiEle();
			});

			// 滚动事件
			$(window).scroll(function(){
				oWinTop = $(window).scrollTop();	// 滚动条滚动时距离顶部的坐标
				options.moveOnOff ? chaScroll(posiObj) : " ";
			});

			return $(this);
		}
	});
})(jQuery);
