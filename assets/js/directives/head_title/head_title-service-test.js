describe('HeadTitleService', function() {

  beforeEach(module('uniform.head-title'));

  beforeEach(inject(function(_$rootScope_, HeadTitleService) {
    this.$rootScope = _$rootScope_;
    this.headTitle = HeadTitleService;
  }));

  describe('.setTitle()', function() {
    it('should set the title on $rootScope', function() {
      this.headTitle.setTitle('Fooo');
      expect(this.$rootScope.headTitle).toBe('Fooo');
    });
  });

});
