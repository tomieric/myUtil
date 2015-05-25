/**
 * 动态创建css样式
 * by tomieric
 */

(function() {

	createStyle = function(cssText){
		var style = document.createElement('style');
		style.type= 'text/css';
		if(style.innerText) { // 标准浏览器
			style.innerText = cssText;
		} else { // IE
			style.styleSheet.cssText = cssText;
		}

		document.getElementsByTagName('head')[0].appendChild(style);
	}
	
}).call(this);