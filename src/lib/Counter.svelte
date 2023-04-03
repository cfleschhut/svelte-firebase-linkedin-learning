<script lang="ts">
  let count: number = 0

  const increment = () => {
    count += 1
  }
</script>

<a href="#" on:click={increment} role="button">
  {count}
</a>
