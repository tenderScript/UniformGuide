(function () {

  'use strict';

  HeadTitleService.$inject = ['$rootScope'];

  function HeadTitleService($rootScope) {
    this.$rootScope = $rootScope;
  }

  HeadTitleService.prototype.setTitle = function (title) {
    this.$rootScope.headTitle = title;
  };

  angular.module('uniform.head-title')
    .service('HeadTitleService', HeadTitleService)

})();
