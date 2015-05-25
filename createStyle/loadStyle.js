/**
 * 动态链接外部css样式
 * by tomieric
 */

(function() {

	loadStyle = function(url, id){
		if(!url) return;
		if(!!id) link.id = id;
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		document.getElementsByTagName('head')[0].appendChild(link);
	}
	
}).call(this);