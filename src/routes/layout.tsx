import { Slot, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Link, type RequestHandler, useLocation } from '@builder.io/qwik-city';

import Lenis from 'lenis';
import Logo from '~/logo.svg?jsx';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export const DecryptText = component$(({ content }: { content: string }) => {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-=_+[]{}|\\;:\'",.<>?/`~'.split(
      '',
    );

  const decryptDuration = 2000 as const;

  const decrypting = useSignal(false);
  const encrypted = useSignal(content);

  return (
    <span
      onMouseOver$={() => {
        decrypting.value = true;

        let text = content
          .split('')
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join('');

        let progress = 0;
        let lastTime: number;

        const decrypt = (time: number) => {
          if (text === content || !decrypting.value) {
            decrypting.value = false;
            return;
          }

          if (!lastTime) {
            lastTime = time;
          }

          progress += time - lastTime;

          text = content
            .split('')
            .map((char, index) => {
              if (Math.random() < progress / decryptDuration) {
                return char;
              }

              if (Math.random() < 0.1) {
                return chars[Math.floor(Math.random() * chars.length)];
              }

              return text[index];
            })
            .join('');

          console.log(text);
          encrypted.value = text;

          lastTime = time;

          if (progress < decryptDuration) {
            requestAnimationFrame(decrypt);
          }
        };

        requestAnimationFrame(decrypt);
      }}
      onMouseOut$={() => {
        decrypting.value = false;
      }}
    >
      {decrypting.value ? encrypted.value : content}
    </span>
  );
});

export default component$(() => {
  const pages = ['team', 'awards', 'matches', 'contact'] as const;

  const location = useLocation();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <div class='p-[16px]'>
      <header class='fixed z-10 w-[calc(100%-32px)] rounded-[12px] border border-solid border-border uppercase backdrop-blur-md'>
        <nav class='flex items-center justify-between px-[20px] py-[12px]'>
          <Link href={'/'}>
            <Logo class='h-[40px] w-[40px]' />
          </Link>
          <ul class='grid grid-cols-2 items-center gap-x-[16px] sm:flex sm:grid-cols-4'>
            {pages.map((page, key) => (
              <li
                class={
                  'duration-200 hover:text-branding' +
                  (location.url.pathname === `/${page}/`
                    ? ' text-branding'
                    : '')
                }
                key={key}
              >
                <Link href={'/' + page + '/'}>
                  <DecryptText content={page} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main class='min-h-full min-w-full pt-[82px]'>
        <Slot />
      </main>
    </div>
  );
});
