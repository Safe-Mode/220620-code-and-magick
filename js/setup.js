'use strict';

(function () {
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

  var setup = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var generateWizards = function (count) {
    var wizards = [];

    for (var i = 0; i < count; i++) {
      var wizard = {
        name: NAMES[window.util.getRandomInt(0, NAMES.length - 1)] + ' ' +
              SURNAMES[window.util.getRandomInt(0, SURNAMES.length - 1)],
        coatColor: COAT_COLORS[window.util.getRandomInt(0, COAT_COLORS.length - 1)],
        eyesColor: EYES_COLORS[window.util.getRandomInt(0, EYES_COLORS.length - 1)]
      };

      wizards[i] = wizard;
    }

    return wizards;
  };

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

  insertElements(similarListElement);
  setup.querySelector('.setup-similar').classList.remove('hidden');

  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var wizardCoatInput = setup.querySelector('input[name=coat-color]');
  var wizardEyesInput = setup.querySelector('input[name=eyes-color]');
  var fireballInput = setup.querySelector('input[name=fireball-color]');

  var onWizardCoatClick = function (evt) {
    evt.preventDefault();
    window.colorize(evt.currentTarget, 'fill', wizardCoatInput, COAT_COLORS);
  };

  var onWizardEyesClick = function (evt) {
    evt.preventDefault();
    window.colorize(evt.currentTarget, 'fill', wizardEyesInput, EYES_COLORS);
  };

  var onFireballClick = function (evt) {
    evt.preventDefault();
    window.colorize(evt.currentTarget, 'backgroundColor', fireballInput, FIREBALL_COLORS);
  };

  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  fireball.addEventListener('click', onFireballClick);

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.cloneNode(true);
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.style.outline = '2px dashed red';
    }
  });

  shopElement.addEventListener('dragend', function (evt) {
    evt.preventDefault();
    artifactsElement.style.outline = '';
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
