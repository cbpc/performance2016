var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel'),
	babelHelpers = require('gulp-babel-external-helpers'),

	//CSS/LESS/IMG
	less = require('gulp-less'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	spritesmith = require('gulp.spritesmith'),
	imagemin = require('gulp-imagemin'),
	//js
	sourcemaps = require('gulp-sourcemaps'),
	jshint = require('gulp-jshint'),

	//版本号、HTML压缩、数据清理
	rev = require('gulp-rev'),
	revReplace = require("gulp-rev-replace"),
	htmlmin = require('gulp-htmlmin'),
	clean = require('gulp-clean'),

	//同步
	runSequence = require('run-sequence'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),

	//生产环境部署
	gulpif = require('gulp-if'),
	argv = require('yargs').argv;

//是否为生产环境 加参数 -p
var PRODUCTION = argv.p;

var notify = require('gulp-notify');
var onError = notify.onError({
	title: 'Gulp',
	subtitle: 'Failure!',
	message: 'Error: <%= error.message %>',
	sound: 'Beep'
});

var dirName = require('./settings/dirName.js');
var SRC = dirName.SRC,
	DEST = dirName.DEST;

var getAssetsOrder = require('./settings/assetsOrder.js');
var assetsListOrder = getAssetsOrder(SRC.css, SRC.jsDest);

var taskName = require('./settings/task.js');

/**
 * 文件复制
 */
gulp.task('copyjs', function() {
	return gulp.src(DEST.css + '/*.js')
		.pipe(gulp.dest(DEST.js));
});

gulp.task('copyimg', function() {
	if (PRODUCTION) {
		gulp.src(SRC.less + '/*.png')
			.pipe(gulp.dest(DEST.css));
	} else {
		gulp.src(SRC.img + '/*.*')
			.pipe(gulp.dest(SRC.imgDest))
			.pipe(connect.reload());
		gulp.src(SRC.less + '/*.png')
			.pipe(gulp.dest(SRC.cssDest));
	}
});

gulp.task('copyfont', function() {
	return gulp.src(SRC.fonts)
		.pipe(gulp.dest(SRC.fontsDest))
		.pipe(connect.reload());
});

gulp.task('copyhtml', function() {
	return gulp.src('./src/' + taskName + '.html')
		.pipe(gulp.dest(SRC.contentDest))
		.pipe(connect.reload());
});

gulp.task('less', function() {

	console.log('(1/4)正在编译less文件...');
	//, '!src/less/sprite.less'
	return gulp.src(['src/less/**/*.less', 'src/less/*.less'])
		.pipe(plumber({ //plumber触发错误提示
			errorHandler: onError
		}))
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'Android >= 4.0'],
			cascade: true, //是否美化属性值 默认：true 像这样：
			remove: true //是否去掉不必要的前缀 默认：true
		}))
		.pipe(gulp.dest(SRC.css));
});

//合并css文件
gulp.task('css', function() {
	console.log('(1.5/4)正在组合CSS文件...');
	return gulp.src(assetsListOrder.css)
		.pipe(gulpif(PRODUCTION, cleanCSS({
			advanced: false,
			compatibility: 'ie7',
			keepBreaks: false
		})))
		.pipe(concat('index' + '.css'))
		.pipe(gulp.dest(SRC.cssDest))
		.pipe(connect.reload());
});

//开发环境
gulp.task('js', function() {
	var jsList = getAssetsOrder(SRC.css, SRC.js);
	return gulp.src(jsList.js)
		.pipe(plumber({ //plumber触发错误提示
			errorHandler: onError
		}))
		.pipe(babel({
			presets: [
				["es2015", {
					"modules": false
				}], //转换es6代码
				'es2016',
				'stage-0', //指定转换es7代码的语法提案阶段
			],
			plugins: [
				'transform-object-assign', //转换es6 Object.assign插件
				//'external-helpers', //将es6代码转换后使用的公用函数单独抽出来保存为babelHelpers
				['transform-es2015-classes', {
					"loose": false
				}], //转换es6 class插件
				['transform-es2015-modules-commonjs', {
					"loose": false
				}], //转换es6 module插件

				//'transform-runtime' //报 runtime错误
				// , ["transform-regenerator", {
				// 	asyncGenerators: false, // true by default
				// 	generators: false, // true by default
				// 	async: false // true by default
				// }]
			],
			"ignore": [
				SRC.js + "/vue.js",
				SRC.js + "/elementUI.js"
			]
		}))
		//.pipe(babelHelpers('babelHelpers.js'))
		.pipe(gulp.dest(SRC.jsDest));
});

