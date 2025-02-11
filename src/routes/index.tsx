import { component$, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  useVisibleTask$(() => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          videoElement.muted = true;
          videoElement.play();
        });
      }
    }
  });

  return (
    <>
      <div class='relative h-screen w-full overflow-hidden'>
        <video
          autoplay
          muted
          loop
          playsInline
          poster='video_thumbnail.jpg'
          src='website_video.mp4'
          class='absolute left-0 top-0 h-full w-full object-cover'
        />
        <div
          class={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000`}
        >
          <div class='select-none flex items-center space-x-4 text-[min(18vw,30vh)] mt-[76px]'>
            <img
              src="/favicon.svg"
              alt="Logo"
              width="359"
              height="341"
              class="h-[1.6em] w-auto mr-[2vw]"
            />
            <div class='text-center pixel-powerline'>
              <h1 class='text-white mb-[.1em] font-bold'>
                15534
              </h1>
              <p class='text-white text-[.75em]'>VERTEX</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
