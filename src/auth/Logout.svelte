<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
</script>

<p>
  <button on:click={() => dispatch('logout')}>Logout</button>
</p>
