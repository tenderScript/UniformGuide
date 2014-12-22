/*
 * Cookies.js - 1.1.0
 * https://github.com/ScottHamper/Cookies
 *
 * This is free and unencumbered software released into the public domain.
 */
(function (global, undefined) {
    'use strict';

    var factory = function (window) {
        if (typeof window.document !== 'object') {
            throw new Error('Cookies.js requires a `window` with a `document` object');
        }

        var Cookies = function (key, value, options) {
            return arguments.length === 1 ?
                Cookies.get(key) : Cookies.set(key, value, options);
        };

        // Allows for setter injection in unit tests
        Cookies._document = window.document;

        // Used to ensure cookie keys do not collide with
        // built-in `Object` properties
        Cookies._cacheKeyPrefix = 'cookey.'; // Hurr hurr, :)

        Cookies.defaults = {
            path: '/',
            secure: false
        };

        Cookies.get = function (key) {
            if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
                Cookies._renewCache();
            }

            return Cookies._cache[Cookies._cacheKeyPrefix + key];
        };

        Cookies.set = function (key, value, options) {
            options = Cookies._getExtendedOptions(options);
            options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);

            Cookies._document.cookie = Cookies._generateCookieString(key, value, options);

            return Cookies;
        };

        Cookies.expire = function (key, options) {
            return Cookies.set(key, undefined, options);
        };

        Cookies._getExtendedOptions = function (options) {
            return {
                path: options && options.path || Cookies.defaults.path,
                domain: options && options.domain || Cookies.defaults.domain,
                expires: options && options.expires || Cookies.defaults.expires,
                secure: options && options.secure !== undefined ?  options.secure : Cookies.defaults.secure
            };
        };

        Cookies._isValidDate = function (date) {
            return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
        };

        Cookies._getExpiresDate = function (expires, now) {
            now = now || new Date();
            switch (typeof expires) {
                case 'number': expires = new Date(now.getTime() + expires * 1000); break;
                case 'string': expires = new Date(expires); break;
            }

            if (expires && !Cookies._isValidDate(expires)) {
                throw new Error('`expires` parameter cannot be converted to a valid Date instance');
            }

            return expires;
        };

        Cookies._generateCookieString = function (key, value, options) {
            key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
            key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
            value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
            options = options || {};

            var cookieString = key + '=' + value;
            cookieString += options.path ? ';path=' + options.path : '';
            cookieString += options.domain ? ';domain=' + options.domain : '';
            cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
            cookieString += options.secure ? ';secure' : '';

            return cookieString;
        };

        Cookies._getCacheFromString = function (documentCookie) {
            var cookieCache = {};
            var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

            for (var i = 0; i < cookiesArray.length; i++) {
                var cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);

                if (cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] === undefined) {
                    cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] = cookieKvp.value;
                }
            }

            return cookieCache;
        };

        Cookies._getKeyValuePairFromCookieString = function (cookieString) {
            // "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
            var separatorIndex = cookieString.indexOf('=');

            // IE omits the "=" when the cookie value is an empty string
            separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

            return {
                key: decodeURIComponent(cookieString.substr(0, separatorIndex)),
                value: decodeURIComponent(cookieString.substr(separatorIndex + 1))
            };
        };

        Cookies._renewCache = function () {
            Cookies._cache = Cookies._getCacheFromString(Cookies._document.cookie);
            Cookies._cachedDocumentCookie = Cookies._document.cookie;
        };

        Cookies._areEnabled = function () {
            var testKey = 'cookies.js';
            var areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
            Cookies.expire(testKey);
            return areEnabled;
        };

        Cookies.enabled = Cookies._areEnabled();

        return Cookies;
    };

    var cookiesExport = typeof global.document === 'object' ? factory(global) : factory;

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function () { return cookiesExport; });
    // CommonJS/Node.js support
    } else if (typeof exports === 'object') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module === 'object' && typeof module.exports === 'object') {
            exports = module.exports = cookiesExport;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.Cookies = cookiesExport;
    } else {
        global.Cookies = cookiesExport;
    }
})(typeof window === 'undefined' ? this : window);
(function() {
  angular.module('uniform', [
     'uniform.logout-button',
     'uniform.active-menu-link'
  ]);
})();

(function() {

  "use strict";

  angular.module('uniform.flash-message', []);

})();

(function() {
  "use strict";

  angular.module('uniform.filters', ['uniform.filters.levels', 'uniform.filters.schools']);
})();

