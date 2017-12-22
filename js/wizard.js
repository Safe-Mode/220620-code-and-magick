'use strict';

(function () {
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

  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var wizardCoatInput = setup.querySelector('input[name=coat-color]');
  var wizardEyesInput = setup.querySelector('input[name=eyes-color]');
  var fireballInput = setup.querySelector('input[name=fireball-color]');

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {},
    onFireballChange: function () {}
  };

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  var onWizardCoatClick = function (evt) {
    evt.preventDefault();
    window.colorizeElement(evt.currentTarget, wizardCoatInput, COAT_COLORS, fillElement);
    wizard.onCoatChange(wizardCoatInput.value);
  };

  var onWizardEyesClick = function (evt) {
    evt.preventDefault();
    window.colorizeElement(evt.currentTarget, wizardEyesInput, EYES_COLORS, fillElement);
    wizard.onEyesChange(wizardEyesInput.value);
  };

  var onFireballClick = function (evt) {
    evt.preventDefault();
    window.colorizeElement(evt.currentTarget, fireballInput, FIREBALL_COLORS, changeElementBackground);
    wizard.onFireballChange(fireballInput.value);
  };

  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  fireball.addEventListener('click', onFireballClick);

  return window.wizard = wizard;
})();
