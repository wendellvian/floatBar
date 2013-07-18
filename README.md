jQuery FloatBar Plugin
========

**基于jQuery的浮动边栏插件**

这是一个用于控制页面主体以外的容器定位插件，分左上，左下，右上，右下四个方位排布。

```js
	liveHeight:360,                       // 活动高度: 取0时边栏位置为固定样式
	bodyWidth:960,                        // 页面布局宽度
	winMinHeight:600,                     // 浏览器最小高度
	topFixHeight:30,                      // 顶部Fixed层的高度 middle:top共用
	spaceWidth:10,                        // 浮动边栏与页面的间距
	align:"right",                        // 浮动边栏左右停靠方式：right | left
	middle:"bottom",                      // 浮动边栏上下停靠方式：bottom | top
	speed:300,                            // 速度：非0毫秒数值 | "slow" | "fast"
	aniOnOff:true,                        // 效果开关：true | false
	moveOnOff:true                        // 运动开关：true | false
```


**使用方法**
```js
	$(element).floatBar();
	// 浮动边栏默认右下方
	
	$(element).floatBar({
	middle:"top"
	});
	// 右上方 可以追加设置topFixHeight的值
	
	$(element).floatBar({
	middle:"top",
	align:"left"
	});
	// 左上方 可以追加设置topFixHeight的值
	
	$(element).floatBar({
	align:"left"
	});
	// 左下方
```

**CSS写法**
```css
	/* 上方（包含左上方和右上方） */
	element{top:value;}
	childelement{width:value;height:value;...}
	
	/* 下方（包含左下方和右下方） */
	element{bottom:value}
	childelement{width:value;height:value;...}
	
	/* 兼容IE6浏览器写法*/
	*html element{margin-top:value;}         /* 上方（包含左上方和右上方） */
	*html element{margin-top:-value;}        /* 下方（包含左下方和右下方） */
```

**HTML写法**
```html
	<!-- 下方 -->
	<div class="element JQUI-FloBarDown">
	...
	</div>
	
	<!-- 上方 -->
	<div class="element JQUI-FloBarUp">
	...
	</div>
```
===============================================================================

*增加参数*
```js
	eleFocus:"focus",                     // 焦点：class="focus"
	eleName:"back",                       // 元素名称
	eleLabel:"li",                        // 结构标签
	anchorIndex:"anchor-index",           // 锚节点
	eleMargin:10,                         // 板块间距
	mouseCtrl:"click",                    // 鼠标事件：click | mouseover
	focusOnOff:true                       // 滚动获焦开关：false | true
```

*增加锚节点*
```html
	<div anchor-index="1">...</div>
	<div anchor-index="2">...</div>
	...
	<!-- anchor-index可自定义 -->
	<!-- 传值 -> anchorIndex:"自定义" -->
	<!-- 如：<div aaa="1">...</div> -->
	<!-- 传值 -> anchorIndex:"aaa" -->
```

*增加滚动获焦功能*
```html
	<!-- 默认结构 -->
	<div>
		<ul>
			<li class="focus">...</li>
			<li>...</li>
			...
		</ul>
	</div>
	<!-- 标签 && 类 可自定义 -->
	<!-- 传值 -> eleLabel:"自定义" -->
	<!-- 传值 -> eleFocus:"自定义" -->
	<div>
		<a class="bar" href="javascript:;">...</a>
		<a href="javascript:;">...</a>
		...
	</div>
	<!-- 如：eleLabel:"a" -->
	<!-- 如：eleFocus:"bar" -->
```

*增加获焦关闭功能(焦点不可见)*
```js
	focusOnOff:false
```

*增加置顶置底功能*
```html
	<a href="javascript:;" class="backtop">返回顶部</a>
	<a href="javascript:;" class="backbottom">去底部</a>
	<!-- 标签可自定义 -->
	<!-- class需遵循规则 -> 自定义+top || 自定义+bottom -->
	<!-- 传值 -> eleName:"自定义" -->
```






