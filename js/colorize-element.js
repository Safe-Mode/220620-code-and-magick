'use strict';

(function () {
  window.colorizeElement = function (element, colorInput, colorList, callback) {
    var color = colorInput.value;

    for (var i = 0; i < colorList.length; i++) {
      if (i === colorList.length - 1) {
        callback(element, colorList[0]);
        colorInput.value = colorList[0];
        return;
      }

      if (color === colorList[i]) {
        callback(element, colorList[i + 1]);
        colorInput.value = colorList[i + 1];
        return;
      }
    }
  };
})();
