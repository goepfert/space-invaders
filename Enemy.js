const createEnemy = (x, y, imagenumber) => {
  const width = 44;
  const height = 32;

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

  return {
    draw,
    move,
    getPosition,
    width,
    height,
  };
};

export { createEnemy };
