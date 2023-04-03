<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  let email = ''
  let password = ''

  const dispatch = createEventDispatcher()

  const handleSubmit = () => {
    dispatch('signin', {
      email,
      password,
    })
  }
</script>

<hgroup>
  <h1>Sign in</h1>
  <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h2>
</hgroup>

<form on:submit|preventDefault={handleSubmit}>
  <fieldset>
    <div>
      <label>
        Email:
        <input bind:value={email} type="email" />
      </label>
    </div>

    <div>
      <label>
        Password:
        <input bind:value={password} type="password" />
      </label>
    </div>

    <div>
      <button>Sign in</button>
    </div>
  </fieldset>
</form>
