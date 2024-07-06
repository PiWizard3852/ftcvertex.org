import {
  $,
  component$,
  useOnDocument,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';

export default component$(() => {
  const frameCount = 175 as const;
  const firstFrame = 66 as const;

  const canvas = useSignal<HTMLCanvasElement>();
  const images: HTMLImageElement[] = [];

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    for (let i = firstFrame; i < frameCount + firstFrame; i++) {
      const image = new Image();
      image.src = `/render/${i.toString().padStart(3, "0")}.png`

      images.push(image);
    }

    const image = new Image();
    image.src = `/render/${firstFrame.toString().padStart(3, "0")}.png`;

    image.onload = () => {
      canvas.value?.getContext('2d')?.drawImage(image, 0, 0);
    }
  });


  useOnDocument(
    'scroll',
    $(() => {
      const context = canvas.value?.getContext('2d');

      const html = document.documentElement;
      const scrollTop = html.scrollTop;
      const maxScrollTop = html.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;

      const frameIndex = Math.min(
        frameCount - 2,
        Math.ceil(scrollFraction * frameCount)
      );

      requestAnimationFrame(() => {
        context?.drawImage(images[frameIndex + 1], 0, 0);
      });
    }),
  );

  return (
    <>
      <canvas
        class='fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] max-w-screen max-h-screen'
        width={1920}
        height={1080}
        ref={canvas}
      />
      <div class='h-[500vh] w-full' />
    </>
  );
});
