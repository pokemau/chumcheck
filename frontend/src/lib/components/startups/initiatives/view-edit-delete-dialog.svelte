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
  import EditableSection from '../base/EditableSection.svelte';
  import EditableSectionContainer from '../base/EditableSectionContainer.svelte';
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
    assignedMember,
    closeDialog,
    tasks,
    ai = false,
    addToInitiative,
    index,
    role
  } = $props();

  let rnsCopy = $state({ ...rns });
  let tasksCopy = $state({ ...tasks });

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

  function handleDialogStateChange(newOpen: boolean) {
    onOpenChange(newOpen);
    if (!newOpen) {
      closeDialog();
    }
  }
</script>

<ViewEditDeleteDialog {open} onOpenChange={handleDialogStateChange}>
  <svelte:fragment slot="editableSection">
    <SectionTitle>Initiative #{rnsCopy.initiativeNumber}</SectionTitle>
    <EditableSection
      label="Tasks"
      editMode={editDescription}
      {role}
      data={rnsCopy.description}
      dataId={rnsCopy.id}
      {update}
      isTask={true}
      taskDescription={tasks.filter((task: any) => task.id === rnsCopy.rns)[0]
        .description}
    />
    <EditableSection
      label="Description"
      editMode={editDescription}
      {role}
      data={rnsCopy.description}
      dataId={rnsCopy.id}
      dataColumn="description"
      {update}
    />
    <EditableSection
      label="Measures"
      editMode={editMeasures}
      {role}
      data={rnsCopy.measures}
      dataId={rnsCopy.id}
      dataColumn="measures"
      {update}
    />
    <EditableSection
      label="Target"
      editMode={editTarget}
      {role}
      data={rnsCopy.targets}
      dataId={rnsCopy.id}
      dataColumn="targets"
      {update}
    />
    <EditableSection
      label="Remarks"
      editMode={editRemarks}
      {role}
      data={rnsCopy.remarks}
      dataId={rnsCopy.id}
      dataColumn="remarks"
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
    <DetailsSectionContainer>
      <DetailsSection
        label="Assignee"
        value={rnsCopy.assignee}
        editable={true}
        editableCondition={role !== 'Startup'}
        options={members}
        valueKey="userId"
        displayFn={(member) => `${member.firstName} ${member.lastName}`}
        onChange={(val) => update(rnsCopy.id, { assigneeId: val })}
      />
      <DetailsSection
        label="RNS Priority No."
        value={typeof rnsCopy.rns === 'object'
          ? rnsCopy.rns.priorityNumber
          : (tasks.find((t: any) => t.id === rnsCopy.rns)?.priorityNumber ??
            '—')}
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
