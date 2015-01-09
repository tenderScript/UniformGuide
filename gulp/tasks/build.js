'use strict';

var gulp = require('gulp');

gulp.task('build', ['clean', 'sass', 'js', 'copy']);
gulp.task('default', ['build']);
