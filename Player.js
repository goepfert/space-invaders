const createPlayer = (canvas, xVelocity, bulletController) => {
  const width = 50;
  const height = 60;

  let x = canvas.width / 2 - width / 2;
  let y = canvas.height - 75;

  let image = new Image();
  image.src = `images/player.png`;

  let rightPressed = false;
  let leftPressed = false;
  let shootPressed = false;

  document.addEventListener('keydown', keydown);
  document.addEventListener('keyup', keyup);

  function draw(ctx) {
    move();
    if (shootPressed) {
      bulletController.shoot(x + width / 2, y, 8, 12);
    }
    ctx.drawImage(image, x, y, width, height);
  }

  function keydown(event) {
    if (event.code == 'ArrowRight') {
      rightPressed = true;
    } else if (event.code == 'ArrowLeft') {
      leftPressed = true;
    } else if (event.code == 'Space') {
      shootPressed = true;
    }
  }

  function keyup(event) {
    if (event.code == 'ArrowRight') {
      rightPressed = false;
    } else if (event.code == 'ArrowLeft') {
      leftPressed = false;
    } else if (event.code == 'Space') {
      shootPressed = false;
    }
  }

  function move() {
    if (rightPressed && x + width < canvas.width) {
      x += xVelocity;
    }
    if (leftPressed && x > 0) {
      x -= xVelocity;
    }
  }

  function getPosition() {
    return {
      x,
      y,
    };
  }

  return {
    draw,
    getPosition,
    width,
    height,
  };
};

export { createPlayer };
