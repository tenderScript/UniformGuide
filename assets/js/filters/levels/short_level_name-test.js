describe('uniform.filters.levels', function() {
  beforeEach(module('uniform.filters'));

  describe('shortLevelName filter', function() {
    it("should reduce 'Junior Varsity' to 'JV'", inject(function(shortLevelNameFilter) {
      expect(shortLevelNameFilter('Foo Junior Varsity Team')).toBe('Foo JV Team');
    }));

    it("should do nothing if 'Junior Varsity' is not in the string", inject(function(shortLevelNameFilter) {
      expect(shortLevelNameFilter('Foo Varsity Team')).toBe('Foo Varsity Team')
    }));
  });
});
