import { Slot, component$, useVisibleTask$ } from '@builder.io/qwik';
import { Link, type RequestHandler } from '@builder.io/qwik-city';

import Lenis from 'lenis';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  const pages = ['team', 'awards', 'matches', 'contact'] as const;

  // let location = useLocation();

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
            <img
              src='/favicon.svg'
              alt='15534 VERTEX'
              class='h-[40px] w-[40px]'
              width='40'
              height='40'
            />
          </Link>
          <ul class='grid grid-cols-2 items-center gap-x-[16px] sm:flex sm:grid-cols-4'>
            {pages.map((page, key) => (
              <li
                class='duration-200 hover:text-branding'
                key={key}
              >
                <Link href={page}>{page}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main class='min-h-full min-w-full'>
        <Slot />
      </main>
    </div>
  );
});
