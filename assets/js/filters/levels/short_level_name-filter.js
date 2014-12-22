(function() {
  "use strict";

  var shortLevelName;

  shortLevelName = function() {
    return function(levelName) {
      if (levelName != null) {
        return levelName.replace('Junior Varsity', 'JV').replace(/\s+/g, ' ').trim();
      }

      return void 0;
    };
  };

  angular.module('uniform.filters.levels')
    .filter('shortLevelName', shortLevelName);
})();
