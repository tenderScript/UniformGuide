(function() {
   ActiveMenuLinkController.$inject = ['$location'];

  function ActiveMenuLinkController($location) {
    this.$location = $location;
  }

  ActiveMenuLinkController.prototype.routeMatches = function(path) {
    if (path.substr(0, 1) == '#') {
      path = path.substr(1);
    }
    if (path == '/') {
      return this.$location.path() == path;
    }
    return this.$location.path().substr(0, path.length) === path;
  };

  ActiveMenuLinkController.prototype.onRouteChange = function (elem, path) {
      if (this.routeMatches(path)) {
          elem.addClass('active');
      } else {
          elem.removeClass('active');
      }
  };

  var activeMenuLink = {
    restrict: 'A',
    controller: ActiveMenuLinkController,
    link: function ($scope, elem, attrs, ctrl) {
      $scope.$on('$routeChangeSuccess', function () {
        ctrl.onRouteChange(elem, attrs.href);
      });

      ctrl.onRouteChange(elem, attrs.href);
    }
  };

  angular.module('uniform.active-menu-link', [])
    .directive('activeMenuLink', function() {
        return activeMenuLink;
    });
})();
