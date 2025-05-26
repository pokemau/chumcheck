<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import { ReadinessType } from '$lib/utils.js';

  // If ReadinessType is an enum or object, convert it to an array for iteration
  const readinessTypes = Object.values(ReadinessType);

  let {
    open,
    onOpenChange,
    rna,
    readinessData,
    closeDialog,
    addToRna,
  } = $props();

  let data = $state({
    readinessLevelId: String(rna.readinessLevel.id),
    startupId: rna.startup,
    rna: { ...rna },
    is_ai_generated: false
  });
  let editDescription = $state(false);
  let readinessType = $state(rna.readinessLevel.readinessType || "");

  $effect(() => {
    if (!open) {
      data = {
        readinessLevelId: String(rna.readinessLevel.id),
        startupId: rna.startup,
        rna: { ...rna },
        is_ai_generated: false
      };
    }
  });

  // For AI dialog
  let rnaDialog = $state(false);
  let deleteDialogOpen = $state(false);
  const deleteDialogOnOpenChange = () => {
    deleteDialogOpen = !deleteDialogOpen;
  };

  // console.log("readinessData:", readinessData);
  // console.log("ReadinessID: ", data.readinessLevelId);
  // console.log("Trying to print:", readinessData.find(
  //                       (d: any) => String(d.readinessLevel.id) === data.readinessLevelId
  //                       )?.readinessLevel.readinessType);

</script>

<Dialog.Root bind:open={open} {onOpenChange}>
  <Dialog.Content class="h-[90vh] max-w-[1200px] overflow-scroll">
    <div class="flex gap-0 h-[80vh]">
      <!-- AI Chat Section (left) -->
      <div class="flex flex-col w-1/2 border-r border-border p-6">
        <h1 class="text-2xl font-semibold mb-4">Suggested RNA</h1>
        <div class="flex-1 overflow-y-auto">
          <!-- Example AI message -->
          <div class="flex mb-4">
            <div class="bg-[#1e293b] text-white p-4 rounded-lg max-w-[80%]">
              I can help you refine this Technology Readiness and Needs Assessment. How would you like to modify the description or other fields?
            </div>
          </div>
        </div>
        <div class="mt-auto flex gap-2">
          <input
            class="flex-1 rounded bg-background border border-border px-3 py-2 text-white"
            placeholder="Ask how you would like the Recommended Next Step..."
            disabled
          />
          <Button disabled>Send</Button>
        </div>
      </div>
      <!-- RNA Details -->
      <div class="flex flex-col w-1/2 p-6">
        <h2 class="text-2xl font-semibold mb-4">RNA Details</h2>
        <div class="mb-4">
          <Label>Readiness Type</Label>
            <Select.Root type="single" bind:value={data.readinessLevelId}>
                <Select.Trigger class="w-[180px]">
                  {data.readinessLevelId
                    ? (readinessData.find(
                        (d: any) => String(d.readinessLevel.id) === data.readinessLevelId
                        )?.readinessLevel.readinessType || data.rna.readinessLevel.readinessType)
                    : ''}
                </Select.Trigger>
                <Select.Content>
                    {#each readinessData as d}
                      <Select.Item value={String(d.readinessLevel.id)}>{d.readinessLevel.readinessType}</Select.Item>
                    {/each}
                </Select.Content>
            </Select.Root>
        </div>
        <div class="mb-4">
          <Label>Description</Label>
          <textarea
            class="w-full h-40 rounded bg-background border border-border text-white p-3"
            bind:value={data.rna.rna}
          ></textarea>
        </div>
        <div class="flex justify-end gap-2 mt-auto">
          <Button variant="outline" onclick={() => closeDialog()}>Cancel</Button>
          <Button
            onclick={() => {}}
          >Add to RNA</Button>
          <!-- To implement add to RNA  -->
        </div>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>