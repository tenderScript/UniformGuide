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
    this.actions = [];

    var k;
    var that = this;
    for (k in classes) {
      (function(method, cssClass) {
        that[method] = function(text, data) {
          this.message(cssClass, text, data);
        };

        that.callout[method] = function(boldText, text, actionText, timeout) {
          return that.callout(cssClass, boldText, text, actionText, timeout);
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
   * Creates a common structure for flash messages that involve bold text, a message, and
   * some actionable text.
   *
   * @param cssClass
   * @param boldText
   * @param text
   * @param actionText
   * @param timeout
   */
  FlashMessage.prototype.callout = function(cssClass, boldText, text, actionText, timeout) {
    this.message(cssClass, text, {
      boldText: boldText,
      actionText: actionText
    });

    if (timeout) {
      this.timeout(timeout);
    }

    return this;
  };

  /**
   * Register a function to be called when action is taken
   * on the flash message.
   *
   * @param cb
   */
  FlashMessage.prototype.onAction = function(cb) {
    this.actions.unshift(cb);
    return this;
  };

  /**
   * Execute all registered callbacks
   */
  FlashMessage.prototype.triggerActions = function() {
    var cb;
    while (cb = this.actions.shift()) {
      cb.apply(this);
    }
  };

  /**
   * Hide the flash message.
   */
  FlashMessage.prototype.hide = function() {
    this.hidden = true;
    return this;
  };

  /**
   * Set a timeout for the flash message. The flash message
   * will be set to a hidden state after the timeout is executed.
   *
   * @param ms
   * @returns {FlashMessage}
   */
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
