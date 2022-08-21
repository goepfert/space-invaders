import { createEnemy } from './Enemy.js';

const createEnemyController = (ctx) => {
  const enemyMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];
  let enemyRows = [];

  createEnemies();

  function draw() {
    drawEnemies(ctx);
  }

  function createEnemies() {
    enemyMap.forEach((row, rowIndex) => {
      enemyRows[rowIndex] = [];
      row.forEach((enemyNubmer, enemyIndex) => {
        if (enemyNubmer > 0) {
          enemyRows[rowIndex].push(createEnemy(enemyIndex * 50, rowIndex * 35, enemyNubmer));
        }
      });
    });
  }

  function drawEnemies(ctx) {
    enemyRows.flat().forEach((enemy) => {
      enemy.draw(ctx);
    });
  }

  return {
    draw,
  };
};

export { createEnemyController };
