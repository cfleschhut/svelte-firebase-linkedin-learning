<script lang="ts">
  import { onMount } from 'svelte'
  import { session } from './stores'
  import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth'
  import { getFirestore, collection, getDocs } from 'firebase/firestore'

  import Signup from './auth/Signup.svelte'
  import Login from './auth/Login.svelte'
  import Logout from './auth/Logout.svelte'
  import ErrorList from './auth/ErrorList.svelte'

  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'

  const db = getFirestore()

  const readData = async () => {
    const querySnapshot = await getDocs(collection(db, 'cars'))
    querySnapshot.forEach((doc) => {
      console.log({
        id: doc.id,
        ...doc.data(),
      })
    })
  }

  const auth = getAuth()
  let errors = []

  const handleAuth = async (event: CustomEvent) => {
    if (event.detail) {
      errors = []
      const { email, password } = event.detail

      if (!email.length) errors.push('Email should not be empty')
      if (!password.length) errors.push('Password should not be empty')

      if (errors.length) return
    }

    switch (event.type) {
      case 'signin':
        try {
          const response = await signInWithEmailAndPassword(
            auth,
            event.detail.email,
            event.detail.password
          )
          console.log(response.user)
        } catch (error) {
          console.log(error.message)
        }
        break

      case 'signup':
        try {
          const response = await createUserWithEmailAndPassword(
            auth,
            event.detail.email,
            event.detail.password
          )
          console.log(response.user)
        } catch (error) {
          console.log(error.message)
        }
        break

      case 'logout':
        signOut(auth)
        break
    }
  }

  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        session.set({ user })
        console.log(user.uid, 'signed in')

        readData()
      } else {
        session.set({ user: null })
        console.log('not signed in')
      }
    })
  })
</script>

<main>
  {#if $session && $session.user == null}
    <Login on:signin={handleAuth} />
    <Signup on:signup={handleAuth} />

    <ErrorList {errors} />
  {:else}
    <Logout on:logout={handleAuth} />
  {/if}

  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
