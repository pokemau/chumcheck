<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';

  export let showDialog: boolean = false;
  export let toggleDialog: () => void;
  export let onConfirm: () => Promise<void>;
</script>

<Dialog.Root open={showDialog} onOpenChange={toggleDialog}>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>Confirm Completion</Dialog.Title>
    </Dialog.Header>

    <div class="text-muted-foreground mb-6">
      Are you sure you want to mark this startup as complete? This action cannot be undone.
    </div>

    <Dialog.Footer>
      <Button
        variant="outline"
        onclick={toggleDialog}
        class="transition-transform hover:scale-105 duration-200"
      >
        Cancel
      </Button>
      <Button
        onclick={onConfirm}
        class="transition-transform hover:scale-105 duration-200"
      >
        Confirm
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>