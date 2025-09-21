<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Textarea } from '$lib/components/ui/textareav2';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import {
    getReadinessLevels,
    getReadinessTypes,
    ReadinessType
  } from '$lib/utils';
  import * as Select from '$lib/components/ui/select/index.js';
  import { DeleteDialog } from '$lib/components/shared';
  import Header from '$lib/components/shared/header.svelte';
  import { Separator } from '$lib/components/ui/separator';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Check, Plus, Trash } from 'lucide-svelte';
  import EditableSection from '../base/EditableSection.svelte';
  import DetailsSection from '../base/DetailsSection.svelte';
  import DetailsSectionContainer from '../base/DetailsSectionContainer.svelte';
  import ViewEditDeleteDialog from '../base/ViewEditDeleteDialog.svelte';
  import SectionTitle from '../base/SectionTitle.svelte';

  let {
    open,
    onOpenChange,
    rns,
    deleteRns,
    update,
    action,
    members,
    closeDialog,
    index,
    role
  } = $props();

  let rnsCopy = $state({ ...rns });

  const levels = $derived(getReadinessLevels(rnsCopy.readinessType));

  $effect(() => {
    if (!open) {
      rnsCopy = { ...rns };
    }
  });

  let editDescription = $state(false);

  let descriptionDiv: any = null;

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

  function handleDialogStateChange(newOpen: boolean) {
    onOpenChange(newOpen);
    if (!newOpen) {
      closeDialog();
    }
  }
</script>

<ViewEditDeleteDialog {open} onOpenChange={handleDialogStateChange}>
  <svelte:fragment slot="editableSection">
    <SectionTitle>Priority #{rnsCopy.priorityNumber}</SectionTitle>
    <EditableSection
      label="Description"
      editMode={editDescription}
      {role}
      data={rnsCopy.description}
      dataId={rnsCopy.id}
      dataColumn="description"
      {update}
    />
  </svelte:fragment>

  <svelte:fragment slot="detailsSection">
    <div class="flex gap-3">
      {#if role !== 'Startup'}
        <Button
          size="sm"
          variant="destructive"
          onclick={() => (deleteDialogOpen = true)}
          ><Trash class="h-4 w-4" /> Delete</Button
        >
      {/if}
    </div>
    <DetailsSectionContainer>
      <DetailsSection
        label="Readiness Type"
        value={rnsCopy.readinessType}
        editable={true}
        editableCondition={role !== 'Startup'}
        options={getReadinessTypes()}
        valueKey="name"
        displayKey="name"
        onChange={(newType) => {
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
      />
      <DetailsSection
        label="Target Level"
        value={rnsCopy.targetLevelId}
        editable={true}
        editableCondition={role !== 'Startup'}
        options={levels}
        valueKey="id"
        displayKey="level"
        onChange={(newLevel) => {
          update(rnsCopy.id, {
            targetLevel: newLevel
          });
        }}
      />
      <DetailsSection
        label="Assignee"
        value={rnsCopy.assignee?.id}
        editable={true}
        editableCondition={role !== 'Startup'}
        options={members}
        valueKey="userId"
        displayFn={(member) => `${member.firstName} ${member.lastName}`}
        onChange={(newVal) => {
          update(rnsCopy.id, {
            assigneeId: newVal
          });
        }}
      />
    </DetailsSectionContainer>
  </svelte:fragment>
</ViewEditDeleteDialog>

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
