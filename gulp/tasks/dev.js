'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('dev', ['build'], function() {
  gulp.watch(config.watch.paths, ['build']);
});
