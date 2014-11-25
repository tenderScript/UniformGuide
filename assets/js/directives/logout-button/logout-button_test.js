describe('logoutButton', function() {

  beforeEach(module('uniform.logout-button'));

  beforeEach(inject(function($compile, _$rootScope_) {
    this.$compile = $compile;
    this.$rootScope = _$rootScope_;
    $scope = this.$rootScope.$new();
    $scope.doThing = function() {
      $scope.thingdone = true;
    };
    this.$scope = $scope;
  }));

  describe('construction', function() {
    beforeEach(function() {
      this.elem = this.$compile('<div logout-button redirect="/" cookie="access_token" cookie-domain=".getvnn.com" action="doThing" />')(this.$scope);
    });

    it('should store a redirect uri on scope', function() {
      expect(this.elem.isolateScope().redirect).toBe('/');
    });

    it ('should store the cookie name to remove', function() {
      expect(this.elem.isolateScope().cookie).toBe('access_token');
    });

    it ('should store the cookie domain', function() {
      expect(this.elem.isolateScope().cookieDomain).toBe('.getvnn.com');
    });

    it('should store an action', function() {
      expect(typeof(this.elem.isolateScope().action)).toBe('function');
    });
  });

  describe('default values', function() {

    beforeEach(function() {
      this.elem = this.$compile('<div logout-button />')(this.$rootScope.$new());
    });

    describe('.redirect', function() {
      it('should be /', function() {
        expect(this.elem.isolateScope().redirect).toBe('/');
      });
    });

    describe('.cookie', function() {
      it('should be access_token', function() {
        expect(this.elem.isolateScope().cookie).toBe('access_token');
      });
    });

    describe('.cookieDomain', function() {
      it('should be .getvnn.com', function() {
        expect(this.elem.isolateScope().cookieDomain).toBe('.getvnn.com');
      });
    });

    describe('.action()', function() {
      it('should be a noop function', function() {
        expect(typeof(this.elem.isolateScope().action)).toBe('function');
      });
    });
  });

  describe('when clicked', function() {
    beforeEach(function() {
      this.elem = this.$compile('<div logout-button action="doThing" />')(this.$scope);
    });

    it('should delete the cookies', function() {
      spyOn(Cookies, 'expire');
      angular.element(this.elem[0]).triggerHandler('click');
      expect(Cookies.expire).toHaveBeenCalledWith('access_token', {domain:'.getvnn.com'});
    });

    it('should fire the scope action', function() {
      spyOn(this.elem.isolateScope(), 'action');
      angular.element(this.elem[0]).triggerHandler('click');
      expect(this.elem.isolateScope().action).toHaveBeenCalled();
    });

    it('should redirect to the stored redirect value', inject(function($location) {
      spyOn($location, 'url');
      angular.element(this.elem[0]).triggerHandler('click');
      this.$rootScope.$apply();
      expect($location.url).toHaveBeenCalledWith('/');
    }));
  });
});
