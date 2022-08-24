import { createEnemy } from './Enemy.js';
import MovingDirection from './MovingDirection.js';

const createEnemyController = (canvas) => {
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

  function draw(ctx) {
    updateVelocityAndDirection();
    drawEnemies(ctx);
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
      row.forEach((enemyNubmer, enemyIndex) => {
        if (enemyNubmer > 0) {
          enemyRows[rowIndex].push(createEnemy(enemyIndex * 50, rowIndex * 35, enemyNubmer));
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

  return {
    draw,
  };
};

export { createEnemyController };
