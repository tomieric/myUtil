/**
 * js弹出窗口被阻止提示
 * 高程 P202
 */
var winBlocked = (function() {
	/**
	 * 执行函数
	 * @param  {string} url 新开窗口url
	 * @param  {string} id  
	 */
	return function(url, id, st) {
		var blocked = false;

		try {
			var win = window.open(url, id, st);
			if(win == null) {
				blocked = true;
			}
		} catch( e ) {
			blocked = true;
		}

		return blocked;
	}
})();
