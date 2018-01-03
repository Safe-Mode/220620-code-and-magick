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
      this.onChange(this);
    },

    changeEyesColor: function (wizardPart, colorInput, callback) {
      window.colorizeElement(wizardPart, colorInput, EYES_COLORS, callback);
      this.onChange(this);
    },

    changeFireballColor: function (wizardPart, colorInput, callback) {
      window.colorizeElement(wizardPart, colorInput, FIREBALL_COLORS, callback);
      this.onChange(this);
    }
  };

  window.Wizard = Wizard;
})();
