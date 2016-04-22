var gulp = require('gulp');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var urlAdjuster = require('gulp-css-url-adjuster');
var print = require('gulp-print');

var 
	dest = 'web/assets',//detenation folder
	bower = 'bower_components',//bower folder
	src = 'src'; //local css,js,img
var progect = {
	test : [
	],
	images : [
	    bower+'/leaflet/dist/images/*',
		bower+'/leaflet-draw/dist/images/*',
		src+'/msgGrowl/images/*'
	],

	mainjs : [
	    bower+'/jquery/dist/jquery.min.js',
		bower+'/bootstrap/dist/js/bootstrap.min.js',
		src+'/msgGrowl/js/msgGrowl.min.js'
	],
	maincss : [
		bower+'/bootstrap/dist/css/bootstrap.min.css',
		src+'/msgGrowl/css/msgGrowl.css',
		src+'/header/*.css'
	],
	mapcss : [
		bower+'/leaflet/dist/leaflet.css',
		bower+'/leaflet-draw/dist/leaflet.draw.css'
	],
	mapjs : [
		bower+'/leaflet/dist/leaflet.js',
		bower+'/leaflet-plugins/control/Layers.Load.js',
		bower+'/leaflet-plugins/layer/tile/Bing.js',
		bower+'/leaflet-plugins/layer/tile/Google.js',
		bower+'/leaflet-draw/dist/leaflet.draw.js'
	],
	fonts : [
		bower+'/bootstrap/dist/fonts/*'
	]
}

gulp.task('fonts', function() {
	gulp.src(progect.fonts)
  		.pipe(print(function(filepath) {
      		return "built: " + filepath + " processed";
    	}))
    	.pipe(gulp.dest(dest+'/fonts'));
  	});
gulp.task('images', function() {
	gulp.src(progect.images)
  		.pipe(print(function(filepath) {
      		return "built: " + filepath + " processed";
    	}))
    	.pipe(gulp.dest(dest+'/img'));
});
gulp.task('mainjs', function() {
  	gulp.src(progect.mainjs)
  		.pipe(print(function(filepath) {
      		return "built: " + filepath + " processed";
    	}))
  		.pipe(concat('main.js'))
  		.pipe(gulp.dest(dest+'/js'));
  		
});
gulp.task('maincss', function() {
  	gulp.src(progect.maincss)
  		.pipe(print(function(filepath) {
      		return "built: " + filepath + " processed";
    	}))
  		.pipe(urlAdjuster({replace:  ['../images','../img']}))
  		.pipe(csso())
  		.pipe(concat('main.css'))
  		.pipe(gulp.dest(dest+'/css'));
});
gulp.task('mapcss', function() {
	gulp.src(progect.mapcss)
		.pipe(print(function(filepath) {
      		return "built: " + filepath + " processed";
    	}))
    	.pipe(urlAdjuster({replace:  ['images','../img']}))
  		.pipe(csso())
  		.pipe(concat('map.css'))
  		.pipe(gulp.dest(dest+'/css'));
});
gulp.task('mapjs', function() {
	gulp.src(progect.mapjs)
		.pipe(print(function(filepath) {
      		return "built: " + filepath + " processed";
    	}))
  		.pipe(concat('map.js'))
  		.pipe(gulp.dest(dest+'/js'));
});
gulp.task('watch',function(){
	for (i in progect){
		if(gulp.tasks[i]){
			gulp.watch(progect[i], [i]);
			console.log('Task '+i+' watch started');
		}
		else{
			console.log('Task "'+i+ '" Not found! Please create task with name "'+i+'" for progect "'+i+'"'); 
		}
	}
});
gulp.task('default', getAllTasks());
/*
Other ways to start tasks
1)
gulp.task('default', function() {
	gulp.start('maincss');
	gulp.start('mainjs'); 
	gulp.start('mainfonts');

});
2)
gulp.task('default', []
*/

/*
	function returns a list of all tasks except the active
	just for fun but can be useful
	using example gulp.task('default', getAllTasks());
	will run all tasks exept default wich is active to avoid loop))
*/

function getAllTasks(){
	var tasks = [];
	for(i in gulp.tasks){
		if(!gulp.tasks[i].running) tasks.push(i);		
	}
	return tasks;
}