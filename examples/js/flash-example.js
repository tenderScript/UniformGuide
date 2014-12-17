angular.module('flash-example', ['uniform.flash-message'])
  .config(function(FlashMessageProvider) {
     FlashMessageProvider.classes({
       success: 'success'
     });
   })
  .controller('FlashMessageExampleController', function($scope, FlashMessage) {
     FlashMessage.success('hello');

     $scope.update = function() {
       FlashMessage.success($scope.newFlash);
     };
   });
