<script lang="ts">
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

  let email = ''
  let password = ''

  const auth = getAuth()

  const handleSubmit = (ev: SubmitEvent) => {
    ev.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user

        console.log(user)
      })
      .catch((error) => {
        console.log(error.message)
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
