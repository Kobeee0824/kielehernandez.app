const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const leftBtn = carousel.querySelector('.carousel-btn.left');
  const rightBtn = carousel.querySelector('.carousel-btn.right');

  let currentIndex = 0;
  const totalItems = track ? track.children.length : 0;

  function updateCarousel() {
    if (!track || totalItems === 0) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const itemWidth = track.children[0].getBoundingClientRect().width + gap;
    const visibleItems = Math.max(1, Math.floor((carousel.clientWidth + gap) / itemWidth));
    const maxIndex = Math.max(0, totalItems - visibleItems);

    // Clamp currentIndex
    currentIndex = Math.min(Math.max(0, currentIndex), maxIndex);

    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

    if (leftBtn) leftBtn.disabled = currentIndex === 0;
    if (rightBtn) rightBtn.disabled = currentIndex === maxIndex;
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      if (!track || totalItems === 0) return;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const itemWidth = track.children[0].getBoundingClientRect().width + gap;
      const visibleItems = Math.max(1, Math.floor((carousel.clientWidth + gap) / itemWidth));
      const maxIndex = Math.max(0, totalItems - visibleItems);
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });
  }

  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }

  // Recalculate on resize to handle responsive changes
  window.addEventListener('resize', updateCarousel);

  // Initialize carousel position
  updateCarousel();
});
