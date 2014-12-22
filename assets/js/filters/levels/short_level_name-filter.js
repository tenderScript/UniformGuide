(function() {
  "use strict";

  var shortLevelName = function() {
    return function(levelName) {
      if (levelName != null) {
        return levelName.replace('Junior Varsity', 'JV').replace(/\s+/g, ' ').trim();
      }

      return null;
    };
  };

  angular.module('uniform.filters.levels')
    .filter('shortLevelName', shortLevelName);
})();
