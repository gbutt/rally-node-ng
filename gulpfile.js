var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var del = require('del');
var Server = require('karma').Server;

var DEST = 'dist/'

gulp.task('clean', function(){
	return del(DEST);
});

gulp.task('lint', function() {
  return gulp.src(['index.js', './src/**/*'])
    .pipe(jshint())
    .pipe(jshint.reporter('fail'))
    .on("error", function (err) { console.log("Error: " + err.message); })
    .pipe(jshint.reporter('jshint-stylish'))
    ;
});

gulp.task('browserify', ['clean', 'lint'], function(){
	return browserify('./index.js', { debug: true, extensions: ['.js'] })
		.bundle()
		.on("error", function (err) { console.log("Error: " + err.message); })
		.pipe(source('rallyNg.js'))
		.pipe(buffer())
		.pipe(gulp.dest(DEST));

});

gulp.task('compress', ['browserify'], function(){
	return gulp.src(DEST+'rallyNg.js')
		.pipe(sourcemaps.init())
		.pipe(concat('rallyNg.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(DEST))
});

gulp.task('build', ['clean', 'browserify', 'compress']);

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});