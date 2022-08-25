import { createEnemy } from './Enemy.js';
import MovingDirection from './MovingDirection.js';

const createEnemyController = (canvas, enemyBulletController, playerBulletController) => {
  const enemyMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];
  let enemyRows = [];

  let currentDirection = MovingDirection.right;
  let xVelocity = 0;
  let yVelocity = 0;
  const defaultXVelocity = 1;
  const defaultYVelocity = 1;
  const moveDownTimerDefault = 200;
  let moveDownTimer = moveDownTimerDefault;

  const fireBulletTimerDefault = 50;
  let fireBulletTimer = fireBulletTimerDefault;

  const enemyDeathSound = new Audio('sounds/enemy-death.wav');
  enemyDeathSound.volume = 0.1;

  function draw(ctx) {
    updateVelocityAndDirection();
    collisionDetection();
    drawEnemies(ctx);
    fireBullet();
  }

  function collisionDetection() {
    enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if (playerBulletController.collideWith(enemy)) {
          enemyDeathSound.currentTime = 0;
          enemyDeathSound.play();
          if (enemy.isKilled()) {
            enemyRow.splice(enemyIndex, 1);
          }
        }
      });
    });

    enemyRows = enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }

  function fireBullet() {
    fireBulletTimer--;
    if (fireBulletTimer <= 0) {
      fireBulletTimer = fireBulletTimerDefault;
      const allEnemies = enemyRows.flat();
      const enemyIndex = Math.floor(Math.random() * allEnemies.length);
      const enemy = allEnemies[enemyIndex];
      enemyBulletController.shoot(enemy.getPosition().x + enemy.width / 2 - 2, enemy.getPosition().y, -3);
    }
  }

  function updateVelocityAndDirection() {
    // Do it only for ine row
    const row = enemyRows[0];
    switch (currentDirection) {
      case MovingDirection.right:
        xVelocity = defaultXVelocity;
        yVelocity = 0;
        const rightMostEnemy = row[row.length - 1];
        if (rightMostEnemy.getPosition().x + rightMostEnemy.width >= canvas.width) {
          currentDirection = MovingDirection.downLeft;
        }
        break;
      case MovingDirection.downLeft:
        xVelocity = 0;
        yVelocity = defaultYVelocity;
        setTimeout(() => {
          currentDirection = MovingDirection.left;
        }, moveDownTimer);
        break;
      case MovingDirection.left:
        xVelocity = -defaultXVelocity;
        yVelocity = 0;
        const leftMostEnemy = row[0];
        if (leftMostEnemy.getPosition().x <= 0) {
          currentDirection = MovingDirection.downRight;
        }
        break;
      case MovingDirection.downRight:
        xVelocity = 0;
        yVelocity = defaultYVelocity;
        setTimeout(() => {
          currentDirection = MovingDirection.right;
        }, moveDownTimer);
        break;
    }
  }

  (function createEnemies() {
    enemyMap.forEach((row, rowIndex) => {
      enemyRows[rowIndex] = [];
      row.forEach((enemyNumber, enemyIndex) => {
        if (enemyNumber > 0) {
          enemyRows[rowIndex].push(createEnemy(enemyIndex * 50, rowIndex * 35, enemyNumber));
        }
      });
    });
  })();

  function drawEnemies(ctx) {
    enemyRows.flat().forEach((enemy) => {
      enemy.move(xVelocity, yVelocity);
      enemy.draw(ctx);
    });
  }

  function collideWith(sprite) {
    return enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
  }

  return {
    draw,
    collideWith,
    getNumberOfEnemies: () => {
      return enemyRows.flat().length;
    },
  };
};

export { createEnemyController };
