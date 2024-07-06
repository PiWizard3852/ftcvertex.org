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
  const image = useSignal<HTMLImageElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    for (let i = firstFrame; i < frameCount + firstFrame; i++) {
      const image = new Image();
      image.src = `/render/${i.toString().padStart(3, "0")}.png`
    }

    image.value = new Image();
    image.value.src = `/render/${firstFrame.toString().padStart(3, "0")}.png`;

    image.value.onload = () => {
      canvas.value?.getContext('2d')?.drawImage(image.value ?? new Image(), 0, 0);
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
        frameCount + firstFrame - 2,
        Math.ceil(scrollFraction * frameCount + firstFrame)
      );

      requestAnimationFrame(() => {
        if (image.value) {
          image.value.src = `/render/${(frameIndex + 1).toString().padStart(3, "0")}.png`;

          context?.clearRect(0, 0, context.canvas.width, context.canvas.height);
          context?.drawImage(image.value, 0, 0);
        }
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
