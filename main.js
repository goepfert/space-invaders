/**
 * Space Invader Game
 *
 * author: Thomas Goepfert
 *
 * heavily inspired by https://www.youtube.com/watch?v=qCBiKJbLcFI&t=454s and many others!!!
 */

import { createEnemyController } from './EnemyController.js';
import { createBulletController } from './BulletController.js';
import { createPlayer } from './Player.js';

const comment = document.getElementById('comment');
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

let isPaused;
let isGameOver;
let didWin;
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
    comment.classList.remove('invisible');
    window.addEventListener('keydown', gameStart);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? 'You Win!' : 'Game Over';
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

  // Check if enemies gone too far --> not necessary

  // Any enemies left?
  if (enemyCtrl.getNumberOfEnemies() === 0) {
    isGameOver = true;
    didWin = true;
  }
}

function init() {
  playerBulletCtrl = createBulletController(canvas, 4, 'lime', true);
  enemyBulletCtrl = createBulletController(canvas, 10, 'deeppink', false);
  enemyCtrl = createEnemyController(canvas, enemyBulletCtrl, playerBulletCtrl);
  player = createPlayer(canvas, 3, playerBulletCtrl);
  isPaused = false;
  isGameOver = false;
  didWin = false;
}

init();

window.onload = () => {
  isPaused = true;
  gameLoop();
  window.addEventListener('keydown', gameStart);
};

function gameStart(event) {
  if (event.code == 'Space') {
    if (isPaused || isGameOver) {
      comment.classList.add('invisible');
      window.removeEventListener('keydown', gameStart);
      init();
      gameID = setInterval(gameLoop, 10);
    }
  }
}
