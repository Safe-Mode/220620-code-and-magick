'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var wizardCoatInput = setup.querySelector('input[name=coat-color]');
  var wizardEyesInput = setup.querySelector('input[name=eyes-color]');
  var fireballInput = setup.querySelector('input[name=fireball-color]');
  var wizardName = document.querySelector('.setup-user-name');

  var wizard = new window.Wizard({name: wizardName.value});

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  var onWizardCoatClick = function (evt) {
    evt.preventDefault();
    wizard.changeCoatColor(evt.currentTarget, wizardCoatInput, fillElement);
  };

  var onWizardEyesClick = function (evt) {
    evt.preventDefault();
    wizard.changeEyesColor(evt.currentTarget, wizardEyesInput, fillElement);
  };

  var onFireballClick = function (evt) {
    evt.preventDefault();
    wizard.changeFireballColor(evt.currentTarget, fireballInput, changeElementBackground);
  };

  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  fireball.addEventListener('click', onFireballClick);

  window.myWizard = wizard;
})();
