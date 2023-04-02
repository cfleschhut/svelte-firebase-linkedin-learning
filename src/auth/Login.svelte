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

<h2>Login</h2>

<form on:submit|preventDefault={handleSubmit}>
  <fieldset>
    <legend>Login</legend>
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
      <button>Login</button>
    </div>
  </fieldset>
</form>
