var taskName = require('./task.js');
var dirName = require('./dirName.js');

var index = (CSS_DIR, JS_DIR) => {
	//不使用*而手动定义资源加载顺序
	var taskList = {
		index: {
			css: [
				CSS_DIR + "/element-ui.css",
				CSS_DIR + "/style.css"
			],
			js: [
				JS_DIR + "/vue.js",
				JS_DIR + "/elementUI.js",
				JS_DIR + "/index.js"
			],
			less: [
				dirName.SRC.less + "/" + taskName + "/style.less"
			]
		}
	};
	if (typeof taskList[taskName] == 'undefined') {
		taskList[taskName] = {
			css: CSS_DIR + '/*.css',
			js: JS_DIR + '*.js',
			less: [
				dirName.SRC.less + "/*.less"
			]
		};
	}
	return taskList[taskName];
};
module.exports = index;