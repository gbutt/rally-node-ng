var gulp = require('gulp');
// var browserify = require('browserify');
// var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
// var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var Server = require('karma').Server;

// gulp.task('build', function(){
// 	return browserify('./lib/ngRally.module.js', { debug: true, extensions: ['.js'] })
// 		// .transform(babelify, {presets: ['es2015']})
// 		.bundle()
// 		.on("error", function (err) { console.log("Error: " + err.message); })
// 		.pipe(source('ngRally.js'))
// 		.pipe(buffer())
// 		// .pipe(ngAnnotate())
// 		.pipe(uglify())
// 		.pipe(gulp.dest('./dist/'));
// });

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