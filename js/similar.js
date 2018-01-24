'use strict';

(function () {
  var DOWNLOAD_URL = 'https://1510.dump.academy/code-and-magick/dat';
  var CALLBACK_NAME = '__jsonpCallback'; // for jsonp request

  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.myWizard.coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === window.myWizard.eyesColor) {
      rank += 1;
    }

    if (wizard.colorFireball === window.myWizard.fireballColor) {
      rank += 0.5;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }

      return rankDiff;
    }));
  };

  window.myWizard.onChange = function () {
    window.debounce(updateWizards);
  };

  var onLoadSuccess = function (data) {
    wizards = data;
    updateWizards();
  };

  // window.backend.load(DOWNLOAD_URL, onLoadSuccess, window.util.onXHRError);
  window.backendJSONP(DOWNLOAD_URL, CALLBACK_NAME, onLoadSuccess, window.util.onXHRError);
})();
