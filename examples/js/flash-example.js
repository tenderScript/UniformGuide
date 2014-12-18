angular.module('flash-example', ['uniform.flash-message'])
  .config(function(FlashMessageProvider) {
     FlashMessageProvider.classes({
       success: 'success',
       error: 'error',
       info: 'info',
       comment: 'comment'
     });
   })
  .controller('FlashMessageExampleController', function($scope, FlashMessage) {

     $scope.flashText = 'hello';
     $scope.actionText = 'click me';
     $scope.boldText = 'Hey Dude!';

     $scope.$watch('method', function(newVal, oldVal) {
       if (newVal !== oldVal) {
         $scope.update();
       }
     });

     FlashMessage.success('hello', {actionText: $scope.actionText, boldText: $scope.boldText});

     $scope.methods = ['success', 'error', 'info', 'comment'];

     $scope.method = $scope.methods[0];


     $scope.update = function() {
       FlashMessage[$scope.method]($scope.flashText, {
         actionText: $scope.actionText,
         boldText: $scope.boldText
       });
     };

     $scope.close = function() {
       FlashMessage.hide();
     };

     $scope.doAction = function() {
       alert('action!');
     }
   });
