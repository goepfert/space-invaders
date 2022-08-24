//https://www.youtube.com/watch?v=qCBiKJbLcFI&t=454s

import { createEnemyController } from './EnemyController.js';
import { createBulletController } from './BulletController.js';
import { createPlayer } from './Player.js';

const canvas = document.getElementById('game');
canvas.width = 600;
canvas.height = 600;

const ctx = canvas.getContext('2d');

const backgroundImg = new Image();
backgroundImg.src = 'images/space.png';

const playerBulletCtrl = createBulletController(canvas, 5, 'red', true);
const enemyBulletCtrl = createBulletController(canvas, 4, 'white', false);
const enemyCtrl = createEnemyController(canvas, enemyBulletCtrl, playerBulletCtrl);
const player = createPlayer(canvas, 3, playerBulletCtrl);

function game() {
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  enemyCtrl.draw(ctx);
  player.draw(ctx);
  playerBulletCtrl.draw(ctx);
  enemyBulletCtrl.draw(ctx);
}

setInterval(game, 12);
