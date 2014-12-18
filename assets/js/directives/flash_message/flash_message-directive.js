(function() {

  "use strict";

  FlashMessageController.$inject = ['$scope', 'FlashMessage'];

  function FlashMessageController($scope, FlashMessage) {
    $scope.message = FlashMessage;
  }

  var flashMessage = {
    scope: {
      action: '&',
      close: '&'
    },
    templateUrl: '/template/flash/flash.html',
    controller: FlashMessageController
  };

  function flashMessageDirective() {
    return flashMessage;
  }

  run.$inject = ['$templateCache'];
  function run($templateCache) {
    var flashTpl;
    flashTpl  = '<div class="flash-message flash-message-{{message.cssClass}}" ng-hide="message.hidden">';
    flashTpl += '    <span class="flash-message-close" ng-show="close" ng-click="close()">&times;</span>';
    flashTpl += '    <strong class="flash-message-bold" ng-if="message.data.boldText">{{message.data.boldText}}</strong>';
    flashTpl += '    {{message.text}}';
    flashTpl += '    <span class="flash-message-action" ng-if="message.data.actionText && action" ng-click="action()">{{ message.data.actionText }}</span>';
    flashTpl += '</div>';
    $templateCache.put('/template/flash/flash.html', flashTpl);
  }

  angular.module('uniform.flash-message')
     .directive('flashMessage', flashMessageDirective)
     .run(run);
})();
