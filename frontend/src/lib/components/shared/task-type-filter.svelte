<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { SlidersHorizontal } from 'lucide-svelte';

  import { buttonVariants } from '$lib/components/ui/button/index.js';

  let { statuses, status, updateTaskType } = $props();

  $effect(() => {
    updateTaskType(status);
  });
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class={buttonVariants({ variant: 'outline' })}>
    <SlidersHorizontal class="h-4 w-4" />
    View</DropdownMenu.Trigger
  >
  <DropdownMenu.Content align="end">
    <DropdownMenu.Group>
      <DropdownMenu.RadioGroup bind:value={status}>
        {#each statuses as s}
          <DropdownMenu.RadioItem value={s.value}
            >{s.name}</DropdownMenu.RadioItem
          >
        {/each}
      </DropdownMenu.RadioGroup>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
