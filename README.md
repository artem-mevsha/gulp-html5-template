gulp-html5-template
===================

HTML5 template using jade, stylus, localhost, concatenation and mifification.
To see page changes after each fix, you need to install livereload https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei

To run this application nodejs must be installed http://nodejs.org/
Go to this directory and type
```
npm install
```
to install all node modules

To run gulp task type
```
gulp
```

To concat and minify scripts and styles you need type their names in gulpfile.js in task 'product'. Then run
```
gulp product
```

###For generating css sprites

1. Add icon to src/img/for_sprite directory

2. Check src/css/sprite.styl file for new variable (example $s-new-icon)

3. Add style to style.styl

4. Use sprite icon in .jade file like:
```
// style.styl:
.m-new-icon
    sprite($s-new-icon)
```
```
// .jade
i.sprite.m-arenda
```