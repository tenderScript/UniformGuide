'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('copy-fonts', ['clean'], function() {
  gulp.src([
    'assets/fonts/*.{ttf,woff,svg,eot}',
    'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*.{ttf,woff,svg,eot}'])
    .pipe(gulp.dest(config.dist.root + '/fonts'));
});

gulp.task('copy', ['copy-fonts']);
