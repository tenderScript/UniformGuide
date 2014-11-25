module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-*/angular-*.js',
      'bower_components/cookies-js/src/*.js',
      'assets/js/directives/logout-button/*.js'
    ],
    autoWatch: true,
    browsers: ['PhantomJS'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ]
  });
};
