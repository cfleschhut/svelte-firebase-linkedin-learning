import { initializeApp } from 'firebase/app'

import App from './App.svelte'
import './app.css'

const firebaseConfig = {
  apiKey: 'AIzaSyAH8cTRTHDT_3-QA52mJW4Xc823F56ibog',
  authDomain: 'linkedinlearningsveltefirebase.firebaseapp.com',
  projectId: 'linkedinlearningsveltefirebase',
  storageBucket: 'linkedinlearningsveltefirebase.appspot.com',
  messagingSenderId: '282619833638',
  appId: '1:282619833638:web:d30184df16c64001c6a5e7',
}

initializeApp(firebaseConfig)

const app = new App({
  target: document.getElementById('app'),
})

export default app
