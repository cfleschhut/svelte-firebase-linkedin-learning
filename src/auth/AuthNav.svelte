<script lang="ts">
  import { session } from '../stores'
  import Logout from './Logout.svelte'
</script>

<nav>
  <ul>
    <li>
      <strong>Svelte-TodoList</strong>
    </li>
  </ul>
  <ul>
    {#if $session && !$session.user}
      <li>
        <a href="#/login">Login</a>
      </li>
      <li>
        <a href="#/signup">Signup</a>
      </li>
    {:else}
      <li>
        <Logout />
      </li>
    {/if}
  </ul>
</nav>

<slot />
