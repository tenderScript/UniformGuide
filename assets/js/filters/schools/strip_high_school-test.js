describe('uniform.filters.schools', function() {
  beforeEach(module('uniform.filters.schools'));

  describe('stripHighSchool filter', function() {
    it("should remove the string 'High School' from the given school name", inject(function(stripHighSchoolFilter) {
      expect(stripHighSchoolFilter('Foo High School')).toBe('Foo');
    }));

    it('should strip duplicate whitespace', inject(function(stripHighSchoolFilter) {
        expect(stripHighSchoolFilter('Foo High School Bar School')).toBe('Foo Bar School');
    }));

    it("should do nothing if the school name does not contain 'High School", inject(function(stripHighSchoolFilter) {
      expect(stripHighSchoolFilter('Foo School')).toBe('Foo School');
    }));
  });
});
