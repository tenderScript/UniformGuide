describe('uniform.filters.primitives', function() {
  beforeEach(module('uniform.filters.primitives'));

  describe('ordinalSuffix filter', function() {
    it("should convert 0 to '0th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(0)).toBe('0th');
    }));

    it("should convert -1 to '1st'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(-1)).toBe('-1st');
    }));

    it("should convert 22 to '22nd'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(22)).toBe('22nd');
    }));

    it("should convert -33 to '-33rd'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(-33)).toBe('-33rd');
    }));

    it("should convert 44 to '44th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(44)).toBe('44th');
    }));

    it("should convert -15 to '-15th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(-15)).toBe('-15th');
    }));

    it("should convert 126 to '126th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(126)).toBe('126th');
    }));

    it("should convert -1237 to '-1237th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(-1237)).toBe('-1237th');
    }));

    it("should convert 12348 to '12348th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(12348)).toBe('12348th');
    }));

    it("should convert -1234569 to '-123459th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(-1234569)).toBe('-1234569th');
    }));

    it("should convert 12345670 to '1234570th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(12345670)).toBe('12345670th');
    }));

    it("should convert 10 to '10th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(10)).toBe('10th');
    }));

    it("should convert 11 to '11th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(11)).toBe('11th');
    }));

    it("should convert 112 to '112th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(112)).toBe('112th');
    }));

    it("should convert 1213 to '1213th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(1213)).toBe('1213th');
    }));

    it("should convert -100 to '-100th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(-100)).toBe('-100th');
    }));

    it("should convert 1000 to '1000th'", inject(function(ordinalSuffixFilter) {
      expect(ordinalSuffixFilter(1000)).toBe('1000th');
    }));
  });
});
