(function() {
  "use strict";

  var stripHighSchool;

  stripHighSchool = function() {
    return function(schoolName) {
      if (schoolName != null) {
        return schoolName.replace('High School', '').replace(/\s+/g, ' ').trim();
      }

      return void 0;
    };
  };

  angular.module('uniform.filters.schools')
    .filter('stripHighSchool', stripHighSchool);
})();
