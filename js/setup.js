'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];
var WIZARDS_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateWizards = function (count) {
  var wizards = [];

  for (var i = 0; i < count; i++) {
    var wizard = {
      name: NAMES[getRandomInt(0, NAMES.length - 1)] + ' ' +
            SURNAMES[getRandomInt(0, SURNAMES.length - 1)],
      coatColor: COAT_COLORS[getRandomInt(0, COAT_COLORS.length - 1)],
      eyesColor: EYES_COLORS[getRandomInt(0, EYES_COLORS.length - 1)]
    };

    wizards[i] = wizard;
  }

  return wizards;
};

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var insertElements = function (parentNode) {
  var fragment = document.createDocumentFragment();
  var wizards = generateWizards(WIZARDS_COUNT);

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  parentNode.appendChild(fragment);
};

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(setup);
  }
};

var openPopup = function (popup) {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function (popup) {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

insertElements(similarListElement);
setup.querySelector('.setup-similar').classList.remove('hidden');

setupOpen.addEventListener('click', function () {
  openPopup(setup);
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup(setup);
  }
});

setupClose.addEventListener('click', function () {
  closePopup(setup);
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup(setup);
  }
});

var userNameInput = setup.querySelector('.setup-user-name');

var detectEdge = function () {
  return (navigator.userAgent.search(/Edge/) > 0) ? true : false;
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

userNameInput.addEventListener('invalid', onNameSubmit);

if (detectEdge) {
  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;

    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });
}

var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');

var changeColor = function (part, property, colors) {
  var color = part.style[property];
  // var color = getComputedStyle(part)[property];

  if (!color) {
    color = 'black';
  }

  for (var i = 0; i < colors.length; i++) {
    if (i === colors.length - 1) {
      part.style[property] = colors[0];
      return;
    }

    if (color === colors[i]) {
      part.style[property] = colors[i + 1];
      return;
    }
  }
};

var onWizardCoatClick = function (evt) {
  evt.preventDefault();
  changeColor(wizardCoat, 'fill', COAT_COLORS);
};

var onWizardEyesClick = function (evt) {
  evt.preventDefault();
  changeColor(wizardEyes, 'fill', EYES_COLORS);
};

var onFireballClick = function (evt) {
  evt.preventDefault();
  changeColor(fireball, 'backgroundColor', FIREBALL_COLORS);
};

wizardCoat.addEventListener('click', onWizardCoatClick);
wizardEyes.addEventListener('click', onWizardEyesClick);
fireball.addEventListener('click', onFireballClick);
