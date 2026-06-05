document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('circular-gallery-container');
  const ring = document.getElementById('circular-gallery-ring');
  if (!ring || !container) return;

  const items = ring.querySelectorAll('.circular-gallery-item');
  const numItems = items.length;
  if (numItems === 0) return;

  const angle = 360 / numItems;
  // Calculate radius based on width of item (approx 250px)
  const radius = 250 / (2 * Math.tan(Math.PI / numItems)) + 50; // extra padding

  items.forEach((item, index) => {
    item.style.transform = `rotateY(${index * angle}deg) translateZ(${radius}px)`;
  });

  let currentAngle = 0;
  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let velocity = 0;
  let animationFrame;
  let autoRotateSpeed = 0.15;

  const onDown = (e) => {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    lastX = startX;
    velocity = 0;
    cancelAnimationFrame(animationFrame);
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const dx = x - lastX;
    currentAngle += dx * 0.4; // Sensitivity
    ring.style.transform = `rotateY(${currentAngle}deg)`;
    velocity = dx;
    lastX = x;
  };

  const onUp = () => {
    if (!isDragging) return;
    isDragging = false;
    
    // Apply inertia
    const applyInertia = () => {
      velocity *= 0.95; // Friction
      if (Math.abs(velocity) > 0.1) {
        currentAngle += velocity * 0.4;
        ring.style.transform = `rotateY(${currentAngle}deg)`;
        animationFrame = requestAnimationFrame(applyInertia);
      } else {
        // Resume auto-rotation after inertia stops
        startAutoRotate();
      }
    };
    applyInertia();
  };

  container.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  
  container.addEventListener('touchstart', onDown, {passive: true});
  window.addEventListener('touchmove', onMove, {passive: true});
  window.addEventListener('touchend', onUp);

  // Auto-rotate loop
  const startAutoRotate = () => {
    cancelAnimationFrame(animationFrame);
    const loop = () => {
      if (!isDragging) {
        currentAngle -= autoRotateSpeed;
        ring.style.transform = `rotateY(${currentAngle}deg)`;
      }
      animationFrame = requestAnimationFrame(loop);
    };
    loop();
  };

  startAutoRotate();
});
