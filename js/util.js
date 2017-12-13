'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action, element) {
      if (evt.keyCode === ESC_KEYCODE) {
        action(element);
      }
    },
    isEnterEvent: function (evt, action, element) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action(element);
      }
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    detectEdge: function () {
      return (navigator.userAgent.search(/Edge/) > 0) ? true : false;
    }
  };
})();
