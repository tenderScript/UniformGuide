'use strict';

var config = require('../config');
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task('sass', ['clean'], function() {
  gulp.src([config.src.root + '/stylesheets/uniform.scss'])
    .pipe(sass(config.sass))
    .pipe(gulp.dest(config.dist.root))
    .pipe(rename({suffix:'.min'}))
    .pipe(minifyCss())
    .pipe(gulp.dest(config.dist.root));
});
