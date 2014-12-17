
/**
 * Configure files based on environment
 */
var env = {
  all: [
    'bower_components/angular/angular.js',
    'bower_components/angular-*/angular-*.js',
    'assets/js/directives/logout_button/*-test.js',
    'assets/js/directives/flash_message/*-test.js'
  ],
  test: [
    'bower_components/cookies-js/src/*.js',
    'assets/js/directives/logout_button/*.js',
    'assets/js/directives/flash_message/flash_message.js',
    'assets/js/directives/flash_message/*.js'
  ],
  dist: [
    'dist/uniform.min.js'
  ],
  files: function() {
    var files = this.all;
    if (process.env.TEST) {
      return files.concat(this.test);
    }
    return files.concat(this.dist);
  }
};

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ['jasmine'],
    files: env.files(),
    autoWatch: true,
    browsers: ['PhantomJS'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ]
  });
};
