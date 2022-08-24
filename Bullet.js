const createBullet = (canvas, x, y, velocity, bulletColor) => {
  const width = 5;
  const height = 20;

  function draw(ctx) {
    ctx.drawImage(image, x, y, width, height);
  }

  function move(xVelocity, yVelocity) {
    x += xVelocity;
    y += yVelocity;
  }

  return {
    draw,
  };
};

export { createBullet };
