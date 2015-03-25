describe('uniform.filters.seasons', function() {

  beforeEach(module('uniform.filters.seasons'));

  beforeEach(inject(function (sortSeasonsByNameFilter) {
    this.sortSeasonsByName = sortSeasonsByNameFilter;
  }));

  describe('sortSeasonsByName filter', function() {
    it('should return [Fall, Winter, Spring]', function() {
      var testCases = [
        [['Winter'], ['Winter']],
        [['Winter', 'Fall'], ['Fall', 'Winter']],
        [['Fall', 'Winter'], ['Fall', 'Winter']],
        [['Spring', 'Fall'], ['Fall', 'Spring']],
        [['Spring', 'Winter', 'Fall'], ['Fall', 'Winter', 'Spring']],
        [['Winter', 'Fall', 'Spring'], ['Fall', 'Winter', 'Spring']],
        [['Fall', 'Winter', 'Spring'], ['Fall', 'Winter', 'Spring']]
      ];

      for (var index = 0; index < testCases.length; index++) {
        expect(this.sortSeasonsByName(testCases[index][0])).toEqual(testCases[index][1]);
      }
    });
  });


  describe('sortSeasonsByName filter reversed', function() {
    it('should return [Spring, Winter, Fall]', function() {
      var testCases = [
        [['Winter'], ['Winter']],
        [['Winter', 'Fall'], ['Winter', 'Fall']],
        [['Fall', 'Winter'], ['Winter', 'Fall']],
        [['Spring', 'Fall'], ['Spring', 'Fall']],
        [['Spring', 'Winter', 'Fall'], ['Spring', 'Winter', 'Fall']],
        [['Winter', 'Fall', 'Spring'], ['Spring', 'Winter', 'Fall']],
        [['Fall', 'Winter', 'Spring'], ['Spring', 'Winter', 'Fall']]
      ];

      for (var index = 0; index < testCases.length; index++) {
        expect(this.sortSeasonsByName(testCases[index][0], true)).toEqual(testCases[index][1]);
      }
    });
  });
});
