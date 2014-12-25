var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var minifyCSS = require('gulp-minify-css');
var jade = require('gulp-jade');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var livereload = require('gulp-livereload');
var connect = require('connect');
var serveStatic = require('serve-static');

gulp.task('stylus', function() {
  gulp.src('./src/css/**/*.styl')
    .pipe(stylus({use: nib()}))
    .on('error', console.log)
    .pipe(gulp.dest('./dest/css/'))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('./dest/css/'))
    .pipe(livereload());
});

gulp.task('templates', function() {
  return gulp.src('src/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dest/'))
    .pipe(livereload());
});

gulp.task('js', function() {
  return gulp.src(['src/js/**/*.js'])
    .pipe(gulp.dest('./dest/js/'))
    .pipe(livereload());
});

gulp.task('imagemin',function(){
   return gulp.src('./src/img/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./dest/img/'));
});

gulp.task('server', function() {
	connect()
	  .use(require('connect-livereload')())
	  .use(serveStatic(__dirname + '/dest'))
	  .listen('3000');

	console.log('Server is running on http://localhost:3000');
});


gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('./src/css/*.styl',['stylus']);
  gulp.watch('./src/**/*.jade',['templates']);
  gulp.watch('./src/img/**/*',['imagemin']);
  gulp.watch('./src/js/**/*',['js']);
  gulp.start('server');
});

gulp.task('product', ['stylus','templates','imagemin','js'], function() {
  gulp.src(['./dest/css/style.css',
            './dest/css/media.css',
    ])
		.pipe(concat('_main.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dest/css'));

  gulp.src(['./dest/js/vendor/jquery-1.11.0.min.js',
            './dest/js/scripts.js',
    ])
    .pipe(uglify())
    .pipe(concat('_main.min.js'))
    .pipe(gulp.dest('./dest/js'));
});

gulp.task('default',['watch','stylus','templates','imagemin','js']);