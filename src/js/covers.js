const refs = {
  coversItems: document.querySelectorAll('.covers-item'),
  coversContent: document.querySelector('.covers-content'),
  audioElement: document.getElementById('audio'),
};

refs.audioElement.volume = 0.1;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      refs.coversItems.forEach(item => item.classList.add('covers-animation'));
    } else {
      refs.coversItems.forEach(item =>
        item.classList.remove('covers-animation')
      );
    }
  });
});

observer.observe(refs.coversContent);
