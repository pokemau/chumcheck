<!-- <script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
	import type { Actions } from "$lib/types";
	import { RnaCreateDialog, RnaViewEditDialog } from ".";
  let { action, open, onOpenChange } : { action : Actions, open: boolean, onOpenChange: any } = $props()
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Dialog.Description>
    </Dialog.Header>
    {#if action === 'Create'}
      <RnaCreateDialog />
    {:else if  action === 'View' || action === 'Edit'}
      <RnaViewEditDialog /> 
    {:else}
       else content here
    {/if}
  </Dialog.Content>
</Dialog.Root> -->
