<script lang="ts">
  import type { Role } from '$lib/types';

  let {
    children,
    role,
    userRole
  }: { children: any; role: Role[]; userRole: Role } = $props();
</script>

{#if role.includes(userRole)}
  {@render children()}
{/if}
