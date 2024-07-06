import {
  $,
  component$,
  useOnDocument,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';

export default component$(() => {
  const frameCount = 181 as const;
  const firstFrame = 1 as const;

  const canvas = useSignal<HTMLCanvasElement>();

  const imageUrls: string[] = [];
  const images = useSignal<HTMLImageElement[]>();

  const mounted = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    for (let i = firstFrame; i < frameCount + firstFrame; i++) {
      imageUrls.push(
        `https://raw.githubusercontent.com/PiWizard3852/ftcvertex.org/main/public/render/${i.toString().padStart(4, '0')}.jpg`,
      );
    }

    images.value = (await Promise.all(
      imageUrls.map(
        (url) =>
          new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;

            image.onload = () => {
              resolve(image);
            };

            image.onerror = (error) => {
              reject(error);
            };
          }),
      ),
    )) as HTMLImageElement[];

    const image = new Image();
    image.src = imageUrls[0];

    image.onload = () => {
      const context = canvas.value?.getContext('2d');

      if (context) {
        context.filter = 'brightness(200%)';
        context.drawImage(image, 0, 0);
      }
    };

    mounted.value = true;
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
        Math.ceil(scrollFraction * frameCount),
      );

      if (context) {
        requestAnimationFrame(() => {
          context.filter = 'brightness(200%)';

          context.drawImage(
            images.value ? images.value[frameIndex + 1] : new Image(),
            0,
            0,
          );
        });
      }
    }),
  );

  return (
    <>
      <canvas
        class={
          'max-w-screen fixed left-[50%] top-[50%] z-0 h-screen -translate-x-[50%] -translate-y-[50%] backdrop-brightness-200 transition-opacity duration-1000 ' +
          (mounted.value ? 'opacity-100' : 'opacity-0')
        }
        width={1920}
        height={1080}
        ref={canvas}
      />
      <div class='h-[500vh] w-full' />
    </>
  );
});
