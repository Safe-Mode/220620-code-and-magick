'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = ('rgba(0, 0, 0, 0.7)');
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = ('#ffffff');
  ctx.fillRect(100, 10, 420, 270);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = ('#000000');
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;
  var i;

  for (i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / (max - 0);
  var barWidth = 40;
  var indent = 50;
  var initialX = 120;
  var initialY = 240;
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

  for (i = 0; i < times.length; i++) {
    var barColor = 'rgba(0, 0, 255, ' + getRandomOpacity() + ')';
    var result = Math.floor(times[i]);

    ctx.fillStyle = barColor;

    if (names[i] === 'Вы') {
      ctx.fillStyle = playerBarColor;
    }

    ctx.fillRect(initialX + (barWidth + indent) * i, initialY, barWidth, times[i] * step * (-1));
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], initialX + (barWidth + indent) * i, initialY + lineHeight);
    ctx.fillText(result, initialX + (barWidth + indent) * i, initialY - lineHeight / 2 - times[i] * step);
  }
};
