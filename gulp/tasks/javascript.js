'use strict';

var config = require('../config');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('js', ['clean'], function() {

  var deps = [
    'bower_components/cookies-js/src/cookies.js'
  ];
  var src = [
    config.src.root + '/js/directives/uniform.js',
    config.src.root + '/js/directives/flash_message/flash_message.js',
    config.src.root + '/js/filters/primitives/primitives.js',
    config.src.root + '/js/filters/teams/teams.js',
    config.src.root + '/js/**/*.js',
    "!" + config.src.root + '/js/**/*-test.js'
  ];

  gulp.src(deps.concat(src))
    .pipe(concat('uniform.js'))
    .pipe(gulp.dest(config.dist.root))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist.root));
});
