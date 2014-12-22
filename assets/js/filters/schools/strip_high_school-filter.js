(function() {
  "use strict";

  var stripHighSchool;

  stripHighSchool = function() {
    return function(schoolName) {
      return schoolName != null ? schoolName.replace('High School', '').replace(/\s+/g, ' ').trim() : void 0;
    };
  };

  angular.module('uniform.filters.schools')
    .filter('stripHighSchool', stripHighSchool);
})();
