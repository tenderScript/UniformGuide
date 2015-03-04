describe('uniform.filters.users', function() {
  beforeEach(module('uniform.filters.users'));

  beforeEach(inject(function (fullNameFilter) {
    this.fullNameFilter = fullNameFilter;
  }));

  describe('fullName filter', function() {
    it('should return a name string', function () {
      expect(this.fullNameFilter({first: 'Foo', middle: 'Bar', last: 'Baz'})).toBe('Foo Bar Baz');
      expect(this.fullNameFilter({first: null, middle: 'Bar', last: 'Baz'})).toBe('Bar Baz');
      expect(this.fullNameFilter({first: 'Foo', middle: null, last: 'Baz'})).toBe('Foo Baz');
      expect(this.fullNameFilter({first: 'Foo', middle: 'Bar', last: null})).toBe('Foo Bar');
      expect(this.fullNameFilter({first: null, middle: null, last: 'Baz'})).toBe('Baz');
      expect(this.fullNameFilter({first: null, middle: 'Bar', last: null})).toBe('Bar');
      expect(this.fullNameFilter({first: 'Foo', middle: null, last: null})).toBe('Foo');
      expect(this.fullNameFilter({first: null, middle: null, last: null})).toBe('');
    });

    it('should return a name string when properties are undefined', function () {
      expect(this.fullNameFilter({middle: 'Bar', last: 'Baz'})).toBe('Bar Baz');
      expect(this.fullNameFilter({first: 'Foo', last: 'Baz'})).toBe('Foo Baz');
      expect(this.fullNameFilter({first: 'Foo', middle: 'Bar'})).toBe('Foo Bar');
      expect(this.fullNameFilter({last: 'Baz'})).toBe('Baz');
      expect(this.fullNameFilter({middle: 'Bar'})).toBe('Bar');
      expect(this.fullNameFilter({first: 'Foo'})).toBe('Foo');
      expect(this.fullNameFilter({})).toBe('');
    });

    it('should return an empty string when parameter is not an object', function () {
      expect(this.fullNameFilter(null)).toBe('');
      expect(this.fullNameFilter()).toBe('');
      expect(this.fullNameFilter('joe')).toBe('');
      expect(this.fullNameFilter(4)).toBe('');
    });
  });
});
