var gulp        = require('gulp');
var stylus      = require('gulp-stylus');
var nib         = require('nib');
var minifyCSS   = require('gulp-minify-css');
var jade        = require('gulp-jade');
var imagemin    = require('gulp-imagemin');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require("gulp-rename");
var webserver   = require('gulp-webserver');
var useref      = require('gulp-useref');
var gulpif      = require('gulp-if');

var path = {
  SRC: 'src/',
  SRC_STYL: 'src/css/**/*.styl',
  SRC_CSS: 'src/css/**/*.css',
  SRC_JS: 'src/js/**/*.js',
  SRC_BOWER: 'src/bower_components/**/*',
  SRC_FONTS: 'src/fonts/**/*.*',
  SRC_IMG: 'src/img/**/*',
  JADE: 'src/**/*.jade',
  DEST: 'dest/',
  DEST_CSS: 'dest/css/',
  DEST_JS: 'dest/js/',
  DEST_BOWER: 'dest/bower_components/',
  DEST_FONTS: 'dest/fonts/',
  DEST_IMG: 'dest/img/',
  DEST_HTML: 'dest/*.html',
  BUILD: 'build/',
  BUILD_IMG: 'build/img/',
};

/**
 * Compile stylus to css and replace to dest folder
 */
gulp.task('stylus', function() {
  gulp.src([path.SRC_STYL])
    .pipe(stylus({
      use: [nib()],
      url: {
        name: 'inline-image',
        limit: false
      }
    }))
    .on('error', console.log)
    .pipe(gulp.dest(path.DEST_CSS));
    // .pipe(minifyCSS({keepSpecialComments: 0}))
    // .pipe(rename({suffix: ".min"}))
    // .pipe(gulp.dest('dest/css/'));
});

/**
 * Compile jade to html and replace to dest folder
 */
gulp.task('templates', function() {
  gulp.src(path.JADE)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(path.DEST));
});

/**
 * Copy all not compiled files to dest folder
 */
gulp.task('assets', function() {
  gulp.src(path.SRC_JS)
    .pipe(gulp.dest(path.DEST_JS));
  gulp.src(path.SRC_BOWER)
  .pipe(gulp.dest(path.DEST_BOWER));
  gulp.src(path.SRC_FONTS)
    .pipe(gulp.dest(path.DEST_FONTS));
  gulp.src(path.SRC_CSS)
    .pipe(gulp.dest(path.DEST_CSS));
});

/**
 * Minify all images and replace to dest folder
 */
gulp.task('imagemin',function(){
   gulp.src(path.SRC_IMG)
    .pipe(imagemin({
      progressive: true,
    }))
    .pipe(gulp.dest(path.DEST_IMG));
});

/**
 * Webserver for dest version
 */
gulp.task('webserver', function() {
  gulp.src(path.DEST)
    .pipe(webserver({
      livereload: true,
      host: '0.0.0.0'
    }));
  console.log('Server is running on localhost:8000');
});

/**
 * Wather for dynamic file changes
 */
gulp.task('watch', function(){
  gulp.watch(path.SRC_STYL,['stylus']);
  gulp.watch(path.JADE,['templates']);
  gulp.watch(path.SRC_IMG,['imagemin']);
  gulp.watch([
    path.SRC_CSS,
    path.SRC_JS,
    path.SRC_FONTS,
    path.SRC_BOWER
  ],['assets']);
});

/**
 * Build assets. Copy only minified and concatinated files to build folder
 * Replace assets filenames to minifed files
 * Example:
 * <!-- build:js js/bundle.min.js-->
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="js/script1.js"></script>
    <script src="js/script2.js"></script>
    <!-- endbuild-->
 * Will be replaced by 'js/bundle.min.js'
 */
gulp.task('build', ['assets', 'stylus','templates','imagemin'], function() {
  var assets = useref.assets();
  gulp.src(path.DEST_HTML)
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCSS({keepSpecialComments: 0})))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(path.BUILD));

  gulp.src(path.DEST_IMG)
    .pipe(gulp.dest(path.BUILD_IMG));

});

/**
 * Webserver for build version
 */
gulp.task('build:serve', ['watch', 'build'], function() {
  gulp.src(path.BUILD)
    .pipe(webserver({
      livereload: true,
      host: '0.0.0.0'
    }));
  console.log('Server is running on localhost:8000');
});

gulp.task('default',['watch', 'webserver', 'assets', 'stylus', 'templates', 'imagemin']);