(function() {

  "use strict";


  FlashMessageController.$inject = ['$scope', 'FlashMessage'];

  function FlashMessageController($scope, FlashMessage) {
    $scope.message = FlashMessage;
  }

  var flashMessage = {
    template: '{{message.text}}',
    controller: FlashMessageController
  };

  angular.module('uniform.flash-message')
     .directive('flashMessage', function() {
       return flashMessage;
     });
})();
