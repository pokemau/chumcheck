<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Textarea } from '$lib/components/ui/textareav2';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import { DeleteDialog } from '$lib/components/shared';
  import { Check, Trash } from 'lucide-svelte';
  import { Separator } from '$lib/components/ui/separator';
  import * as Card from '$lib/components/ui/card/index.js';
  import EditableSection from './base/EditableSection.svelte';

  let {
    open,
    onOpenChange,
    rns,
    deleteRns,
    update,
    action,
    members,
    assignedMember,
    closeDialog,
    tasks,
    ai = false,
    addToInitiative,
    index,
    role,

    title,
    fields
  } = $props();

  //   let rnsCopy = $state({ ...rns });

  //   $effect(() => {
  //     if (!open) {
  //       rnsCopy = { ...rns };
  //     }
  //   });

  //   let editDescription = $state(false);
  //   let editMeasures = $state(false);
  //   let editTarget = $state(false);
  //   let editRemarks = $state(false);

  let deleteDialogOpen = $state(false);
  const deleteDialogOnOpenChange = () => {
    deleteDialogOpen = !deleteDialogOnOpenChange;
  };
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="h-4/6 max-w-[1200px] overflow-auto">
    <div class="flex max-w-[1100px] gap-10">
      <div class="flex w-4/6 flex-col gap-5">
        <h1 class="text-2xl font-semibold">{title}</h1>
        <!-- Labels -->
        <div class="flex h-[550px] flex-col gap-5 overflow-y-scroll">
          {#each fields as field}
            <EditableSection
              label={field.label}
              value={rnsCopy[field.prop]}
              propName={field.prop}
              id={rnsCopy.id}
              {role}
              onSave={update}
            />
          {/each}
        </div>
      </div>
      <div class="flex h-fit flex-1 flex-col gap-3">
        <!-- Buttons -->
        <div class="flex gap-3">
          {#if role !== 'Startup'}
            <Button
              size="sm"
              variant="destructive"
              onclick={() => (deleteDialogOpen = true)}
              ><Trash class="h-4 w-4" /> Delete</Button
            >
          {/if}
          {#if ai}
            <Button
              size="sm"
              onclick={() => {
                addToInitiative(rnsCopy.id);
                closeDialog();
              }}><Check class="h-4 w-4" /> Add to Initiatives</Button
            >
          {/if}
        </div>
        <Card.Root class="rounded-md">
          <Card.Content class="p-0">
            <div class="flex flex-col">
              <!-- Details Table -->
              <div class="p-2">Details</div>
              <Separator />
              <div class="flex flex-col gap-2 p-2">
                <div class="flex h-9 items-center justify-between text-sm">
                  <p class="w-[130px]">Assignee</p>
                  {#if role !== 'Startup'}
                    <Select.Root
                      type="single"
                      bind:value={rnsCopy.assignee}
                      onValueChange={() => {
                        update(rnsCopy.id, { assigneeId: rnsCopy.assignee });
                      }}
                    >
                      <Select.Trigger class="w-[200px] border-none"
                        >{#if rnsCopy.assignee}
                          {#if typeof rnsCopy.assignee === 'object'}
                            {rnsCopy.assignee.firstName}
                            {rnsCopy.assignee.lastName}
                          {:else if members.filter((member: any) => member.userId === rnsCopy.assignee)[0]}
                            {members.filter(
                              (member: any) =>
                                member.userId === rnsCopy.assignee
                            )[0].firstName}
                            {members.filter(
                              (member: any) =>
                                member.userId === rnsCopy.assignee
                            )[0].lastName}
                          {:else}
                            None
                          {/if}
                        {:else}
                          None
                        {/if}</Select.Trigger
                      >
                      <Select.Content class="border-none">
                        {#each members as member}
                          <Select.Item value={member.userId}
                            >{member.firstName} {member.lastName}</Select.Item
                          >
                        {/each}
                      </Select.Content>
                    </Select.Root>
                  {:else}
                    <p class="w-[200px] p-3">
                      {#if rnsCopy.assignee}
                        {#if typeof rnsCopy.assignee === 'object'}
                          {rnsCopy.assignee.firstName}
                          {rnsCopy.assignee.lastName}
                        {:else if members.filter((member: any) => member.userId === rnsCopy.assignee)[0]}
                          {members.filter(
                            (member: any) => member.userId === rnsCopy.assignee
                          )[0].firstName}
                          {members.filter(
                            (member: any) => member.userId === rnsCopy.assignee
                          )[0].lastName}
                        {:else}
                          None
                        {/if}
                      {:else}
                        None
                      {/if}
                    </p>
                  {/if}
                </div>
                <div class="flex h-9 items-center justify-between text-sm">
                  <p class="w-[130px]">RNS Priority No.</p>
                  <p class="w-[200px] p-3">
                    {#if rnsCopy.rns}
                      {#if typeof rnsCopy.rns === 'object'}
                        {rnsCopy.rns.priorityNumber ?? '—'}
                      {:else if tasks.filter((task: any) => task.id === rnsCopy.rns)[0]}
                        {tasks.filter((task: any) => task.id === rnsCopy.rns)[0]
                          .priorityNumber}
                      {:else}
                        —
                      {/if}
                    {:else}
                      —
                    {/if}
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

<AlertDialog.Root
  bind:open={deleteDialogOpen}
  onOpenChange={deleteDialogOnOpenChange}
>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete this
        Initiative.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action
        class="bg-red-500 hover:bg-red-600"
        onclick={async () => {
          await deleteRns(rns.id, index);
          deleteDialogOpen = false;
          closeDialog();
        }}>Continue</AlertDialog.Action
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
