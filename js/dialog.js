'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');

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
    setup.style.top = '';
    setup.style.left = '';
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

  var dialogHandle = setup.querySelector('.setup-user-pic');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

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
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
