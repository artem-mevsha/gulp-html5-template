gulp-html5-template
===================

##HTML5 template using jade, stylus, localhost, imagemin, concatenation and minification.

To run this application [*nodejs*](http://nodejs.org/) must be installed.
Install gulp and bower globally:
```
npm install -g gulp bower
```
Go to this project directory and type:
```
npm install
bower install
```
to install all node modules

###To run gulp task type
```
gulp
```
and then open [*localhost:8000*](http://localhost:8000). Folder with project is *dest* by default

#### To use base64 image encoding use *inline-image* stylus directive
Example:
```styl
.some-image
  width 67px
  height 67px
  background inline-image('../img/some-image.jpg')
```
will be trasformed to
```css
.some-image {
  width: 67px;
  height: 67px;
  background: url(data:image/png;base64,R0lGODlhEAAQAMQAAORHHOVSKud);
}
```

###To concat and minify scripts and styles type:
```
gulp build
```

This task will make minified & concatinated files and will create build version of project (folder *build* by default)
Example:
Files
```html
<!-- build:js js/bundle.min.js-->
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="js/script1.js"></script>
<script src="js/script2.js"></script>
<!-- endbuild-->
```
Will be replaced by 'js/bundle.min.js' in build folder

###To watch production build type
```
gulp build:serve
```
and then open [*localhost:8000*](http://localhost:8000). Folder with project is *build* by default