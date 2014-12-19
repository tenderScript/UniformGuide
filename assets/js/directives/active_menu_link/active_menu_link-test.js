describe('activeMenuLink', function() {

  beforeEach(module('uniform.active-menu-link'));

  beforeEach(inject(function($compile, _$rootScope_) {
    this.$compile = $compile;
    this.$rootScope = _$rootScope_;
    this.$scope = this.$rootScope.$new();
  }));

  describe('when the route changes', function() {
    beforeEach(function() {
      this.element = '<a active-menu-link href="/foo">';
      this.element = this.$compile(this.element)(this.$scope);
      this.$scope.$digest();
    });

    it('should attach the "active" class if the route matches', inject(function($location) {
      expect(this.element.hasClass('active')).toBe(false);

      spyOn($location, 'path').and.returnValue('/foo');
      this.$scope.$emit('$routeChangeSuccess');

      expect(this.element.hasClass('active')).toBe(true);
    }));

    it('should remove the "active" class if the route does not match', inject(function ($location) {
      this.element.addClass('active');

      spyOn($location, 'path').and.returnValue('/bar');
      this.$scope.$emit('$routeChangeSuccess');

      expect(this.element.hasClass('active')).toBe(false);
    }));
  });
});
