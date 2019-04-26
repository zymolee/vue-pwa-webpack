/* eslint-disable no-console */

import { register } from 'register-service-worker'
console.log(process.env.BASE_URL);
if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      alert(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (e) {
      alert('Service worker has been registered.')
      console.log('Service worker has been registered.')
    },
    cached () {
      alert('Content has been cached for offline use.')
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      alert('New content is downloading.')
      console.log('New content is downloading.')
    },
    updated () {
      alert('New content is available; please refresh.')
      console.log('New content is available; please refresh.')
    },
    offline () {
      alert('No internet connection found. App is running in offline mode.')
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
