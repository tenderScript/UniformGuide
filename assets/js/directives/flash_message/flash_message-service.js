(function() {

  "use strict";

  /**
   * Create a new FlashMessage service. The object passed
   * in will create shortcut the classes used in the message() method.
   *
   * @param array classes
   * @param angular timeout service $timeout
   * @constructor
   */
  function FlashMessage(classes, $timeout) {
    classes || (classes = {});
    this.hidden = true;
    var k;
    var that = this;
    for (k in classes) {
      (function(method, cssClass) {
        that[method] = function(text, data) {
          this.message(cssClass, text, data);
        };
      })(k, classes[k]);
    }
    this.$timeout = $timeout;
  }

  /**
   * Store the internal message contents.
   *
   * @param cssClass
   * @param text
   * @param data
   * @returns {{cssClass: *, text: *, data: *}|*}
   */
  FlashMessage.prototype.message = function(cssClass, text, data) {
    this.cssClass = cssClass;
    this.text = text;
    this.data = data;
    this.hidden = false;
    return this;
  };

  /**
   * Hide the flash message.
   */
  FlashMessage.prototype.hide = function() {
    this.hidden = true;
    return this;
  };

  FlashMessage.prototype.timeout = function(ms) {
    this.$timeout(angular.bind(this, this.hide), ms);
    return this;
  };

  function FlashMessageProvider() {}
  FlashMessageProvider.prototype.classes = function(obj) {
    this.classes = obj;
  };

  FlashMessageProvider.prototype.$get = function($timeout) {
    return new FlashMessage(this.classes, $timeout);
  };
  FlashMessageProvider.prototype.$get.$inject = ['$timeout'];

  angular.module('uniform.flash-message')
     .provider('FlashMessage', FlashMessageProvider);

})();