//生产环境
gulp.task('browser-js', function() {

	//require加载器(用babel会导致yield,generator等无法使用)
	var babelify = require("babelify"),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer'),
		browserify = require('browserify');

	var jsList = getAssetsOrder(SRC.css, SRC.js);
	return browserify({
			entries: jsList.js
		})
		.transform(babelify, {
			presets: [
				'es2015',
				"es2016",
				'stage-0', //指定转换es7代码的语法提案阶段
			],
			plugins: [
				'transform-object-assign', //转换es6 Object.assign插件
				'external-helpers', //将es6代码转换后使用的公用函数单独抽出来保存为babelHelpers
				['transform-es2015-classes', {
					"loose": false
				}], //转换es6 class插件
				['transform-es2015-modules-commonjs', {
					"loose": false
				}], //转换es6 module插件
				'transform-runtime', ['transform-regenerator', {
					asyncGenerators: false, // true by default
					generators: false, // true by default
					async: false // true by default
				}]
			]
		})
		.bundle()
		.pipe(plumber({ //plumber触发错误提示
			errorHandler: onError
		}))
		.pipe(source('./' + taskName + '.js')) //将常规流转换为包含Stream的vinyl对象，并且重命名
		.pipe(buffer()) //将vinyl对象内容中的Stream转换为Buffer
		.pipe(babelHelpers('babelHelpers.js'))
		.pipe(gulp.dest(SRC.jsDest));
});

gulp.task('concat-js', function() {
	return gulp.src([SRC.jsDest + '/babelHelpers.js'].concat(assetsListOrder.js))
		.pipe(plumber({ //plumber触发错误提示
			errorHandler: onError
		}))
		//.pipe(sourcemaps.init()) //生成sourcemap
		.pipe(gulpif(PRODUCTION, jshint())) // 对这些更改过的文件做一些特殊的处理...
		//.pipe(header('(function () {')) // 比如 jshinting ^^^
		//.pipe(footer('})();')) // 增加一些类似模块封装的东西
		.pipe(concat(taskName + '.js'))
		.pipe(gulpif(!PRODUCTION, gulp.dest(SRC.jsDest))) //开发测试期间，有sourceMap
		.pipe(gulpif(PRODUCTION, uglify())) //压缩
		.pipe(gulpif(PRODUCTION, gulp.dest(SRC.jsDevelop))) //正式发布，无sourceMap
		//.pipe(sourcemaps.write())
		.pipe(connect.reload());
});

gulp.task("clean", function() {
	return gulp.src(DEST.build)
		.pipe(clean());
});

gulp.task("revision", function() {
	console.log('(3/4)版本号处理...');
	return gulp.src([SRC.cssDest + "/*.css", SRC.jsDevelop + "/*.js"])
		.pipe(rev())
		.pipe(gulp.dest(DEST.css))
		.pipe(rev.manifest())
		.pipe(gulp.dest(DEST.manifest));
});

gulp.task('handlejs', ['copyjs'], function() {
	return gulp.src(DEST.css + '/*.js')
		.pipe(clean());
});

gulp.task('img', function() {
	return gulp.src(SRC.img + '/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest(DEST.img));
});

gulp.task('sprite', function() {
	return gulp.src(SRC.img + '/*.png')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.less',
			cssFormat: 'less'
		}))
		.pipe(gulp.dest(SRC.less));
});

gulp.task("zip-html", function() {
	console.log('(4/4)html压缩...');
	var manifest = gulp.src(DEST.manifest + "/rev-manifest.json");
	var options = {
		removeComments: true, //清除HTML注释
		collapseWhitespace: true, //压缩HTML
		collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
		minifyJS: true, //压缩页面JS
		minifyCSS: true //压缩页面CSS
	};

	return gulp.src("src/" + taskName + ".html")
		.pipe(revReplace({
			manifest: manifest
		}))
		.pipe(htmlmin(options))
		.pipe(gulp.dest('dist'));
});

gulp.task('connect', function() {
	connect.server({
		root: 'develop',
		port: 8000,
		livereload: true
	});
});

//开发环境监测
gulp.task('watch', function() {
	gulp.watch(['./src/*.html'], ['copyhtml']);
	gulp.watch(['./src/assets/**/*.js'], function() {
		runSequence('js', 'concat-js');
	});
	gulp.watch(['./src/less/*.less'], function() {
		runSequence('less', 'css');
	});
	gulp.watch(['./src/assets/**/*.jpg', './src/assets/**/*.png', './src/assets/**/*.svg'], function() {
		runSequence('img', 'copyimg');
	});
	gulp.watch(['./src/assets/**/*.css'], ['css']);
});

gulp.task('default', function(callback) {
	if (PRODUCTION) {
		runSequence('clean', /*'sprite',*/ 'less', ['img', 'css', 'browser-js'], 'concat-js', 'revision', ['zip-html', 'handlejs', 'copyimg', 'copyfont', 'copyhtml']);
	} else {
		runSequence('clean', /*'sprite',*/ 'less', ['css', 'js'], 'concat-js', ['copyimg', 'copyfont', 'copyhtml']);
	}
});

gulp.task('dev', function(callback) {
	runSequence('connect', 'watch');
});