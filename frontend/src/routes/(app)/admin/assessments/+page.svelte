<script lang="ts">
  const { data, form } = $props();
  import { enhance } from '$app/forms';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Select from '$lib/components/ui/select';
  import { Badge } from '$lib/components/ui/badge';
  import { onMount } from 'svelte';
  import { Plus, Edit2, Trash2, ClipboardList, FileText, Type, Upload, ChevronRight, X } from 'lucide-svelte';

  type AssessmentType = { id: number; name: string };
  type AssessmentField = { id: number; label: string; fieldType: number };

  let types: AssessmentType[] = $state(data.types ?? []);
  let selectedType: AssessmentType | null = $state(null);
  let fields: AssessmentField[] = $state([]);

  // Modal states
  let showTypeModal = $state(false); // opens when clicking a type
  let showFieldEditModal = $state(false); // add/edit a field
  let showConfirm = $state(false);
  let confirmText = $state('');
  let confirmAction = $state<null | (() => Promise<void>)>(null);

  // Create/Rename state
  let showCreate = $state(false);
  let createName = $state('');
  let renameName = $state('');
  let editingField = $state<Partial<AssessmentField> & { id?: number }>({});

  const FIELD_TYPES: { value: number; label: string; icon: any }[] = [
    { value: 1, label: 'Short answer', icon: Type },
    { value: 2, label: 'Long answer', icon: FileText },
    { value: 3, label: 'File upload', icon: Upload }
  ];

  import { PUBLIC_API_URL } from '$env/static/public';

  async function refreshTypes() {
    const res = await fetch(`${PUBLIC_API_URL}/assessments/types`, { headers: { Authorization: `Bearer ${data.access}` } });
    if (!res.ok) {
      console.error('Failed to load types', res.status, await res.text());
      alert(`Failed to load assessment types (${res.status}). Check PUBLIC_API_URL and backend.`);
      return;
    }
    types = await res.json();
  }

  async function fetchFields() {
    if (!selectedType) return;
    const res = await fetch(`${PUBLIC_API_URL}/assessments/types/${selectedType.id}/fields`, { headers: { Authorization: `Bearer ${data.access}` } });
    if (!res.ok) {
      console.error('Failed to load fields', res.status, await res.text());
      alert(`Failed to load fields (${res.status}).`);
      return;
    }
    fields = await res.json();
  }

  function openConfirm(text: string, action: () => Promise<void>) {
    confirmText = text;
    confirmAction = action;
    showConfirm = true;
  }

  function onClickType(t: AssessmentType) {
    selectedType = t;
    renameName = t.name;
    fetchFields();
    showTypeModal = true;
  }

  function openFieldModal(field?: AssessmentField) {
    editingField = field ? { ...field } : { label: '', fieldType: 1 };
    showFieldEditModal = true;
  }

  async function createType() {
    if (!createName.trim()) return;
    const res = await fetch(`${PUBLIC_API_URL}/assessments/types`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.access}` },
      body: JSON.stringify({ name: createName.trim() })
    });
    if (!res.ok) {
      console.error('Create type failed', res.status, await res.text());
      alert(`Create type failed (${res.status}). Check backend logs.`);
      return;
    }
    createName = '';
    showCreate = false;
    await refreshTypes();
  }

  async function renameType() {
    if (!selectedType) return;
    const res = await fetch(`${PUBLIC_API_URL}/assessments/types/${selectedType.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.access}` },
      body: JSON.stringify({ name: renameName })
    });
    if (!res.ok) {
      console.error('Rename type failed', res.status, await res.text());
      alert(`Rename type failed (${res.status}).`);
      return;
    }
    await refreshTypes();
  }

  async function deleteType() {
    if (!selectedType) return;
    const res = await fetch(`${PUBLIC_API_URL}/assessments/types/${selectedType.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${data.access}` }
    });
    if (!res.ok) {
      console.error('Delete type failed', res.status, await res.text());
      alert(`Delete type failed (${res.status}).`);
      return;
    }
    selectedType = null;
    fields = [];
    showTypeModal = false;
    await refreshTypes();
  }

  async function saveField() {
    if (!selectedType || !editingField.label) return;
    const payload = {
      typeId: selectedType.id,
      label: editingField.label,
      fieldType: Number(editingField.fieldType ?? 1)
    } as any;

    let res: Response;
    if (editingField.id) {
      res = await fetch(`${PUBLIC_API_URL}/assessments/fields/${editingField.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.access}` },
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch(`${PUBLIC_API_URL}/assessments/fields`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.access}` },
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) {
      console.error('Save field failed', res.status, await res.text());
      alert(`Save field failed (${res.status}).`);
      return;
    }

    showFieldEditModal = false;
    await fetchFields();
  }

  async function removeField(id: number) {
    const res = await fetch(`${PUBLIC_API_URL}/assessments/fields/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${data.access}` }
    });
    if (!res.ok) {
      console.error('Remove field failed', res.status, await res.text());
      alert(`Remove field failed (${res.status}).`);
      return;
    }
    await fetchFields();
  }
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Assessment Types</h1>
      <p class="text-muted-foreground mt-1 text-sm">Configure assessment types and their custom fields</p>
    </div>
    {#if !showCreate}
      <Button onclick={() => (showCreate = true)} class="gap-2">
        <Plus class="h-4 w-4" />
        Add Type
      </Button>
    {/if}
  </div>

  {#if showCreate}
    <div class="bg-card rounded-lg border p-6 shadow-sm">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="font-semibold">Create New Type</h3>
        <Button size="icon" variant="ghost" onclick={() => (showCreate = false, createName = '')}>
          <X class="h-4 w-4" />
        </Button>
      </div>
      <div class="flex items-end gap-3">
        <div class="flex-1">
          <Label for="createName">Type Name</Label>
          <Input id="createName" placeholder="Enter assessment type name" bind:value={createName} class="mt-1.5" />
        </div>
        <Button onclick={() => openConfirm('Create new assessment type?', createType)} disabled={!createName.trim()}>
          Create
        </Button>
      </div>
    </div>
  {/if}

  <div class="bg-card rounded-lg border shadow-sm">
    <div class="bg-muted/50 flex items-center justify-between border-b px-6 py-4">
      <h2 class="font-semibold">All Assessment Types</h2>
      {#if types.length}
        <span class="text-muted-foreground text-xs">{types.length} {types.length === 1 ? 'type' : 'types'}</span>
      {/if}
    </div>
    <div class="divide-y">
      {#each types as t}
        <button 
          class="group flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-muted/50" 
          onclick={() => onClickType(t)}
        >
          <div class="flex items-center gap-3">
            <div class="rounded-lg bg-flutter-blue/10 p-2 transition-colors group-hover:bg-flutter-blue/20">
              <ClipboardList class="h-5 w-5 text-flutter-blue" />
            </div>
            <span class="font-medium">{t.name}</span>
          </div>
          <ChevronRight class="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </button>
      {/each}
      {#if !types.length}
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <div class="rounded-full bg-muted p-3 mb-3">
            <ClipboardList class="h-6 w-6 text-muted-foreground" />
          </div>
          <p class="text-sm font-medium text-muted-foreground">No assessment types yet</p>
          <p class="text-xs text-muted-foreground mt-1">Create your first type to get started</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Type (fields) Modal -->
<Dialog.Root open={showTypeModal} onOpenChange={(v)=> showTypeModal = v}>
  <Dialog.Content class="max-w-[960px] max-h-[90vh] overflow-y-auto">
    <Dialog.Header>
      <Dialog.Title class="text-2xl">{selectedType?.name}</Dialog.Title>
      <Dialog.Description>Configure fields for this assessment type</Dialog.Description>
    </Dialog.Header>

    {#if selectedType}
      <div class="space-y-6 pt-4">
        <div class="bg-muted/30 rounded-lg border p-4">
          <Label for="renameName" class="text-sm font-medium mb-2 block">Type Name</Label>
          <div class="flex items-center gap-3">
            <Input id="renameName" class="flex-1" bind:value={renameName} />
            <Button size="sm" onclick={() => openConfirm('Rename this assessment type?', renameType)} class="gap-2">
              <Edit2 class="h-3.5 w-3.5" />
              Rename
            </Button>
            <Button size="sm" variant="destructive" onclick={() => openConfirm('Delete this assessment type and all its fields?', deleteType)} class="gap-2">
              <Trash2 class="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </div>

        <div>
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h3 class="font-semibold">Custom Fields</h3>
              <p class="text-muted-foreground text-xs mt-0.5">Define what information should be collected</p>
            </div>
            <Button size="sm" onclick={() => openFieldModal()} class="gap-2">
              <Plus class="h-4 w-4" />
              Add Field
            </Button>
          </div>

          <div class="space-y-3">
            {#each fields as f}
              {@const FieldIcon = FIELD_TYPES.find(a=>a.value===f.fieldType)?.icon ?? FileText}
              <div class="group rounded-lg border bg-card p-4 transition-all hover:border-flutter-blue/50 hover:bg-muted/30">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <FieldIcon class="h-4 w-4 text-muted-foreground" />
                      <span class="font-medium">{f.label}</span>
                    </div>
                    <Badge variant="secondary" class="text-xs">
                      {FIELD_TYPES.find(a=>a.value===f.fieldType)?.label ?? `Type ${f.fieldType}`}
                    </Badge>
                  </div>
                  <div class="flex gap-2">
                    <Button size="sm" variant="outline" onclick={() => openFieldModal(f)} class="gap-1.5">
                      <Edit2 class="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onclick={() => openConfirm('Remove this field?', () => removeField(f.id))} class="gap-1.5">
                      <Trash2 class="h-3.5 w-3.5" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            {/each}
            {#if !fields.length}
              <div class="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
                <div class="rounded-full bg-muted p-3 mb-3">
                  <FileText class="h-6 w-6 text-muted-foreground" />
                </div>
                <p class="text-sm font-medium text-muted-foreground">No fields defined</p>
                <p class="text-xs text-muted-foreground mt-1">Add fields to collect specific information</p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}

    <Dialog.Footer class="mt-6">
      <Button variant="outline" onclick={() => (showTypeModal = false)}>Close</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Field Edit Modal -->
<Dialog.Root open={showFieldEditModal} onOpenChange={(v)=> showFieldEditModal = v}>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>{editingField?.id ? 'Edit' : 'Add'} Field</Dialog.Title>
      <Dialog.Description>Define how this field should appear and behave</Dialog.Description>
    </Dialog.Header>

    <div class="space-y-4 pt-4">
      <div class="grid gap-2">
        <Label for="fieldLabel">Field Label</Label>
        <Input id="fieldLabel" placeholder="Enter field label" bind:value={editingField.label} />
      </div>

      <div class="grid gap-2">
        <Label>Field Type</Label>
        <Select.Root type="single" bind:value={(editingField.fieldType as any)} onValueChange={() => (editingField.fieldType = Number(editingField.fieldType ?? 1) as any)}>
          <Select.Trigger class="w-full">
            {#snippet children()}
              {@const SelectedIcon = FIELD_TYPES.find(t=>t.value===Number(editingField.fieldType))?.icon ?? FileText}
              <div class="flex items-center gap-2">
                <SelectedIcon class="h-4 w-4" />
                {FIELD_TYPES.find(t=>t.value===Number(editingField.fieldType))?.label ?? 'Select type'}
              </div>
            {/snippet}
          </Select.Trigger>
          <Select.Content>
            {#each FIELD_TYPES as t}
              {@const Icon = t.icon}
              <Select.Item value={String(t.value)}>
                {#snippet children()}
                  <div class="flex items-center gap-2">
                    <Icon class="h-4 w-4" />
                    {t.label}
                  </div>
                {/snippet}
              </Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
    </div>

    <Dialog.Footer class="mt-6">
      <Button variant="outline" onclick={() => (showFieldEditModal = false)}>Cancel</Button>
      <Button onclick={saveField} disabled={!editingField.label?.trim()}>
        {editingField?.id ? 'Update' : 'Create'} Field
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Confirm Modal -->
<Dialog.Root open={showConfirm} onOpenChange={(v)=> showConfirm = v}>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>Confirm Action</Dialog.Title>
      <Dialog.Description class="pt-2">{confirmText}</Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer class="mt-6">
      <Button variant="outline" onclick={() => (showConfirm = false)}>Cancel</Button>
      <Button onclick={async ()=> { if (confirmAction) await confirmAction(); showConfirm = false; }}>Confirm</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
