describe('uniform.filters.primitives', function() {
  beforeEach(module('uniform.filters.primitives'));

  describe('phoneNumber filter', function() {
    it("should format a 10 digit US phone number", inject(function(phoneNumberFilter) {
      expect(phoneNumberFilter('1234567890')).toBe('(123) 456-7890');
    }));

  });
});
