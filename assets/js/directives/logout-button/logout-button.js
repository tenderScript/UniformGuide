(function() {

  LogoutButtonController.$inject = ['$scope', '$q', '$location'];

  function LogoutButtonController($scope, $q, $location) {
    $scope.redirect || ($scope.redirect = '/');
    $scope.cookie || ($scope.cookie = 'access_token');
    $scope.cookieDomain || ($scope.cookieDomain = '.getvnn.com');
    $scope.action || ($scope.action = function() {});

    this.$scope = $scope;
    this.$q = $q;
    this.$location = $location;
  }

  LogoutButtonController.prototype.onClick = function() {
    var that = this;
    return function() {
      Cookies.expire(that.$scope.cookie, {domain: that.$scope.cookieDomain});
      that.$q.when(that.$scope.action()).then(function(){
        that.$location.url(that.$scope.redirect);
      });
    }
  };

  var logoutButton = {
    scope: {
      redirect:'@',
      cookie: '@',
      cookieDomain: '@',
      action: '='
    },
    restrict: 'A',
    controller: LogoutButtonController,
    link: function(scope, elem, attrs, ctrl) {
      elem.on('click', ctrl.onClick());
    }
  };

  angular.module('uniform.logout-button', [])
     .directive('logoutButton', function() {
       return logoutButton;
     });

})();
