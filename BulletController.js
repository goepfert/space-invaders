import { createBullet } from './Bullet.js';

const createBulletController = (canvas, maxBulletAtATime, bulletColor, soundEnabled) => {
  const shootSound = new Audio('sounds/shoot.wav');
  shootSound.volume = 0.5;

  const bullets = [];
  // const timeTillNextBulletAllowed = 0;

  function shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
    // if (timeTillNextBulletAllowed <= 0 && bullets.length < maxBulletAtATime) {
    bullets.push(createBullet(canvas, x, y, velocity, bulletColor));
    if (soundEnabled) {
      shootSound.currentTime = 0;
      shootSound.play();
    }
    // }
  }

  return {
    shoot,
  };
};

export { createBulletController };
