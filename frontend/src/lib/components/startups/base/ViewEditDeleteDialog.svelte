<script lang="ts">
    import * as Dialog from '$lib/components/ui/dialog/index.js';

    export let open = false;
    export let onOpenChange:any;

</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="h-4/6 max-w-[900px] overflow-auto">
    <div class="flex gap-10">
      <div class="flex w-4/6 flex-col gap-4 min-w-0">
          <slot name="editableSection" />
      </div>
      <div class="flex h-fit w-full flex-1 flex-col gap-3 min-w-0">
        <div class="break-words">
          <slot name="detailsSection" />
        </div>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>