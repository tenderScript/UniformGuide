(function() {

  LogoutButtonController.$inject = ['$q', '$location'];

  function LogoutButtonController($q, $location) {
    this.$q = $q;
    this.$location = $location;
  }

  LogoutButtonController.prototype.setScope = function($scope) {
    $scope.redirect || ($scope.redirect = '/');
    $scope.cookie || ($scope.cookie = 'access_token');
    $scope.cookieDomain || ($scope.cookieDomain = '*');
    $scope.action || ($scope.action = function() {});
    this.$scope = $scope;
  };

  LogoutButtonController.prototype.onClick = function() {
    var that = this,
        args = [this.$scope.cookie];
    this.$scope.cookieDomain != '*' && (args = args.concat([{domain: this.$scope.cookieDomain}]));
    return function(e) {
      e.preventDefault();
      Cookies.expire.apply(null, args);
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
    link: function($scope, elem, attrs, ctrl) {
      ctrl.setScope($scope);
      elem.on('click', ctrl.onClick());
    }
  };

  angular.module('uniform.logout-button', [])
     .directive('logoutButton', function() {
       return logoutButton;
     });

})();
