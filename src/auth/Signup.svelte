<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  let email = ''
  let password = ''

  const dispatch = createEventDispatcher()

  const handleSubmit = () => {
    dispatch('signup', {
      email,
      password,
    })
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <fieldset>
    <legend>Signup</legend>
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
      <button>Signup</button>
    </div>
  </fieldset>
</form>
