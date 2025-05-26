<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Textarea } from '$lib/components/ui/textareav2';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Badge } from '$lib/components/ui/badge';
  import { getProfileColor, getReadinessTypes, zIndex } from '$lib/utils';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import { DeleteDialog } from '$lib/components/shared';
  import { Separator } from '$lib/components/ui/separator';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Trash } from 'lucide-svelte';
  import Check from 'svelte-radix/Check.svelte';
  let {
    open,
    onOpenChange,
    rna,
    deleteRna,
    update,
    readinessData,
    closeDialog,
    addToRna,
    role
  } = $props();

  let rnaCopy = $state({ ...rna });

  $effect(() => {
    if (!open) {
      rnaCopy = { ...rna };
    }
  });

  let editDescription = $state(false);

  let deleteDialogOpen = $state(false);
  const deleteDialogOnOpenChange = () => {
    deleteDialogOpen = !deleteDialogOnOpenChange;
  };

  let rnaDialog = $state(false);

  $effect(() => {
    // console.log($state.snapshot(readinessData));
    // console.log($state.snapshot(rnaCopy));
  });
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="h-4/6 max-w-[1200px] overflow-auto">
    <div class="flex gap-10 max-w-[1100px]">
      <div class="flex w-4/6 flex-col gap-5">
        <h1 class="text-2xl font-semibold">{rnaCopy.readiness_type_rl_type}</h1>
        <div class="flex flex-col gap-3">
          <Label for="username" class="text-lg">Description</Label>
          {#if editDescription}
            <Textarea rows={12} bind:value={rnaCopy.rna} class="text-justify text-base"/>
            <div class="ml-auto flex gap-2">
              <Button size="sm" variant="outline" onclick={() => (editDescription = false)}
                >Cancel</Button
              ><Button
                size="sm"
                onclick={async () => {
                  await update(rnaCopy.id, rnaCopy.rna);
                  editDescription = false;
                }}>Save</Button
              >
            </div>
          {:else}
            <button
              onclick={() => {
                if (role !== 'Startup') {
                  editDescription = true;
                }
              }}
            >
              <div class="text-justify break-words">
                {rnaCopy.rna}
              </div>
            </button>
          {/if}
        </div>
      </div>
      <div class="flex h-fit flex-1 flex-col gap-3">
        <div class="flex gap-3">
          {#if role !== 'Startup'}
            <Button size="sm" variant="destructive" onclick={() => (deleteDialogOpen = true)}
              ><Trash class="h-4 w-4" /> Delete</Button
            >
          {/if}
        </div>
        <Card.Root class="rounded-md">
          <Card.Content class="p-0">
            <div class="flex flex-col">
              <div class="p-2 text-sm">Details</div>
              <Separator />
              <div class="flex flex-col gap-2 p-2">
                <!-- <div class="flex h-9 items-center justify-between text-sm">
									<p class="w-[130px]">Readiness Type</p>
									{#if role !== 'Startup'}
										<Select.Root type="single" bind:value={rnaCopy.readiness_type_id}>
											<Select.Trigger class="w-[200px] border-none"
												>{rnaCopy.readiness_type_id
													? getReadinessTypes().filter(
															(d) => d.id === Number(rnaCopy.readiness_type_id)
														)[0].name
													: ''}</Select.Trigger
											>
											<Select.Content class="border-none">
												{#each getReadinessTypes() as type}
													<Select.Item value={`${type.id}`}>{type.name}</Select.Item>
												{/each}
											</Select.Content>
										</Select.Root>
									{:else}
										<p class="w-[200px] p-3">{rnaCopy.readiness_type_rl_type}</p>
									{/if}
								</div> -->
                <div class="flex h-9 items-center justify-between text-sm">
                  <p class="w-[130px]">Current Level</p>
                  <p class="w-[200px] p-3">
                    {readinessData?.filter(
                      (d: any) => d?.readinessLevel.readinessType === rnaCopy?.readinessLevel.readinessType
                    )[0]?.readinessLevel.level}
                  </p>
                </div>
                <div class="flex h-9 items-center justify-between text-sm">
                  <p class="w-[130px]">Readiness Type</p>
                  <p class="w-[200px] p-3">
                    {readinessData?.filter(
                      (d: any) => d?.readinessLevel.readinessType === rnaCopy?.readinessLevel.readinessType
                    )[0]?.readinessLevel.readinessType}
                  </p>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>
<AlertDialog.Root bind:open={rnaDialog} onOpenChange={() => (rnaDialog = !rnaDialog)}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title
        >An RNA data entry with the same readiness type already exists. Do you want to replace it?</AlertDialog.Title
      >
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete the current RNA data.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel onclick={() => (rnaDialog = false)}>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action
        class="bg-red-500 hover:bg-red-600"
        onclick={async () => {
          await addToRna(rnaCopy.id);
          rnaDialog = false;
          closeDialog();
        }}>Continue</AlertDialog.Action
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

<AlertDialog.Root bind:open={deleteDialogOpen} onOpenChange={deleteDialogOnOpenChange}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete this RNA.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action
        class="bg-red-500 hover:bg-red-600"
        onclick={async () => {
          await deleteRna(rna.id, 1);
          deleteDialogOpen = false;
          closeDialog();
        }}>Continue</AlertDialog.Action
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
