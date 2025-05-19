<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import type { Actions } from '$lib/types';
  import { RnsCreateDialog, RnsViewEditDeleteDialog } from '.';
  const { action }: { action: Actions } = $props();
</script>

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Dialog.Description>
    </Dialog.Header>
    {#if action === 'Create'}
      <RnsCreateDialog />
    {:else if action === 'View' || action === 'Edit'}
      <!-- <RnsViewEditDeleteDialog />  -->
    {:else}
      <!-- else content here -->
    {/if}
  </Dialog.Content>
</Dialog.Root>
