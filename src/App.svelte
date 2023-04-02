<script lang="ts">
  import { onMount } from 'svelte'
  import { session, path } from './stores'
  import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from 'firebase/auth'

  import Signup from './auth/Signup.svelte'
  import Login from './auth/Login.svelte'
  import Logout from './auth/Logout.svelte'
  import ErrorList from './auth/ErrorList.svelte'
  import TodoList from './lib/TodoList.svelte'

  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'

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

  const handleHashChange = () => {
    path.set(window.location.hash.slice(1))
  }

  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        session.set({ user })
        window.location.hash = `/user/${user.uid}`

        console.log(user.uid, 'signed in')
      } else {
        session.set({ user: null })
        window.location.hash = '/'

        console.log('not signed in')
      }
    })
  })
</script>

<svelte:window on:hashchange={handleHashChange} />

<main>
  {#if $session && $session.user != null}
    <TodoList />
    <Logout on:logout={handleAuth} />
  {:else}
    <p>
      <a href="#/login">Login</a> |
      <a href="#/signup">Signup</a>
    </p>

    {#if $path === '/login'}
      <Login on:signin={handleAuth} />
    {:else if $path === '/signup'}
      <Signup on:signup={handleAuth} />
    {/if}
    <ErrorList {errors} />
  {/if}

  <h1>Vite + Svelte</h1>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>

  <div class="card">
    <Counter />
  </div>
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
</style>
