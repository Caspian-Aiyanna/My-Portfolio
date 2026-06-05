// paws.js - Reactive background theme with animal pug marks

const SVGS = {
  bear: '<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M12,2C10.9,2 10,2.9 10,4A2,2 0 0,0 12,6A2,2 0 0,0 14,4C14,2.9 13.1,2 12,2M7.8,3.5C6.7,3.5 5.8,4.4 5.8,5.5C5.8,6.6 6.7,7.5 7.8,7.5A2,2 0 0,0 9.8,5.5C9.8,4.4 8.9,3.5 7.8,3.5M16.2,3.5C15.1,3.5 14.2,4.4 14.2,5.5C14.2,6.6 15.1,7.5 16.2,7.5A2,2 0 0,0 18.2,5.5C18.2,4.4 17.3,3.5 16.2,3.5M4,7.5C2.9,7.5 2,8.4 2,9.5C2,10.6 2.9,11.5 4,11.5A2,2 0 0,0 6,9.5C6,8.4 5.1,7.5 4,7.5M20,7.5C18.9,7.5 18,8.4 18,9.5C18,10.6 18.9,11.5 20,11.5A2,2 0 0,0 22,9.5C22,8.4 21.1,7.5 20,7.5M12,9C8,9 5,12 5,16C5,20 8.1,22 12,22C15.9,22 19,20 19,16C19,12 16,9 12,9Z" /></svg>',
  cat: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M10,8.5C10,7.1 9.1,6 8,6C6.9,6 6,7.1 6,8.5C6,9.9 6.9,11 8,11C9.1,11 10,9.9 10,8.5M12,4.5C12,3.1 11.1,2 10,2C8.9,2 8,3.1 8,4.5C8,5.9 8.9,7 10,7C11.1,7 12,5.9 12,4.5M16,4.5C16,3.1 15.1,2 14,2C12.9,2 12,3.1 12,4.5C12,5.9 12.9,7 14,7C15.1,7 16,5.9 16,4.5M18,8.5C18,7.1 17.1,6 16,6C14.9,6 14,7.1 14,8.5C14,9.9 14.9,11 16,11C17.1,11 18,9.9 18,8.5M15.4,12C14.6,10.8 13.4,10 12,10C10.6,10 9.4,10.8 8.6,12C7.6,13.5 7,15.2 7,17C7,19.8 9.2,22 12,22C14.8,22 17,19.8 17,17C17,15.2 16.4,13.5 15.4,12Z" /></svg>',
  tiger: '<svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M8.5,10C7.7,10 7,9.3 7,8.5C7,7.7 7.7,7 8.5,7C9.3,7 10,7.7 10,8.5C10,9.3 9.3,10 8.5,10M11,6.5C11,5.7 10.3,5 9.5,5C8.7,5 8,5.7 8,6.5C8,7.3 8.7,8 9.5,8C10.3,8 11,7.3 11,6.5M14.5,5C13.7,5 13,5.7 13,6.5C13,7.3 13.7,8 14.5,8C15.3,8 16,7.3 16,6.5C16,5.7 15.3,5 14.5,5M17,8.5C17,7.7 16.3,7 15.5,7C14.7,7 14,7.7 14,8.5C14,9.3 14.7,10 15.5,10C16.3,10 17,9.3 17,8.5M15.5,13C14.5,11.5 13.3,11 12,11C10.7,11 9.5,11.5 8.5,13C7.2,14.8 6.5,16.8 6.5,19C6.5,21.8 9,24 12,24C15,24 17.5,21.8 17.5,19C17.5,16.8 16.8,14.8 15.5,13Z" /></svg>'
};

const animals = ['bear', 'cat', 'tiger'];
let currentAnimal = animals[Math.floor(Math.random() * animals.length)];

let lastX = 0;
let lastY = 0;
let isRight = false;

// A small debounce/throttle state
let ticking = false;

document.addEventListener('mousemove', (e) => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const x = e.pageX;
    const y = e.pageY;

    if (lastX === 0 && lastY === 0) {
      lastX = x;
      lastY = y;
      ticking = false;
      return;
    }

    const dx = x - lastX;
    const dy = y - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const threshold = currentAnimal === 'tiger' ? 80 : currentAnimal === 'bear' ? 65 : 40;

    if (dist > threshold) {
      const angle = Math.atan2(dy, dx);
      const rotation = angle * (180 / Math.PI) + 90;

      const perpAngle = angle + (isRight ? Math.PI / 2 : -Math.PI / 2);
      const displacement = currentAnimal === 'cat' ? 12 : 24;

      const posX = x + Math.cos(perpAngle) * displacement;
      const posY = y + Math.sin(perpAngle) * displacement;

      const paw = document.createElement('div');
      paw.className = 'pug-mark';
      paw.innerHTML = SVGS[currentAnimal];
      paw.style.left = `${posX}px`;
      paw.style.top = `${posY}px`;
      paw.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
      paw.style.opacity = '1';
      paw.style.transition = 'none';

      document.body.appendChild(paw);

      // Allow browser to render then animate
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          paw.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
          setTimeout(() => {
            paw.style.opacity = '0';
            paw.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0.8)`;
          }, 300);
        });
      });

      setTimeout(() => {
        paw.remove();
      }, 2500);

      lastX = x;
      lastY = y;
      isRight = !isRight;

      // Randomly change animal occasionally (10% chance)
      if (Math.random() < 0.10) {
        currentAnimal = animals[Math.floor(Math.random() * animals.length)];
      }
    }
    ticking = false;
  });
});
