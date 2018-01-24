'use strict';

(function () {
  window.backendJSONP = function (url, callbackName, onLoadSuccess, onLoadError) {
    window[callbackName] = function (data) {
      onLoadSuccess(data);
    };

    var loader = document.createElement('script');

    loader.src = url + '?callback=' + callbackName;
    loader.addEventListener('error', function () {
      onLoadError('Ошибочка');
    });
    document.body.append(loader);
  };
})();
