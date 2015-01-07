(function() {

  'use strict';

  function formatSchoolName() {
    return function (team) {
      return team.gender + ' ' + team.level + ' ' + team.sport.name;
    }
  }

  angular.module('uniform.filters.teams', []).filter('formatTeamName', formatSchoolName);

})();
