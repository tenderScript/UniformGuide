(function() {

  LogoutButtonController.$inject = ['$q', '$window'];

  function LogoutButtonController($q, $window) {
    this.$q = $q;
    this.$window = $window;
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
        args = [this.$scope.cookie],
        redirect = (function(path) {
          return function() {
            that.$window.location = path;
          };
        })(this.$scope.redirect);
    this.$scope.cookieDomain != '*' && (args = args.concat([{domain: this.$scope.cookieDomain}]));

    return function(e) {
      e.preventDefault();
      Cookies.expire.apply(null, args);
      that.$q.when(that.$scope.action()).then(redirect);
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
