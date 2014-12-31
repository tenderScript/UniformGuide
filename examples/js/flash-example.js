angular.module('flash-example', ['uniform.flash-message', 'ngAnimate'])
  .config(function(FlashMessageProvider) {
     FlashMessageProvider.classes({
       success: 'success',
       error: 'error',
       info: 'info',
       comment: 'comment'
     });
   })
  .controller('FlashMessageExampleController', function($scope, FlashMessage) {

     $scope.flashText = "<a href='#'>hello</a>";
     $scope.actionText = 'click me';
     $scope.boldText = 'Hey Dude!';

     $scope.$watch('method', function(newVal, oldVal) {
       if (newVal !== oldVal) {
         $scope.update();
       }
     });

     FlashMessage.onAction(function() {
       alert('closing!');
       this.hide();
     });

     FlashMessage.success("<a href='#'>hello</a>", {actionText: $scope.actionText, boldText: $scope.boldText});

     $scope.methods = ['success', 'error', 'info', 'comment'];

     $scope.method = $scope.methods[0];

     $scope.setTimeout = function() {
       FlashMessage.timeout($scope.timeout);
     };

     $scope.update = function() {
       FlashMessage.callout[$scope.method]($scope.boldText, $scope.flashText, $scope.actionText);
     };

     $scope.close = function() {
       FlashMessage.hide();
     };
   });
