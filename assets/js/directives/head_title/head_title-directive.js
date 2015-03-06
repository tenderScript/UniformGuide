(function () {

  'use strict';

  var headTitle = {
    restrict: 'A',
    link: function ($scope, elem) {
      var defaultTitle = elem.text();

      $scope.$on('$routeChangeSuccess', function () {
        elem.text(defaultTitle);
      });

      $scope.$watch('headTitle', function (value) {
        if (!value) {
          elem.text(defaultTitle);
        } else {
          elem.text(value + (defaultTitle ? ' - ' + defaultTitle : ''));
        }
      });
    }
  };

  angular.module('uniform.head-title')
    .directive('headTitle', function () {
      return headTitle;
    });

})();
