(function() {

  'use strict';

  function formatTeamName() {
    return function (team) {
      return team.gender + ' ' + team.level + ' ' + team.sport.name;
    }
  }

  angular.module('uniform.filters.teams', []).filter('formatTeamName', formatTeamName);

})();
