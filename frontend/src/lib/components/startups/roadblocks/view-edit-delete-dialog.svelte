<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Textarea } from '$lib/components/ui/textareav2';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Badge } from '$lib/components/ui/badge';
  import { getProfileColor, zIndex } from '$lib/utils';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import { DeleteDialog } from '$lib/components/shared';
  import { Separator } from '$lib/components/ui/separator';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Check, Trash } from 'lucide-svelte';
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
    assignedMember,
    closeDialog,
    ai,
    addToRoadblocks,
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
  let editFix = $state(false);

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
    <SectionTitle>Risk #{rnsCopy.riskNumber}</SectionTitle>
    <EditableSection
      label="Description"
      editMode={editDescription}
      role={role}
      data={rnsCopy.description}
      dataId={rnsCopy.id}
      dataColumn="description"
      update={update}
    />
    <EditableSection
      label="Fix"
      editMode={editFix}
      role={role}
      data={rnsCopy.fix}
      dataId={rnsCopy.id}
      dataColumn="fix"
      update={update}
    />      
  </svelte:fragment>

  <svelte:fragment slot="detailsSection">
    <div class="flex gap-3">
      {#if role !== 'Startup'}
        <Button size="sm" variant="destructive" onclick={() => (deleteDialogOpen = true)}
          ><Trash class="h-4 w-4" /> Delete</Button
        >
      {/if}
      {#if ai}
        <Button
          size="sm"
          onclick={async () => {
            await addToRoadblocks(rnsCopy.id);
            closeDialog();
          }}><Check class="h-4 w-4" /> Add to Roadblocks</Button
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
      onChange={() => {
        update(rnsCopy.id, { assigneeId: rnsCopy.assignee });
      }}
      />
    </DetailsSectionContainer>
  </svelte:fragment>
</ViewEditDeleteDialog>

<AlertDialog.Root bind:open={deleteDialogOpen} onOpenChange={deleteDialogOnOpenChange}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete this Roadblocks.
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
