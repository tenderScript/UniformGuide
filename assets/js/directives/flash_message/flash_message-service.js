(function() {

  "use strict";

  /**
   * Create a new FlashMessage service. The object passed
   * in will create shortcut the classes used in the message() method.
   *
   * @param classes
   * @constructor
   */
  function FlashMessage(classes) {
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
  };

  /**
   * Hide the flash message.
   */
  FlashMessage.prototype.hide = function() {
    this.hidden = true;
  };

  function FlashMessageProvider() {}
  FlashMessageProvider.prototype.classes = function(obj) {
    this.classes = obj;
  };

  FlashMessageProvider.prototype.$get = function() {
    return new FlashMessage(this.classes);
  };

  angular.module('uniform.flash-message')
     .provider('FlashMessage', FlashMessageProvider);

})();
