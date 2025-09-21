export class Carousel {
  static init(selector) {
    for (const carousel of document.querySelectorAll(selector)) {
      const isScrollingClass = `${selector.replace(/^(\.|#)/, '')}--is-dragged`;

      let isScrolling = false;
      let startX = 0;
      let scrollLeft = 0;

      carousel.addEventListener('mousedown', ({ pageX: mouseX }) => {
        carousel.classList.add(isScrollingClass);
        isScrolling = true;
        startX = mouseX;
        scrollLeft = carousel.scrollLeft;
      });

      carousel.addEventListener('mouseleave', () => {
        carousel.classList.remove(isScrollingClass);
        isScrolling = false;
      });

      carousel.addEventListener('mouseup', () => {
        carousel.classList.remove(isScrollingClass);
        isScrolling = false;
      });

      carousel.addEventListener('mousemove', ({ pageX: mouseX }) => {
        if (!isScrolling) {
          return;
        }

        const scrollDelta = mouseX - startX;
        carousel.scrollLeft = scrollLeft - scrollDelta;
      });
    }
  }
}
