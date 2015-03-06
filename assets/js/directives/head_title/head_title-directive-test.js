describe('headTitle', function() {

  beforeEach(module('uniform.head-title'));

  beforeEach(inject(function($compile, _$rootScope_) {
    this.$compile = $compile;
    this.$rootScope = _$rootScope_;
    this.$scope = this.$rootScope.$new();
  }));

  beforeEach(function() {
    this.element = '<title data-head-title>Foo</title>';
    this.element = this.$compile(this.element)(this.$scope);
    this.$scope.$digest();
  });

  describe('when the route changes', function() {
    it('should set the title back to the default', function() {
      this.element.text('Something Else');
      this.$scope.$emit('$routeChangeSuccess');

      expect(this.element.text()).toBe('Foo');
    });
  });

  describe('when scope variable headTitle changes', function () {
    it('should prepend the title when there is a default', function () {
      this.$rootScope.headTitle = 'Hello';
      this.$rootScope.$digest();
      expect(this.element.text()).toBe('Hello - Foo');
    });

    it('should set the title when there is no default', function () {
      this.element = '<title data-head-title></title>';
      this.element = this.$compile(this.element)(this.$scope);
      this.$scope.$digest();

      this.$rootScope.headTitle = 'Hello';
      this.$rootScope.$digest();

      expect(this.element.text()).toBe('Hello');
    });
  });

});
