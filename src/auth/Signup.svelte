<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  let email = ''
  let password = ''

  const dispatch = createEventDispatcher()

  const handleSubmit = (ev: SubmitEvent) => {
    ev.preventDefault()

    dispatch('signup', {
      email,
      password,
    })
  }
</script>

<form on:submit={handleSubmit}>
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
