const createBullet = (canvas, x, y, velocity, bulletColor) => {
  const width = 5;
  const height = 20;

  function draw(ctx) {
    y -= velocity;
    ctx.fillStyle = bulletColor;
    ctx.fillRect(x, y, width, height);
  }

  function isOffScreen() {
    if (y - height <= 0 || y > canvas.height) {
      return true;
    }
  }

  function collideWith(sprite) {
    const spriteX = sprite.getPosition().x;
    const spriteY = sprite.getPosition().y;

    if (x + width > spriteX && x < spriteX + sprite.width && y + height > spriteY && y < spriteY + sprite.height) {
      return true;
    } else {
      return false;
    }
  }

  return {
    draw,
    isOffScreen,
    collideWith,
  };
};

export { createBullet };
