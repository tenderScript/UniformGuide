(function() {
  "use strict";

  var stripHighSchool = function() {
    return function(schoolName) {
      if (schoolName != null) {
        return schoolName.replace('High School', '').replace(/\s+/g, ' ').trim();
      }

      return null;
    };
  };

  angular.module('uniform.filters.schools')
    .filter('stripHighSchool', stripHighSchool);
})();
