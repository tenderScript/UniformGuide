(function() {

  'use strict';

  function fullName() {
    return function (nameObject) {
      var nameString = '';

      if (!nameObject) {
        return nameString;
      }

      if (nameObject !== nameObject.hasOwnProperty('first') && nameObject.first) {
        nameString = nameObject.first + ' ';
      }

      if (nameObject.hasOwnProperty('middle') && nameObject.middle) {
        nameString = nameString + nameObject.middle + ' ';
      }

      if (nameObject.hasOwnProperty('last') && nameObject.last) {
        nameString = nameString + nameObject.last;
      }

      return nameString.trim();
    }
  }

  angular.module('uniform.filters.users')
    .filter('fullName', fullName);

})();
