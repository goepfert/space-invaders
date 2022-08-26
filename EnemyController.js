import { createEnemy } from './Enemy.js';

const createEnemyController = (canvas, enemyBulletController, playerBulletController) => {
  /**
   * Initial Mapping of Enemy Image and Position
   * Also used as hit counter (3 -> must be hit 3 times for killing)
   */
  const enemyMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];
  let enemyRows = [];

  const movingDirection = {
    left: 'left',
    right: 'right',
    downLeft: 'downLeft',
    downRight: 'downRight',
  };
  let currentDirection = movingDirection.right;

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
    move();
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

  function move() {
    // Do it only for one row ... this is not correct ...
    const row = enemyRows[0];
    switch (currentDirection) {
      case movingDirection.right:
        xVelocity = defaultXVelocity;
        yVelocity = 0;
        const rightMostEnemy = row[row.length - 1];
        if (rightMostEnemy.getPosition().x + rightMostEnemy.width >= canvas.width) {
          currentDirection = movingDirection.downLeft;
        }
        break;
      case movingDirection.downLeft:
        xVelocity = 0;
        yVelocity = defaultYVelocity;
        setTimeout(() => {
          currentDirection = movingDirection.left;
        }, moveDownTimer);
        break;
      case movingDirection.left:
        xVelocity = -defaultXVelocity;
        yVelocity = 0;
        const leftMostEnemy = row[0];
        if (leftMostEnemy.getPosition().x <= 0) {
          currentDirection = movingDirection.downRight;
        }
        break;
      case movingDirection.downRight:
        xVelocity = 0;
        yVelocity = defaultYVelocity;
        setTimeout(() => {
          currentDirection = movingDirection.right;
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
