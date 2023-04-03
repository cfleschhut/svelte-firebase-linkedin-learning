<script lang="ts">
  import { getAuth, signOut } from 'firebase/auth'
</script>

<button on:click={() => signOut(getAuth())} class="outline">Logout</button>
