(function() {

  "use strict";

  FlashMessageController.$inject = ['$scope', 'FlashMessage'];

  function FlashMessageController($scope, FlashMessage) {
    this.$scope = $scope;
    this.$scope.message = FlashMessage;
  }

  FlashMessageController.prototype.onAction = function() {
    this.$scope.message.triggerActions();
  };

  var flashMessage = {
    replace:true,
    templateUrl: '/template/flash/flash.html',
    controller: FlashMessageController,
    controllerAs: 'flash',
    link: function(scope, elem) {
      var message = elem.find('div').eq(0);
      scope.$watch('message.text', function(newText) {
        message.html(newText);
      });
    }
  };

  function flashMessageDirective() {
    return flashMessage;
  }

  run.$inject = ['$templateCache'];
  function run($templateCache) {
    var flashTpl;
    flashTpl  = '<div class="flash-message flash-message-{{message.cssClass}}" ng-hide="message.hidden">';
    flashTpl += '    <span class="flash-message-close" ng-click="message.hide()">&times;</span>';
    flashTpl += '    <strong class="flash-message-bold" ng-if="message.data.boldText">{{message.data.boldText}}</strong>';
    flashTpl += '    <div class="flash-message-text"></div>';
    flashTpl += '    <span class="flash-message-action" ng-if="message.data.actionText && message.actions" ng-click="flash.onAction()">{{ message.data.actionText }}</span>';
    flashTpl += '</div>';
    $templateCache.put('/template/flash/flash.html', flashTpl);
  }

  angular.module('uniform.flash-message')
     .directive('flashMessage', flashMessageDirective)
     .run(run);
})();
