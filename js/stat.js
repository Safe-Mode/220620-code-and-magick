'use strict';

window.renderStatistics = function (ctx, names, times) {
  var CANVAS_INIT_X = 100;
  var CANVAS_INIT_Y = 10;
  var CANVAS_SHADOW_INIT_X = 110;
  var CANVAS_SHADOW_INIT_Y = 20;
  var CANVAS_WIDTH = 420;
  var CANVAS_HEIGHT = 270;
  var CANVAS_PADDING_X = 20;
  var CANVAS_PADDING_Y = 30;

  var textInitX = CANVAS_INIT_X + CANVAS_PADDING_X;
  var textInitY = CANVAS_INIT_Y + CANVAS_PADDING_Y;
  var lineIndent = 20;

  ctx.fillStyle = ('rgba(0, 0, 0, 0.7)');
  ctx.fillRect(CANVAS_SHADOW_INIT_X, CANVAS_SHADOW_INIT_Y, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = ('#ffffff');
  ctx.fillRect(CANVAS_INIT_X, CANVAS_INIT_Y, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = ('#000000');
  ctx.fillText('Ура вы победили!', textInitX, textInitY);
  ctx.fillText('Список результатов:', textInitX, textInitY + lineIndent);

  var getMaxNumber = function (array) {
    var max = -1;

    for (var i = 0; i < array.length; i++) {
      var value = array[i];
      if (value > max) {
        max = value;
      }
    }

    return max;
  };

  var histogramHeight = 150;
  var step = histogramHeight / (getMaxNumber(times) - 0);
  var barWidth = 40;
  var indent = 50;
  var histogramInitX = CANVAS_INIT_X + CANVAS_PADDING_X;
  var histogramInitY = CANVAS_HEIGHT - CANVAS_PADDING_Y;
  var lineHeight = 24;
  var playerBarColor = 'rgba(255, 0, 0, 1)';

  var getRandomOpacity = function () {
    var opacity = Math.round(Math.random() * 10) / 10;

    if (opacity === 0) {
      opacity = 0.1;
    }

    if (opacity === 1) {
      opacity = 0.9;
    }

    return opacity;
  };

  for (var i = 0; i < times.length; i++) {
    var barColor = 'rgba(0, 0, 255, ' + getRandomOpacity() + ')';
    var result = Math.round(times[i]);

    ctx.fillStyle = barColor;

    if (names[i] === 'Вы') {
      ctx.fillStyle = playerBarColor;
    }

    ctx.fillRect(histogramInitX + (barWidth + indent) * i, histogramInitY, barWidth, times[i] * step * (-1));
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], histogramInitX + (barWidth + indent) * i, histogramInitY + lineHeight);
    ctx.fillText(result, histogramInitX + (barWidth + indent) * i, histogramInitY - lineHeight / 2 - times[i] * step);
  }
};
