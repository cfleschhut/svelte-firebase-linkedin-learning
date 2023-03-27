<script lang="ts">
  import { getAuth, signOut } from 'firebase/auth'
</script>

<p>
  <button on:click={() => signOut(getAuth())}>Logout</button>
</p>
