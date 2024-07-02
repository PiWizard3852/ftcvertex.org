import { component$ } from '@builder.io/qwik'
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city'

import { RouterHead } from '~/components/qwik'

import './global.css'

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <title>15534 VERTEX</title>
        <meta charset='utf-8' />
        <link
          rel='manifest'
          href='/manifest.json'
        />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang='en'>
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  )
})
