<script lang="ts">
    import * as Dialog from '$lib/components/ui/dialog/index.js';

    export let open = false;
    export let onOpenChange;

</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="h-4/6 max-w-[1200px] overflow-auto">
    <div class="flex gap-10 max-w-[1100px]">
      <div class="flex w-4/6 flex-col gap-5">
        <slot name="editableSection"/>
      </div>
      <div class="flex h-fit flex-1 flex-col gap-3">
        <slot name="detailsSection"/>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>