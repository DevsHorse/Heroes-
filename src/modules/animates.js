export const animateFilter = () => {
  const filter = document.querySelector('.films-container');
  filter.style.transition = 'transform 1s ease';

  document.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 167) {
      filter.style.transform = `translateY(${document.documentElement.scrollTop - 167}px)`;
    } else {
      filter.style.transform = 'none';
    }
  });
};

export const titleShadowAnimate = () => {
  const title = document.querySelector('.logo');

  let count = 0;
  let inc = 1;
  // eslint-disable-next-line no-unused-vars
  let id = null;

  const animate = () => {
    id = requestAnimationFrame(animate);
    count += inc;
    if (count === 0) {
      inc = 1;
    }

    title.style.textShadow = `0 0 ${5 + count / 5}px #fff`;

    if (count === 50) {
      inc = -1;
    }
  };
  id = requestAnimationFrame(animate);
};