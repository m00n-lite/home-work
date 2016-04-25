var gulp = require('gulp');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var urlAdjuster = require('gulp-css-url-adjuster');
var print = require('gulp-print');
var util = require('gulp-util');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');

var 
	dest    = 'web/assets/',//detenation folder
	bower   = 'bower_components/',//bower folder
	src     = 'src/', //local css,js,img
	layouts = 'web/views/layouts/';

var projects = {
	images : [
	    bower+'leaflet/dist/images/*',
		bower+'leaflet-draw/dist/images/*',
		src +'msgGrowl/images/*'
	],

	mainjs : [
	    bower+'jquery/dist/jquery.min.js',
		bower+'bootstrap/dist/js/bootstrap.min.js',
		src+'msgGrowl/js/msgGrowl.min.js',
		src+'main/main.js'
	],
	maincss : [
		bower+'bootstrap/dist/css/bootstrap.min.css',
		src+'msgGrowl/css/msgGrowl.css',
		src+'header/*.css'
	],
	mapcss : [
		bower+'leaflet/dist/leaflet.css',
		bower+'leaflet-draw/dist/leaflet.draw.css'
	],
	mapjs : [
		bower+'leaflet/dist/leaflet.js',
		bower+'leaflet-plugins/control/Layers.Load.js',
		bower+'leaflet-plugins/layer/tile/Bing.js',
		bower+'leaflet-plugins/layer/tile/Google.js',
		bower+'leaflet-draw/dist/leaflet.draw.js',
		src+'map/map.js'
	],
	fonts : [
		bower+'bootstrap/dist/fonts/*'
	],
}
gulp.task('clean', function () {
  return gulp.src(dest, {read: false})
    .pipe(clean());
});
gulp.task('fonts', function() {
	gulp.src(projects.fonts)
		.pipe(!util.env.production ? print() : util.noop())
    	.pipe(gulp.dest(dest+'fonts'));
  	});
gulp.task('images', function() {
	gulp.src(projects.images)
		.pipe(!util.env.production ? print() : util.noop())
    	.pipe(gulp.dest(dest+'img'));
    	
});
gulp.task('mainjs', function() {
var sources = gulp.src(projects.mainjs)
					.pipe(!util.env.production ? print() : util.noop())
			  		.pipe(util.env.production ? concat('main.js') : util.noop())
			  		.pipe(gulp.dest(dest+'js'));
var target = gulp.src(layouts+'footer.php');
					return target.pipe(inject(sources,{starttag: '<!-- inject:head:{{ext}} -->',ignorePath: 'web',
                addRootSlash: false}))
					.pipe(gulp.dest(layouts));
});
gulp.task('maincss', function() {
var sources = gulp.src(projects.maincss)
			  		.pipe(!util.env.production ? print() : util.noop())
			  		.pipe(urlAdjuster({replace:  ['../images','../img']}))
			  		.pipe(util.env.production ? csso() : util.noop())
			  		.pipe(util.env.production ? concat('main.css') : util.noop())
			  		.pipe(gulp.dest(dest+'css'));		
var target = gulp.src(layouts+'header.php');
					return target.pipe(inject(sources,{starttag: '<!-- inject:head:{{ext}} -->',ignorePath: 'web',
                addRootSlash: false}))
					.pipe(gulp.dest(layouts));

});
gulp.task('mapcss', function() {
var sources = gulp.src(projects.mapcss)
			  		.pipe(!util.env.production ? print() : util.noop())
			  		.pipe(urlAdjuster({replace:  ['images','../img']}))
			  		.pipe(util.env.production ? csso() : util.noop())
			  		.pipe(util.env.production ? concat('map.css') : util.noop())
			  		.pipe(gulp.dest(dest+'css'));		
var target = gulp.src(layouts+'header.php');
					return target.pipe(inject(sources,{starttag: '<!-- inject:map:{{ext}} -->',ignorePath: 'web',
                addRootSlash: false}))
					.pipe(gulp.dest(layouts));
});

gulp.task('mapjs', function() {
var sources = gulp.src(projects.mapjs)
					.pipe(!util.env.production ? print() : util.noop())
			  		.pipe(util.env.production ? concat('map.js') : util.noop())
			  		.pipe(gulp.dest(dest+'js'));
var target = gulp.src(layouts+'footer.php');
					return target.pipe(inject(sources,{starttag: '<!-- inject:map:{{ext}} -->',ignorePath: 'web',
                addRootSlash: false}))
					.pipe(gulp.dest(layouts));
});
gulp.task('watch',function(){
	for(i in projects){
		var watcher= gulp.watch(projects[i],[i]);
		watcher.on('change',function(event) {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
		console.log("Task "+i+" added to watch");
	}
});
gulp.task('default', function(callback) {
 return  runSequence(
 						'clean',
 						'maincss',
 						'mapcss',
 						'mainjs',
 						'mapjs',
 						['fonts','images'],
 						!util.env.production ? ['watch'] : callback);
});