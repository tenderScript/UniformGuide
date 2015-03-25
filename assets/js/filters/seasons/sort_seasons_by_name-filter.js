(function() {

  'use strict';

  function sortSeasonsByName() {
    var order = ['Fall', 'Winter', 'Spring', 'Year-Round'];

    return function(items, reverse) {
      var ordered = _.intersection(order, items);

      return reverse ? ordered.reverse() : ordered;
    };
  }

  angular.module('uniform.filters.seasons')
    .filter('sortSeasonsByName', sortSeasonsByName);

})();
