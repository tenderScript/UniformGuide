describe('FlashMessage', function() {
  beforeEach(module('uniform.flash-message'));

  beforeEach(module(function(FlashMessageProvider) {
    FlashMessageProvider.classes({
      'success': 'success',
      'error': 'error',
      'info': 'info',
      'warning': 'warning'
    });
  }));

  beforeEach(inject(function(FlashMessage, $timeout) {
    this.service = FlashMessage;
    this.$timeout = $timeout;
  }));

  describe('.message()', function() {
    it('should set a message with given class', function() {
      this.service.message('success', 'This is a success message!');
      expect(this.service.cssClass).toBe('success');
      expect(this.service.text).toBe('This is a success message!');
    });

    it('should define methods for configured classes', function() {
      this.service.success('rad');
      expect(this.service.cssClass).toBe('success');
      expect(this.service.text).toBe('rad');

      this.service.error('less rad');
      expect(this.service.cssClass).toBe('error');
      expect(this.service.text).toBe('less rad');

      this.service.info('info rad');
      expect(this.service.cssClass).toBe('info');
      expect(this.service.text).toBe('info rad');

      this.service.warning('warn rad');
      expect(this.service.cssClass).toBe('warning');
      expect(this.service.text).toBe('warn rad');
    });

    it('should set the hidden state to false', function() {
      expect(this.service.hidden).toBe(true);
      this.service.message('success', 'test');
      expect(this.service.hidden).toBe(false);
    })
  });

  describe('.hide()', function() {
    it('should set the hidden status', function() {
      this.service.hidden = false;
      this.service.hide();
      expect(this.service.hidden).toBe(true);
    });
  });

  describe('.timeout()', function() {
    it('should set state to hidden after specified interval', function() {
      this.service.hidden = false;
      this.service.timeout(100);
      this.$timeout.flush();
      expect(this.service.hidden).toBe(true);
    });
  });
});
