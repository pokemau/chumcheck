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
    role
  } = $props();

  let rnsCopy = $state({ ...rns });

  $effect(() => {
    if (!open) {
      rnsCopy = { ...rns };
    }
  });

  let editDescription = $state(false);
  let editMeasures = $state(false);
  let editTarget = $state(false);
  let editRemarks = $state(false);

  let deleteDialogOpen = $state(false);
  const deleteDialogOnOpenChange = () => {
    deleteDialogOpen = !deleteDialogOnOpenChange;
  };
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="h-4/6 max-w-[1200px] overflow-scroll">
    <div class="flex gap-10">
      <div class="flex w-4/6 flex-col gap-5">
        <h1 class="text-2xl font-semibold">Initiative #{rnsCopy.initiative_number}</h1>
        <div class="flex h-[550px] flex-col gap-5 overflow-scroll">
          <div class="flex flex-col gap-3">
            <Label for="username">Task</Label>
            <div class="text-justify">
              {rnsCopy.task_id
                ? tasks.filter((task: any) => task.id === rnsCopy.task_id)[0].description
                : ''}
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <Label for="username">Description</Label>
            {#if editDescription && role !== 'Startup'}
              <Textarea rows={12} bind:value={rnsCopy.description} class="text-justify text-base" />
              <div class="ml-auto flex gap-2">
                <Button size="sm" variant="outline" onclick={() => (editDescription = false)}
                  >Cancel</Button
                ><Button
                  size="sm"
                  onclick={async () => {
                    await update(rnsCopy.id, { description: rnsCopy.description });
                    editDescription = false;
                  }}>Save</Button
                >
              </div>
            {:else}
              <button onclick={() => (editDescription = true)}>
                <div class="text-justify">
                  {rnsCopy.description}
                </div>
              </button>
            {/if}
          </div>
          <div class="flex flex-col gap-3">
            <Label for="username">Measures</Label>
            {#if editMeasures && role !== 'Startup'}
              <Textarea rows={12} bind:value={rnsCopy.measures} class="text-justify text-base" />
              <div class="ml-auto flex gap-2">
                <Button size="sm" variant="outline" onclick={() => (editMeasures = false)}
                  >Cancel</Button
                ><Button
                  size="sm"
                  onclick={async () => {
                    await update(rnsCopy.id, { measures: rnsCopy.measures });
                    editMeasures = false;
                  }}>Save</Button
                >
              </div>
            {:else}
              <button onclick={() => (editMeasures = true)}>
                <div class="text-justify">
                  {rnsCopy.measures}
                </div>
              </button>
            {/if}
          </div>
          <div class="flex flex-col gap-3">
            <Label for="username">Target</Label>
            {#if editTarget && role !== 'Startup'}
              <Textarea rows={12} bind:value={rnsCopy.targets} class="text-justify text-base" />
              <div class="ml-auto flex gap-2">
                <Button size="sm" variant="outline" onclick={() => (editTarget = false)}
                  >Cancel</Button
                ><Button
                  size="sm"
                  onclick={async () => {
                    await update(rnsCopy.id, { targets: rnsCopy.targets });
                    editTarget = false;
                  }}>Save</Button
                >
              </div>
            {:else}
              <button onclick={() => (editTarget = true)}>
                <div class="text-justify">
                  {rnsCopy.targets}
                </div>
              </button>
            {/if}
          </div>
          <div class="flex flex-col gap-3">
            <Label for="username">Remarks</Label>
            {#if editRemarks && role !== 'Startup'}
              <Textarea rows={12} bind:value={rnsCopy.remarks} class="text-justify text-base" />
              <div class="ml-auto flex gap-2">
                <Button size="sm" variant="outline" onclick={() => (editRemarks = false)}
                  >Cancel</Button
                ><Button
                  size="sm"
                  onclick={async () => {
                    await update(rnsCopy.id, { remarks: rnsCopy.remarks });
                    editRemarks = false;
                  }}>Save</Button
                >
              </div>
            {:else}
              <button onclick={() => (editRemarks = true)}>
                <div class="text-justify">
                  {rnsCopy.remarks}
                </div>
              </button>
            {/if}
          </div>
        </div>
      </div>
      <div class="flex h-fit flex-1 flex-col gap-3">
        <div class="flex gap-3">
          {#if role !== 'Startup'}
            <Button size="sm" variant="destructive" onclick={() => (deleteDialogOpen = true)}
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
              <div class="p-2">Details</div>
              <Separator />
              <div class="flex flex-col gap-2 p-2">
                <div class="flex h-9 items-center justify-between text-sm">
                  <p class="w-[130px]">Assignee</p>
                  {#if role !== 'Startup'}
                    <Select.Root
                      type="single"
                      bind:value={rnsCopy.assignee_id}
                      onValueChange={() => {
                        update(rnsCopy.id, { assignee_id: rnsCopy.assignee_id });
                      }}
                    >
                      <Select.Trigger class="w-[200px] border-none"
                        >{rnsCopy.assignee_id
                          ? `${members.filter((member: any) => member.user_id === rnsCopy.assignee_id)[0].first_name} ${members.filter((member: any) => member.user_id === rnsCopy.assignee_id)[0].last_name}`
                          : 'None'}</Select.Trigger
                      >
                      <Select.Content class="border-none">
                        {#each members as member}
                          <Select.Item value={member.user_id}
                            >{member.first_name} {member.last_name}</Select.Item
                          >
                        {/each}
                      </Select.Content>
                    </Select.Root>
                  {:else}
                    <p class="w-[200px] p-3">
                      {rnsCopy.assignee_id
                        ? `${
                            members.filter(
                              (member: any) => member.user_id === rnsCopy.assignee_id
                            )[0].first_name
                          } ${
                            members.filter(
                              (member: any) => member.user_id === rnsCopy.assignee_id
                            )[0].last_name
                          }`
                        : 'None'}
                    </p>
                  {/if}
                </div>
                <div class="flex h-9 items-center justify-between text-sm">
                  <p class="w-[130px]">RNS Priority No.</p>
                  <p class="w-[200px] p-3">
                    {tasks.filter((task: any) => task.id === rnsCopy.task_id)[0].priority_number}
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

<AlertDialog.Root bind:open={deleteDialogOpen} onOpenChange={deleteDialogOnOpenChange}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete this Initiative.
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
