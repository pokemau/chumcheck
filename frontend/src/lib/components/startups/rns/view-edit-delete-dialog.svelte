<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Textarea } from '$lib/components/ui/textareav2';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { getReadinessLevels, getReadinessTypes } from '$lib/utils';
  import * as Select from '$lib/components/ui/select/index.js';
  import { DeleteDialog } from '$lib/components/shared';
  import Header from '$lib/components/shared/header.svelte';
  import { Separator } from '$lib/components/ui/separator';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Check, Plus, Trash } from 'lucide-svelte';

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
    ai = false,
    addToRns,
    index,
    role
  } = $props();

  let rnsCopy = $state({ ...rns });

  const levels = $derived(getReadinessLevels(rns.readinessType));

  $effect(() => {
    if (!open) {
      rnsCopy = { ...rns };
    }
  });

  let editDescription = $state(false);

  let descriptionDiv: HTMLDivElement;

  $effect(() => {
    if (editDescription && descriptionDiv) {
      descriptionDiv.focus();
    }
  });

  $effect(() => {
    if (!open) {
      editDescription = false;
      action = 'View';
    }
  });

  let deleteDialogOpen = $state(false);
  const deleteDialogOnOpenChange = () => {
    deleteDialogOpen = !deleteDialogOnOpenChange;
  };

  const getLevel = (id: any) => {
    if (!id || id === 0 || !levels || levels.length === 0) return '';

    const matchingLevels = levels.filter(
      (level: any) => Number(level.id) === Number(id)
    );

    return matchingLevels.length > 0 ? matchingLevels[0].level : '';
  };

  const getLevelId = (targetLevel: any, levels: any) => {
    if (targetLevel === 0) return '';

    const matchingLevels = levels.filter(
      (level: any) => Number(level.level) === Number(targetLevel)
    );

    return matchingLevels.length > 0 ? matchingLevels[0].id : '';
  };

  console.log(rnsCopy);
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="h-4/6 max-w-[1200px] overflow-scroll">
    <div class="flex gap-10">
      <div class="flex w-4/6 flex-col gap-5">
        <h1 class="text-2xl font-semibold">
          Priority #{rnsCopy.priorityNumber}
        </h1>
        <div class="flex flex-col gap-3">
          <Label for="username">Description</Label>
          {#if editDescription && role !== 'Startup'}
            <Textarea
              rows={12}
              bind:value={rnsCopy.description}
              class="text-justify text-base"
            />
            <div class="ml-auto flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onclick={() => (editDescription = false)}>Cancel</Button
              ><Button
                size="sm"
                onclick={async () => {
                  await update(rnsCopy.id, {
                    description: rnsCopy.description
                  });
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
      </div>
      <div class="flex h-fit flex-1 flex-col gap-3">
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
              onclick={async () => {
                await addToRns(rnsCopy.id);
                closeDialog();
              }}><Check class="h-4 w-4" /> Add to RNS</Button
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
                  <p class="w-[130px]">Readiness Type</p>
                  {#if role !== 'Startup'}
                    <Select.Root
                      type="single"
                      bind:value={rnsCopy.readinessType}
                      onValueChange={(newType) => {
                        if (!newType) {
                          newType = 'Technology';
                        }

                        const newLevels = getReadinessLevels(newType);

                        const newTargetLevel = getLevelId(
                          rnsCopy.targetLevelScore,
                          newLevels
                        );

                        rnsCopy.readinessType = newType;
                        rnsCopy.targetLevelId = newTargetLevel;

                        update(rnsCopy.id, {
                          readinessType: newType,
                          targetLevel: newTargetLevel
                        });
                      }}
                    >
                      <Select.Trigger class="w-[200px] border-none"
                        >{rnsCopy.readinessType}</Select.Trigger
                      >
                      <Select.Content class="border-none">
                        {#each getReadinessTypes() as type}
                          <Select.Item value={`${type.name}`}
                            >{type.name}</Select.Item
                          >
                        {/each}
                      </Select.Content>
                    </Select.Root>
                  {:else}
                    <p class="w-[200px] p-3">
                      {rnsCopy.readinessType}
                    </p>
                  {/if}
                </div>

                <div class="flex h-9 items-center justify-between text-sm">
                  <p class="w-[130px]">Target Level</p>
                  {#if role !== 'Startup'}
                    <Select.Root
                      type="single"
                      bind:value={rnsCopy.targetLevelId}
                      onValueChange={(newLevel) => {
                        update(rnsCopy.id, {
                          targetLevel: rnsCopy.targetLevelId
                        });
                      }}
                    >
                      <Select.Trigger class="w-[200px] border-none"
                        >{getLevel(rnsCopy.targetLevelId)}</Select.Trigger
                      >
                      <Select.Content class="border-none">
                        {#each levels as item}
                          <Select.Item value={`${item.id}`}
                            >{item.level}</Select.Item
                          >
                        {/each}
                      </Select.Content>
                    </Select.Root>
                  {:else}
                    <p class="w-[200px] p-3">
                      {getLevel(rnsCopy.targetLevelId)}
                    </p>
                  {/if}
                </div>
                <!-- <div class="flex h-9 items-center justify-between text-sm"> -->
                <!--   <p class="w-[130px]">Term</p> -->
                <!--   {#if role !== 'Startup'} -->
                <!--     <Select.Root -->
                <!--       type="single" -->
                <!--       bind:value={rnsCopy.task_type} -->
                <!--       onValueChange={() => { -->
                <!--         update(rnsCopy.id, { task_type: rnsCopy.task_type }); -->
                <!--       }} -->
                <!--     > -->
                <!--       <Select.Trigger class="w-[200px] border-none" -->
                <!--         >{rnsCopy.task_type === 1 -->
                <!--           ? 'Short Term' -->
                <!--           : 'Long Term'}</Select.Trigger -->
                <!--       > -->
                <!--       <Select.Content class="border-none"> -->
                <!--         <Select.Item value="1">Short Term</Select.Item> -->
                <!--         <Select.Item value="2">Long Term</Select.Item> -->
                <!--       </Select.Content> -->
                <!--     </Select.Root> -->
                <!--   {:else} -->
                <!--     <p class="w-[200px] p-3"> -->
                <!--       {rnsCopy.task_type === '1' ? 'Short Term' : 'Long Term'} -->
                <!--     </p> -->
                <!--   {/if} -->
                <!-- </div> -->
                <div class="flex h-9 items-center justify-between text-sm">
                  <p class="w-[130px]">Assignee</p>
                  {#if role !== 'Startup'}
                    <Select.Root
                      type="single"
                      bind:value={rnsCopy.assignee.id}
                      onValueChange={(newVal) => {
                        update(rnsCopy.id, {
                          assigneeId: newVal
                        });
                      }}
                    >
                      <Select.Trigger class="w-[200px] border-none"
                        >{rnsCopy.assignee.id
                          ? `${members.filter((member: any) => member.userId === rnsCopy.assignee.id)[0].firstName} ${members.filter((member: any) => member.userId === rnsCopy.assignee.id)[0].lastName}`
                          : 'None'}</Select.Trigger
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
                      {rnsCopy.assignee.id
                        ? `${members.filter((member: any) => member.userId === rnsCopy.assignee.id)[0].firstName} ${members.filter((member: any) => member.userId === rnsCopy.assignee.id)[0].lastName}`
                        : 'None'}
                    </p>
                  {/if}
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
        This action cannot be undone. This will permanently delete this Rns.
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

<!-- <DeleteDialog
	open={deleteDialogOpen}
	onOpenChange={deleteDialogOnOpenChange}
	{rns}
	deleteAction={deleteRns}
	name="Rns"
	{closeDialog}
	{index}
/> -->
