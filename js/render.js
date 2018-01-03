'use strict';

(function () {
  var WIZARDS_COUNT = 4;

  var similarElement = document.querySelector('.setup-similar');
  var similarListElement = similarElement.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var createWizard = function (wizard) {
    var element = similarWizardTemplate.cloneNode(true);
    var wizardElement = element.querySelector('.wizard');

    element.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return element;
  };

  window.render = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      var wizard = new window.Wizard(data[i]);
      fragment.appendChild(createWizard(wizard));
    }

    similarListElement.innerHTML = '';
    similarListElement.appendChild(fragment);
    similarElement.classList.remove('hidden');
  };
})();
