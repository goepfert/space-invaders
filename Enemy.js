const createEnemy = (x, y, imageumber) => {
  const width = 44;
  const height = 32;

  let image = new Image();
  image.src = `images/enemy${imageumber}.png`;

  function draw(ctx) {
    ctx.drawImage(image, x, y, width, height);
  }

  return {
    draw,
  };
};

export { createEnemy };
