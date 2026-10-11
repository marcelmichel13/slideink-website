(() => {
  const demo = document.querySelector('[data-hero-demo]');
  const video = demo && demo.querySelector('video');
  if (!video) return;

  const control = demo.querySelector('[data-hero-demo-control]');

  // state: "playing", "paused" or "ended"; drives the control icon and label.
  const setState = state => {
    demo.dataset.state = state;
    if (!control) return;
    const label = { playing: 'labelPause', paused: 'labelPlay', ended: 'labelReplay' }[state];
    control.setAttribute('aria-label', control.dataset[label]);
  };

  // Shows the finished drawing without playing the animation.
  const showFinalFrame = () => {
    setState('ended');
    const seekToEnd = () => {
      video.currentTime = Math.max(0, video.duration - 0.05);
    };
    if (video.readyState >= 1) seekToEnd();
    else video.addEventListener('loadedmetadata', seekToEnd, { once: true });
  };

  const play = () => {
    const attempt = video.play();
    if (attempt) attempt.catch(showFinalFrame);
  };

  video.addEventListener('play', () => setState('playing'));
  video.addEventListener('pause', () => {
    if (!video.ended) setState('paused');
  });
  video.addEventListener('ended', () => setState('ended'));

  if (control) {
    control.hidden = false;
    control.addEventListener('click', () => {
      if (demo.dataset.state === 'playing') {
        video.pause();
        return;
      }
      if (demo.dataset.state === 'ended') video.currentTime = 0;
      play();
    });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showFinalFrame();
    return;
  }

  setState('paused');
  if (navigator.connection && navigator.connection.saveData) return;

  // Plays once, when most of the video is on screen.
  if (!('IntersectionObserver' in window)) {
    play();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    play();
  }, { threshold: 0.6 });
  observer.observe(video);
})();
