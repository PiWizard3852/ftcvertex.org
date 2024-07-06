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

  const imageUrls: string[] = [];
  const images = useSignal<HTMLImageElement[]>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    for (let i = firstFrame; i < frameCount + firstFrame; i++) {
      imageUrls.push(`/render/${i.toString().padStart(3, "0")}.png`);
    }

    images.value = await Promise.all(
      imageUrls.map((url) => new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;

        image.onload = () => {
          resolve(image);
        };

        image.onerror = (error) => {
          reject(error)
        };
      })
    )) as HTMLImageElement[];

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
        context?.drawImage(images.value ? images.value[frameIndex + 1] : new Image(), 0, 0);
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
