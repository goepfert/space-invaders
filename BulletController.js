import { createBullet } from './Bullet.js';

const createBulletController = (canvas, maxBulletAtATime, bulletColor, soundEnabled) => {
  const shootSound = new Audio('sounds/shoot.wav');
  shootSound.volume = 0.5;

  let bullets = [];
  let _timeTillNextBulletAllowed = 0;

  /**
   * Check all bullets if one of them overlaps with given object
   * if yes: remove bullet from array and return true
   */
  function collideWith(sprite) {
    let bulletThatHitSpriteIndex = -1;
    bullets.forEach((bullet, idx) => {
      if (bullet.collideWith(sprite)) {
        bulletThatHitSpriteIndex = idx;
      }
    });

    if (bulletThatHitSpriteIndex >= 0) {
      bullets.splice(bulletThatHitSpriteIndex, 1);
      return true;
    }
    return false;
  }

  /**
   * Shoot creates a new bullet with given velocity and color
   * Only allowed more bullets are allowed and timer is ready
   */
  function shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
    if (_timeTillNextBulletAllowed <= 0 && bullets.length < maxBulletAtATime) {
      bullets.push(createBullet(canvas, x, y, velocity, bulletColor));
      if (soundEnabled) {
        shootSound.currentTime = 0;
        shootSound.play();
      }
      _timeTillNextBulletAllowed = timeTillNextBulletAllowed;
    }
  }

  function draw(ctx) {
    bullets = bullets.filter((bullet) => {
      return !bullet.isOffScreen();
    });

    bullets.forEach((bullet, index) => {
      bullet.draw(ctx);
    });

    if (_timeTillNextBulletAllowed > 0) {
      _timeTillNextBulletAllowed--;
    }
  }

  return {
    collideWith,
    shoot,
    draw,
  };
};

export { createBulletController };
