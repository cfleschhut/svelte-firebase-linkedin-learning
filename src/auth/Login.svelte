<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  let email = ''
  let password = ''

  const dispatch = createEventDispatcher()

  const handleSubmit = (ev: SubmitEvent) => {
    ev.preventDefault()

    dispatch('signin', {
      email,
      password,
    })
  }
</script>

<form on:submit={handleSubmit}>
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
