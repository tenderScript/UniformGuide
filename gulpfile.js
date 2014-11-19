var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del');

var srcDir = "src",
    distDir = "dist",
    watchPaths = ['scss'].reduce(function(paths, ext) {
      return paths.concat([srcDir + '/**/*.' + ext, srcDir + '/*.' + ext]);
    }, []),
    sassConfig = {};

gulp.task('clean', function(cb) {
  del([distDir], cb);
});

gulp.task('sass', ['clean'], function() {
  gulp.src([srcDir + '/main.scss'])
      .pipe(sass(sassConfig))
      .pipe(gulp.dest(distDir))
});

gulp.task('copy-fonts', ['clean'], function() {
  gulp.src('bower_components/bootstrap-sass-official/assets/fonts/**/*.{ttf,woff,svg,eot}')
      .pipe(gulp.dest(distDir + '/fonts'));
});

gulp.task('dev', ['build'], function() {
  gulp.watch(watchPaths, ['build']);
});

gulp.task('copy', ['copy-fonts']);
gulp.task('build', ['webpack', 'sass', 'copy']);
gulp.task('default', ['build']);
