(function() {
  "use strict";

  var ordinalSuffix = function() {
    return function(number) {
      if (number.toString().slice(-1) == '1') {
        return (number.toString().length > 1 && number.toString().slice(-2, -1) == '1') ?
          number.toString() + 'th' : number.toString() + 'st';
      } else if (number.toString().slice(-1) == '2') {
        return (number.toString().length > 1 && number.toString().slice(-2, -1) == '1') ?
          number.toString() + 'th' : number.toString() + 'nd';
      } else if (number.toString().slice(-1) == '3') {
        return (number.toString().length > 1 && number.toString().slice(-2, -1) == '1') ?
          number.toString() + 'th' : number.toString() + 'rd';
      } else {
        return number.toString() + 'th'
      }
    };
  };

  angular.module('uniform.filters.primitives')
    .filter('ordinalSuffix', ordinalSuffix);
})();
