<script lang="ts">
  import { onMount } from 'svelte';
  import type { User } from '@safar/shared';

  let users: User[] = $state([]);

  onMount(async () => {
    const res = await fetch('http://localhost:3000/users');
    users = await res.json();
  });
</script>

<h1>Users</h1>

<ul>
  {#each users as user}
    <li>{user.name}</li>
  {/each}
</ul>
