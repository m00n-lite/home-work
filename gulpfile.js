var gulp = require('gulp');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var urlAdjuster = require('gulp-css-url-adjuster');
var print = require('gulp-print');
var util = require('gulp-util');

var projectList = []; //list of tasks,system variable, don't use it. Instead use getAllprojects()  
var errors = []; //list of errors
var 
	dest  = 'web/assets',//detenation folder
	bower = 'bower_components',//bower folder
	src   = 'src'; //local css,js,img

var projects = {
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
	gulp.src(projects.fonts)
		.pipe(!util.env.production ? printFileList() : util.noop())
    	.pipe(gulp.dest(dest+'/fonts'));
  	});
gulp.task('images', function() {
	gulp.src(projects.images)
		.pipe(!util.env.production ? printFileList() : util.noop())
    	.pipe(gulp.dest(dest+'/img'));
    	
});
gulp.task('mainjs', function() {
  	gulp.src(projects.mainjs)
  		.pipe(!util.env.production ? printFileList() : util.noop())
  		.pipe(concat('main.js'))
  		.pipe(gulp.dest(dest+'/js'));
});
gulp.task('maincss', function() {
  	gulp.src(projects.maincss)
  		.pipe(!util.env.production ? printFileList() : util.noop())
  		.pipe(urlAdjuster({replace:  ['../images','../img']}))
  		.pipe(csso())
  		.pipe(concat('main.css'))
  		.pipe(gulp.dest(dest+'/css'));		
});
gulp.task('mapcss', function() {
	gulp.src(projects.mapcss)
		.pipe(!util.env.production ? printFileList() : util.noop())
    	.pipe(urlAdjuster({replace:  ['images','../img']}))
  		.pipe(csso())
  		.pipe(concat('map.css'))
  		.pipe(gulp.dest(dest+'/css'));
});
gulp.task('mapjs', function() {
	gulp.src(projects.mapjs)
		.pipe(!util.env.production ? printFileList() : util.noop())
  		.pipe(concat('map.js'))
  		.pipe(gulp.dest(dest+'/js'));
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

gulp.task('default', getAllprojects(), printErrors(), onEnd());
/*
Other ways to start tasks
1)
gulp.task('default', function() {
	gulp.start('maincss');
	gulp.start('mainjs'); 
	gulp.start('mainfonts');

});
2)
gulp.task('default', [task1,task2...]
*/

/*
	function returns a list of all projects for which created the tasks 
	and log the projects for witch tasks in not created
	using example gulp.task('default', getAllTasks());
*/
function getAllprojects(){
	if(projectList.length) return projectList;//Simple result caching
	for(i in projects){
		if(gulp.tasks[i]) projectList.push(i);		
		else {
			errors.push('Task "'+i+ '" Not found! Please create task with name "'+i+'" for project "'+i+'"');
		}
	}
	return projectList;
}
function printErrors(){
	if(!errors.length)return;
	console.log('Errors:');
	for(i in errors){
		console.log(errors[i]);
	}
}
function printFileList(){
	return print(function(filepath) {
      		return "built: " + filepath + " processed";
    	})
}
function onEnd(){
	if(util.env.production)return;
	gulp.start('watch');
}
