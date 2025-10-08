<script lang="ts">
  const { data, form } = $props();
  import { enhance } from '$app/forms';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Select from '$lib/components/ui/select';
  import { onMount } from 'svelte';
  import { Plus } from 'lucide-svelte';

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

  const FIELD_TYPES: { value: number; label: string }[] = [
    { value: 1, label: 'Short' },
    { value: 2, label: 'Long' },
    { value: 3, label: 'File' }
  ];

  import { PUBLIC_API_URL } from '$env/static/public';

  async function refreshTypes() {
    const res = await fetch(`${PUBLIC_API_URL}/assessment/types`, { headers: { Authorization: `Bearer ${data.access}` } });
    types = await res.json();
  }

  async function fetchFields() {
    if (!selectedType) return;
    const res = await fetch(`${PUBLIC_API_URL}/assessment/types/${selectedType.id}/fields`, { headers: { Authorization: `Bearer ${data.access}` } });
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
    await fetch(`${PUBLIC_API_URL}/assessment/types`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.access}` },
      body: JSON.stringify({ name: createName.trim() })
    });
    createName = '';
    showCreate = false;
    await refreshTypes();
  }

  async function renameType() {
    if (!selectedType) return;
    await fetch(`${PUBLIC_API_URL}/assessment/types/${selectedType.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.access}` },
      body: JSON.stringify({ name: renameName })
    });
    await refreshTypes();
  }

  async function deleteType() {
    if (!selectedType) return;
    await fetch(`${PUBLIC_API_URL}/assessment/types/${selectedType.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${data.access}` }
    });
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

    if (editingField.id) {
      await fetch(`${PUBLIC_API_URL}/assessment/fields/${editingField.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.access}` },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch(`${PUBLIC_API_URL}/assessment/fields`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.access}` },
        body: JSON.stringify(payload)
      });
    }

    showFieldEditModal = false;
    await fetchFields();
  }

  async function removeField(id: number) {
    await fetch(`${PUBLIC_API_URL}/assessment/fields/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${data.access}` }
    });
    await fetchFields();
  }
</script>

<div class="mx-auto w-full px-4 md:px-8">
  <h1 class="mb-2 text-3xl font-bold tracking-tight">Manage Assessment Types</h1>
  <p class="mb-6 text-sm text-muted-foreground">Assessment types are arranged vertically. Click one to manage its fields.</p>

  <!-- Full-width list -->
  <div class="w-full">
    <div class="mb-3 flex items-center justify-between gap-2">
      <h2 class="text-sm font-semibold">Assessment Types</h2>
      {#if !showCreate}
        <Button size="sm" onclick={() => (showCreate = true)}>
          <Plus /> Add type
        </Button>
      {:else}
        <div class="flex w-full max-w-md items-center gap-2">
          <Input placeholder="Type name" bind:value={createName} />
          <Button size="sm" onclick={() => openConfirm('Create new assessment type?', createType)}>Create</Button>
          <Button size="sm" variant="ghost" onclick={() => (showCreate = false, createName = '')}>Cancel</Button>
        </div>
      {/if}
    </div>

    <div class="space-y-3">
      {#each types as t}
        <button class="flex w-full items-center justify-between rounded-md border p-4 text-left hover:border-flutter-blue hover:bg-muted/40" onclick={() => onClickType(t)}>
          <span class="font-medium">{t.name}</span>
          <span class="text-xs text-muted-foreground">Manage</span>
        </button>
      {/each}
    </div>
  </div>
</div>

<!-- Type (fields) Modal -->
<Dialog.Root open={showTypeModal} onOpenChange={(v)=> showTypeModal = v}>
  <Dialog.Content class="max-w-[960px]">
    <Dialog.Header>
      <Dialog.Title>{selectedType?.name}</Dialog.Title>
      <Dialog.Description>Manage fields for this assessment type.</Dialog.Description>
    </Dialog.Header>

    {#if selectedType}
      <div class="mb-4 flex flex-wrap items-center gap-2">
        <Input class="max-w-xs" bind:value={renameName} />
        <Button size="sm" onclick={() => openConfirm('Rename this assessment type?', renameType)}>Rename</Button>
        <Button size="sm" variant="destructive" onclick={() => openConfirm('Delete this assessment type?', deleteType)}>Delete</Button>
      </div>

      <div class="mb-2 flex items-center justify-between">
        <h3 class="text-sm font-semibold">Fields</h3>
        <Button size="sm" onclick={() => openFieldModal()}>Add field</Button>
      </div>

      <div class="space-y-3">
        {#each fields as f}
          <div class="rounded border p-3">
            <div class="mb-1 text-sm font-medium">{f.label} <span class="ml-2 rounded bg-muted px-2 py-0.5 text-xs">{FIELD_TYPES.find(a=>a.value===f.fieldType)?.label ?? f.fieldType}</span></div>
            <div class="mt-2 flex gap-2">
              <Button size="sm" onclick={() => openFieldModal(f)}>Edit</Button>
              <Button size="sm" variant="destructive" onclick={() => openConfirm('Remove this field?', () => removeField(f.id))}>Remove</Button>
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <Dialog.Footer class="mt-6">
      <Button variant="ghost" onclick={() => (showTypeModal = false)}>Close</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Field Edit Modal -->
<Dialog.Root open={showFieldEditModal} onOpenChange={(v)=> showFieldEditModal = v}>
  <Dialog.Content class="max-w-[520px]">
    <Dialog.Header>
      <Dialog.Title>{editingField?.id ? 'Edit' : 'Add'} Field</Dialog.Title>
    </Dialog.Header>

    <div class="space-y-3">
      <div class="grid gap-2">
        <Label>Label</Label>
        <Input bind:value={editingField.label} />
      </div>

      <div class="grid gap-2">
        <Label>Field type</Label>
        <Select.Root type="single" bind:value={(editingField.fieldType as any)} onValueChange={() => (editingField.fieldType = Number(editingField.fieldType ?? 1) as any)}>
          <Select.Trigger class="w-[220px]">{FIELD_TYPES.find(t=>t.value===Number(editingField.fieldType))?.label ?? 'Select type'}</Select.Trigger>
          <Select.Content>
            {#each FIELD_TYPES as t}
              <Select.Item value={String(t.value)}>{t.label}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
    </div>

    <Dialog.Footer class="mt-4">
      <Button variant="ghost" onclick={() => (showFieldEditModal = false)}>Cancel</Button>
      <Button onclick={saveField}>Save</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Confirm Modal -->
<Dialog.Root open={showConfirm} onOpenChange={(v)=> showConfirm = v}>
  <Dialog.Content class="max-w-[420px]">
    <Dialog.Header>
      <Dialog.Title>Confirm</Dialog.Title>
    </Dialog.Header>
    <p class="text-sm">{confirmText}</p>
    <Dialog.Footer class="mt-4">
      <Button variant="ghost" onclick={() => (showConfirm = false)}>Cancel</Button>
      <Button onclick={async ()=> { if (confirmAction) await confirmAction(); showConfirm = false; }}>OK</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
