describe('uniform.filters.schools', function() {
  beforeEach(module('uniform.filters.schools'));

  beforeEach(inject(function (stripHighSchoolFilter) {
    this.stripHighSchoolFilter = stripHighSchoolFilter;
  }));

  describe('stripHighSchool filter', function() {
    it("should remove the string 'High School' from the end of the given school name", function() {
      expect(this.stripHighSchoolFilter('Foo High School')).toBe('Foo');
    });

    it("should not remove 'High School' from the middle of a school name", function() {
      expect(this.stripHighSchoolFilter('Foo High School Bar School')).toBe('Foo High School Bar School');
    });

    it("should do nothing if the school name does not contain 'High School", function() {
      expect(this.stripHighSchoolFilter('Foo School')).toBe('Foo School');
    });

    it("should strip any casing of 'High School' from the end of the school name", function () {
      expect(this.stripHighSchoolFilter('Foo high school')).toBe('Foo');
      expect(this.stripHighSchoolFilter('Foo HIGH SCHOOL')).toBe('Foo');
      expect(this.stripHighSchoolFilter('Foo hIgH sChOoL')).toBe('Foo');
    });

    it('should account for any whitespace at the end of the school name', function () {
      expect(this.stripHighSchoolFilter('Foo High School         ')).toBe('Foo');
      expect(this.stripHighSchoolFilter('Foo High School\n')).toBe('Foo');
      expect(this.stripHighSchoolFilter('Foo High School ')).toBe('Foo');
    });
  });
});
