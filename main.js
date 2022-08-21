//https://www.youtube.com/watch?v=qCBiKJbLcFI&t=454s

import { createEnemyController } from './EnemyController.js'; // AAAAAAAAAAAAAAA, didn't know upt o now that this is possible

const canvas = document.getElementById('game');
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext('2d');
const backgroundImg = new Image();
backgroundImg.src = 'images/space.png';
const enemyCtrl = createEnemyController(ctx);

function game() {
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  enemyCtrl.draw();
}

setInterval(game, 1000 / 60);
