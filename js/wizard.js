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

  var Wizard = function (data) {
    this.name = data.name;
    this.coatColor = data.colorCoat;
    this.eyesColor = data.colorEyes;
    this.fireballColor = data.colorFireball;
  };

  Wizard.prototype = {
    onChange: function (wizard) {
      return wizard;
    },

    setName: function (name) {
      if (!name) {
        throw new Error('Имя не задано');
      }

      if (name.length > 30) {
        throw new Error('Недопустимое значение имени мага: ' + name);
      }

      this.name = name;
      this.onChange(this);
      return name;
    },

    changeCoatColor: function (wizardPart, colorInput, callback) {
      window.colorizeElement(wizardPart, colorInput, COAT_COLORS, callback);
      this.coatColor = colorInput.value;
      this.onChange(this);
    },

    changeEyesColor: function (wizardPart, colorInput, callback) {
      window.colorizeElement(wizardPart, colorInput, EYES_COLORS, callback);
      this.eyesColor = colorInput.value;
      this.onChange(this);
    },

    changeFireballColor: function (wizardPart, colorInput, callback) {
      window.colorizeElement(wizardPart, colorInput, FIREBALL_COLORS, callback);
      this.fireballColor = colorInput.value;
      this.onChange(this);
    }
  };

  var formElement = document.querySelector('.setup-wizard-form');
  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var wizardCopy = document.querySelector('svg').cloneNode(true);

    wizardCopy.querySelector('#wizard-coat').style.fill = wizardCoatElement.style.fill;
    wizardCopy.querySelector('#wizard-eyes').style.fill = wizardEyesElement.style.fill;

    var wizardBase64Right = window.svg2base64(wizardCopy);

    // Чтобы развернуть мага, его надо подвинуть на его ширину, а затем отразить
    wizardCopy.querySelector('#wizard').setAttribute('transform', 'translate(62, 0) scale(-1, 1)');

    var wizardBase64Left = window.svg2base64(wizardCopy);

    window.restartGame(wizardBase64Right, wizardBase64Left);
  });

  window.Wizard = Wizard;
})();
