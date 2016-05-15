var fs = require('fs'),
    cheerio = require('cheerio'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    webserver = require('gulp-webserver'),
    uglify = require('gulp-uglify'),
    argv = require('yargs').argv,
    exclude_min = ['js/phaser.min.js'],
    config = { js: [] };


gulp.task('build', ['initbuild', 'jsmin']);


gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: false,
      host: '0.0.0.0',
      port: 8013,
      open: true
    }));
});


gulp.task('initbuild', function() {

  var stream, html, $, src, js = [];
 
  // delete prev files
  stream = gulp.src('/js/game.min.js')
        .pipe(rimraf());



  // get a list of all js scripts from our dev file
  html = fs.readFileSync('dev.html', 'utf-8', function(e, data) {
    return data;
  });

  $ = cheerio.load(html);

  $('script').each(function() {
    src = $(this).attr('src');
    if (exclude_min.indexOf(src) === -1) {
      js.push(src);
    }
  });

  config.js = js;
  console.log(config.js);

});

gulp.task('jsmin', ['initbuild'], function() {

  var stream = gulp.src(config.js)
    .pipe(concat('js/game.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.'));

  return stream;

});


  
