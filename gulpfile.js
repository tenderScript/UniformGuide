var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

var srcDir = "assets",
    distDir = "dist",
    watchPaths = ['scss'].reduce(function(paths, ext) {
      return paths.concat([srcDir + '/**/*.' + ext, srcDir + '/*.' + ext]);
    }, []),
    sassConfig = {
      includePaths: [
        'bower_components/bootstrap-sass-official/assets/stylesheets/'
      ]
   };

gulp.task('clean', function(cb) {
  del([distDir], cb);
});

gulp.task('sass', ['clean'], function() {
  gulp.src([srcDir + '/stylesheets/uniform.scss'])
      .pipe(sass(sassConfig))
      .pipe(gulp.dest(distDir))
      .pipe(rename({suffix:'.min'}))
      .pipe(minifyCss())
      .pipe(gulp.dest(distDir));
});

gulp.task('js', ['clean'], function() {
  gulp.src([srcDir + '/js/directives/uniform.js', srcDir + '/js/**/*.js', "!" + srcDir + '/js/**/*_test.js'])
      .pipe(concat('uniform.js'))
      .pipe(gulp.dest(distDir))
      .pipe(rename({suffix:'.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(distDir));
});

gulp.task('copy-fonts', ['clean'], function() {
  gulp.src([
    'assets/fonts/*.{ttf,woff,svg,eot}',
    'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*.{ttf,woff,svg,eot}'])
      .pipe(gulp.dest(distDir + '/fonts'));
});

gulp.task('dev', ['build'], function() {
  gulp.watch(watchPaths, ['build']);
});


gulp.task('copy', ['copy-fonts']);
gulp.task('build', ['clean', 'sass', 'js', 'copy']);
gulp.task('default', ['build']);
