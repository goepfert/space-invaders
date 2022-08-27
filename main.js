/**
 * Space Invader Game
 *
 * author: Thomas Goepfert
 *
 * heavily inspired by https://www.youtube.com/watch?v=qCBiKJbLcFI&t=454s
 */

import { createEnemyController } from './EnemyController.js';
import { createBulletController } from './BulletController.js';
import { createPlayer } from './Player.js';

const canvas = document.getElementById('game');
canvas.width = 600;
canvas.height = 600;

const ctx = canvas.getContext('2d');

const backgroundImg = new Image();
backgroundImg.src = 'images/space.png';

let playerBulletCtrl;
let enemyBulletCtrl;
let enemyCtrl;
let player;

let isPaused = true;
let isGameOver = false;
let didWin = false;
let gameID = 0;

/**
 * The game loop
 */
async function gameLoop() {
  checkGameOver();
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyCtrl.draw(ctx);
    player.draw(ctx);
    playerBulletCtrl.draw(ctx);
    enemyBulletCtrl.draw(ctx);
  } else {
    clearInterval(gameID);
    await sleep(1000);

    window.addEventListener('keydown', gameStart);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? 'You Won' : 'Game Over';
    let textOffset = didWin ? 3.5 : 5;

    ctx.fillStyle = 'white';
    ctx.font = '70px Arial';
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }

  // Check if space ship was shot
  if (enemyBulletCtrl.collideWith(player)) {
    isGameOver = true;
  }

  // Check if spaceship collides with enemies
  if (enemyCtrl.collideWith(player)) {
    isGameOver = true;
  }

  // Check if enemies gone too far --> not neccessary

  // Any enemies left?
  if (enemyCtrl.getNumberOfEnemies() === 0) {
    isGameOver = true;
    didWin = true;
  }
}

function init() {
  playerBulletCtrl = createBulletController(canvas, 4, 'lime', true);
  enemyBulletCtrl = createBulletController(canvas, 6, 'deeppink', false);
  enemyCtrl = createEnemyController(canvas, enemyBulletCtrl, playerBulletCtrl);
  player = createPlayer(canvas, 3, playerBulletCtrl);
}

init();

window.onload = () => {
  gameLoop();
  window.addEventListener('keydown', gameStart);
};

function gameStart(event) {
  if (event.code == 'Space') {
    if (isPaused || isGameOver) {
      isPaused = false;
      isGameOver = false;
      window.removeEventListener('keydown', gameStart);
      init();
      gameID = setInterval(gameLoop, 10);
    }
  }
}
