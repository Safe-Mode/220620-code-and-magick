'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var UPLOAD_URL = 'https://js.dump.academy/code-and-magick';

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var form = setup.querySelector('.setup-wizard-form');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, function () {
      closePopup(setup);
    });
  };

  var openPopup = function (popup) {
    popup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function (popup) {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    popup.style.top = '';
    popup.style.left = '';
  };

  var onInputFocus = function (evt) {
    evt.preventDefault();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onInputBlur = function (evt) {
    evt.preventDefault();
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onNameSubmit = function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  };

  setupOpen.addEventListener('click', function () {
    openPopup(setup);
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      openPopup(setup);
    });
  });

  setupClose.addEventListener('click', function () {
    closePopup(setup);
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      closePopup(setup);
    });
  });

  userNameInput.addEventListener('focus', onInputFocus);
  userNameInput.addEventListener('blur', onInputBlur);
  userNameInput.addEventListener('invalid', onNameSubmit);

  if (window.util.detectEdge) {
    userNameInput.addEventListener('input', function (evt) {
      var target = evt.target;

      if (target.value.length < MIN_NAME_LENGTH) {
        target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else {
        target.setCustomValidity('');
      }
    });
  }

  var onLoadUserData = function () {
    closePopup(setup);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), UPLOAD_URL, onLoadUserData, window.util.onXHRError);
    evt.preventDefault();
  });

  var dialogHandle = setup.querySelector('.upload');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault)
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
