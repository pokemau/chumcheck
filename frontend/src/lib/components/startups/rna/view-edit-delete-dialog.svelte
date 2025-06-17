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
  import EditableSection from '../base/EditableSection.svelte';
  import DetailsSection from '../base/DetailsSection.svelte';
  import DetailsSectionContainer from '../base/DetailsSectionContainer.svelte';
  import ViewEditDeleteDialog from '../base/ViewEditDeleteDialog.svelte';
  import SectionTitle from '../base/SectionTitle.svelte';

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

</script>

<ViewEditDeleteDialog {open} {onOpenChange}>
  <svelte:fragment slot="editableSection">
    <SectionTitle>{rnaCopy.readinessLevel.readinessType}</SectionTitle>
    <EditableSection
      label="Description"
      editMode={editDescription}
      role={role}
      data={rnaCopy.rna}
      dataId={rnaCopy.id}
      dataColumn="rna"
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
    </div>
    <DetailsSectionContainer>
      <DetailsSection
      label="Current Level"
      value={
        readinessData.find((d:any) => d?.readinessLevel.readinessType === rnaCopy?.readinessLevel.readinessType)
          ?.readinessLevel.level
      }
      />
      <DetailsSection
      label="Readiness Type"
      value={
        readinessData.find((d:any) => d?.readinessLevel.readinessType === rnaCopy?.readinessLevel.readinessType)
          ?.readinessLevel.readinessType
      }
      />
    </DetailsSectionContainer>
  </svelte:fragment>
</ViewEditDeleteDialog>

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
