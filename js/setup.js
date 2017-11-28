'use strict';

var userDialog = document.querySelector('.setup');
var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var surnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var wizards = [
  {
    name: names[getRandomInt(0, names.length - 1)] + ' ' +
          surnames[getRandomInt(0, surnames.length - 1)],
    coatColor: coatColors[getRandomInt(0, coatColors.length - 1)],
    eyesColor: eyesColors[getRandomInt(0, eyesColors.length - 1)],
  },
  {
    name: names[getRandomInt(0, names.length - 1)] + ' ' +
          surnames[getRandomInt(0, surnames.length - 1)],
    coatColor: coatColors[getRandomInt(0, coatColors.length - 1)],
    eyesColor: eyesColors[getRandomInt(0, eyesColors.length - 1)],
  },
  {
    name: names[getRandomInt(0, names.length - 1)] + ' ' +
          surnames[getRandomInt(0, surnames.length - 1)],
    coatColor: coatColors[getRandomInt(0, coatColors.length - 1)],
    eyesColor: eyesColors[getRandomInt(0, eyesColors.length - 1)],
  },
  {
    name: names[getRandomInt(0, names.length - 1)] + ' ' +
          surnames[getRandomInt(0, surnames.length - 1)],
    coatColor: coatColors[getRandomInt(0, coatColors.length - 1)],
    eyesColor: eyesColors[getRandomInt(0, eyesColors.length - 1)],
  }
];

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

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  parentNode.appendChild(fragment);
};

insertElements(similarListElement);
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');
