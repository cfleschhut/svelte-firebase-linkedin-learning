<script>
  export let errors
</script>

{#if errors.length}
  <ul>
    {#each errors as error}
      <li>{error}</li>
    {/each}
  </ul>
{/if}
