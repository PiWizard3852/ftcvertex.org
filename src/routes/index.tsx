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
        >
          <p>
            Your browser does not support HTML video. Please{' '}
            <a href='website_video.mp4'>download the video</a> to watch it.
          </p>
        </video>
        <div
          class={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000`}
        >
          <div class='flex items-center space-x-4'>
            <img
              src="/vertex_logo.svg"
              alt="Logo"
              width="359" /* Actual image dimensions */
              height="341"
              class="h-[15rem] w-auto mr-10"
            />
            <div class='text-center'>
              <h1 class='text-white custom-font mb-2 text-9xl font-bold'>
                FTC 15534
              </h1>
              <p class='text-white custom-font text-7xl'>VERTEX ROBOTICS</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