(function() {

  "use strict";

  FlashMessageController.$inject = ['$scope', 'FlashMessage'];

  function FlashMessageController($scope, FlashMessage) {
    this.$scope = $scope;
    this.$scope.message = FlashMessage;
  }

  FlashMessageController.prototype.onAction = function() {
    this.$scope.message.triggerActions();
  };

  var flashMessage = {
    replace:true,
    templateUrl: '/template/flash/flash.html',
    controller: FlashMessageController,
    controllerAs: 'flash'
  };

  function flashMessageDirective() {
    return flashMessage;
  }

  run.$inject = ['$templateCache'];
  function run($templateCache) {
    var flashTpl;
    flashTpl  = '<div class="flash-message flash-message-{{message.cssClass}}" ng-hide="message.hidden">';
    flashTpl += '    <span class="flash-message-close" ng-click="message.hide()">&times;</span>';
    flashTpl += '    <strong class="flash-message-bold" ng-if="message.data.boldText">{{message.data.boldText}}</strong>';
    flashTpl += '    {{message.text}}';
    flashTpl += '    <span class="flash-message-action" ng-if="message.data.actionText && message.actions" ng-click="flash.onAction()">{{ message.data.actionText }}</span>';
    flashTpl += '</div>';
    $templateCache.put('/template/flash/flash.html', flashTpl);
  }

  angular.module('uniform.flash-message')
     .directive('flashMessage', flashMessageDirective)
     .run(run);
})();

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
          that.callout(cssClass, boldText, text, actionText, timeout);
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
  };

  /**
   * Register a function to be called when action is taken
   * on the flash message.
   *
   * @param cb
   */
  FlashMessage.prototype.onAction = function(cb) {
    this.actions.unshift(cb);
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

(function() {

  LogoutButtonController.$inject = ['$q', '$window'];

  function LogoutButtonController($q, $window) {
    this.$q = $q;
    this.$window = $window;
  }

  LogoutButtonController.prototype.setScope = function($scope) {
    $scope.redirect || ($scope.redirect = '/');
    $scope.cookie || ($scope.cookie = 'access_token');
    $scope.cookieDomain || ($scope.cookieDomain = '*');
    $scope.action || ($scope.action = function() {});
    this.$scope = $scope;
  };

  LogoutButtonController.prototype.onClick = function() {
    var that = this,
        args = [this.$scope.cookie],
        redirect = (function(path) {
          return function() {
            that.$window.location = path;
          };
        })(this.$scope.redirect);
    this.$scope.cookieDomain != '*' && (args = args.concat([{domain: this.$scope.cookieDomain}]));

    return function(e) {
      e.preventDefault();
      Cookies.expire.apply(null, args);
      that.$q.when(that.$scope.action()).then(redirect);
    }
  };

  var logoutButton = {
    scope: {
      redirect:'@',
      cookie: '@',
      cookieDomain: '@',
      action: '='
    },
    restrict: 'A',
    controller: LogoutButtonController,
    link: function($scope, elem, attrs, ctrl) {
      ctrl.setScope($scope);
      elem.on('click', ctrl.onClick());
    }
  };

  angular.module('uniform.logout-button', [])
     .directive('logoutButton', function() {
       return logoutButton;
     });

})();

(function() {
   ActiveMenuLinkController.$inject = ['$location'];

  function ActiveMenuLinkController($location) {
    this.$location = $location;
  }

  ActiveMenuLinkController.prototype.routeMatches = function(path) {
    if (path.substr(0, 1) == '#') {
      path = path.substr(1);
    }
    if (path == '/') {
      return this.$location.path() == path;
    }
    return this.$location.path().substr(0, path.length) === path;
  };

  ActiveMenuLinkController.prototype.onRouteChange = function (elem, path) {
      if (this.routeMatches(path)) {
          elem.addClass('active');
      } else {
          elem.removeClass('active');
      }
  };

  var activeMenuLink = {
    restrict: 'A',
    controller: ActiveMenuLinkController,
    link: function ($scope, elem, attrs, ctrl) {
      $scope.$on('$routeChangeSuccess', function () {
        ctrl.onRouteChange(elem, attrs.href);
      });

      ctrl.onRouteChange(elem, attrs.href);
    }
  };

  angular.module('uniform.active-menu-link', [])
    .directive('activeMenuLink', function() {
        return activeMenuLink;
    });
})();

(function() {
  "use strict";

  angular.module('uniform.filters.levels', []);
})();

(function() {
  "use strict";

  var shortLevelName = function() {
    return function(levelName) {
      if (levelName != null) {
        return levelName.replace('Junior Varsity', 'JV').replace(/\s+/g, ' ').trim();
      }

      return null;
    };
  };

  angular.module('uniform.filters.levels')
    .filter('shortLevelName', shortLevelName);
})();

(function() {
  "use strict";

  angular.module('uniform.filters.schools', []);
})();

(function() {
  "use strict";

  var stripHighSchool = function() {
    return function(schoolName) {
      if (schoolName != null) {
        return schoolName.replace('High School', '').replace(/\s+/g, ' ').trim();
      }

      return null;
    };
  };

  angular.module('uniform.filters.schools')
    .filter('stripHighSchool', stripHighSchool);
})();
