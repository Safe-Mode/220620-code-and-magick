'use strict';

(function () {
  window.colorize = function (element, property, input, colors) {
    var color = input.value;

    for (var i = 0; i < colors.length; i++) {
      if (i === colors.length - 1) {
        element.style[property] = colors[0];
        input.value = colors[0];
        return;
      }

      if (color === colors[i]) {
        element.style[property] = colors[i + 1];
        input.value = colors[i + 1];
        return;
      }
    }
  };
})();
