const createEnemy = (x, y, imagenumber) => {
  const width = 44;
  const height = 32;
  let hitCounter = imagenumber;

  let image = new Image();
  image.src = `images/enemy${imagenumber}.png`;

  function draw(ctx) {
    ctx.drawImage(image, x, y, width, height);
  }

  function move(xVelocity, yVelocity) {
    x += xVelocity;
    y += yVelocity;
  }

  function getPosition() {
    return {
      x,
      y,
    };
  }

  // same as in bullet ...
  function collideWith(sprite) {
    const spriteX = sprite.getPosition().x;
    const spriteY = sprite.getPosition().y;

    if (x + width > spriteX && x < spriteX + sprite.width && y + height > spriteY && y < spriteY + sprite.height) {
      return true;
    } else {
      return false;
    }
  }

  function hit() {
    hitCounter--;
  }

  function isKilled() {
    if (hitCounter <= 0) {
      return true;
    } else {
      return false;
    }
  }

  return {
    draw,
    move,
    getPosition,
    collideWith,
    width,
    height,
    hit,
    isKilled,
  };
};

export { createEnemy };
