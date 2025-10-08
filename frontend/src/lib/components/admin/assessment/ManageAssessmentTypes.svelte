<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Select from '$lib/components/ui/select';
  import { Label } from '$lib/components/ui/label';

  export let access: string;

  // Existing DB stores answer_type as smallint; define a fixed mapping
  const ANSWER_TYPES: { value: number; label: string }[] = [
    { value: 0, label: 'Text' },
    { value: 1, label: 'Textarea' },
    { value: 2, label: 'Number' },
    { value: 3, label: 'Radio' },
    { value: 4, label: 'Select' },
    { value: 5, label: 'Checkbox' },
    { value: 6, label: 'Rating (1-5)' }
  ];

  type AssessmentType = { id: number; name: string };
  type AssessmentField = { id: number; label: string; answerTypeCode: number };

  import { PUBLIC_API_URL } from '$env/static/public';

  let types: AssessmentType[] = [];
  let selectedType: AssessmentType | null = null;
  let fields: AssessmentField[] = [];

  let createTypeName = '';
  let renameTypeName = '';

  let showFieldsModal = false;
  let editingField: Partial<AssessmentField> & { id?: number } = {};

  async function fetchTypes() {
    const res = await fetch(`${PUBLIC_API_URL}/assessment/types`, {
      headers: { Authorization: `Bearer ${access}` }
    });
    const raw = await res.json();
    // API returns `name` derived from column `type`
    types = raw;
    if (types.length && !selectedType) selectType(types[0]);
  }

  async function selectType(t: AssessmentType) {
    selectedType = t;
    renameTypeName = t.name;
    await fetchFields();
  }

  async function fetchFields() {
    if (!selectedType) return;
    const res = await fetch(`${PUBLIC_API_URL}/assessment/types/${selectedType.id}/fields`, {
      headers: { Authorization: `Bearer ${access}` }
    });
    fields = await res.json();
  }

  async function createType() {
    if (!createTypeName.trim()) return;
    await fetch(`${PUBLIC_API_URL}/assessment/types`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access}` },
      body: JSON.stringify({ name: createTypeName.trim() })
    });
    createTypeName = '';
    await fetchTypes();
  }

  async function renameType() {
    if (!selectedType) return;
    await fetch(`${PUBLIC_API_URL}/assessment/types/${selectedType.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access}` },
      body: JSON.stringify({ name: renameTypeName })
    });
    await fetchTypes();
  }

  async function deleteType() {
    if (!selectedType) return;
    await fetch(`${PUBLIC_API_URL}/assessment/types/${selectedType.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${access}` }
    });
    selectedType = null;
    fields = [];
    await fetchTypes();
  }

  function openFieldModal(field?: AssessmentField) {
    editingField = field ? { ...field } : { label: '', answerTypeCode: 0 };
    showFieldsModal = true;
  }

  async function saveField() {
    if (!selectedType) return;
    const payload = {
      typeId: selectedType.id,
      label: editingField.label,
      answerTypeCode: Number(editingField.answerTypeCode ?? 0)
    } as any;

    if (editingField.id) {
      await fetch(`${PUBLIC_API_URL}/assessment/fields/${editingField.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access}` },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch(`${PUBLIC_API_URL}/assessment/fields`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access}` },
        body: JSON.stringify(payload)
      });
    }

    showFieldsModal = false;
    await fetchFields();
  }

  async function removeField(id: number) {
    await fetch(`${PUBLIC_API_URL}/assessment/fields/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${access}` }
    });
    await fetchFields();
  }

  function renderFieldPreview(field: AssessmentField) {
    switch (field.answerTypeCode) {
      case 0: return `<input type="text" class="w-full rounded border p-2" />`;
      case 1: return `<textarea class="w-full rounded border p-2"></textarea>`;
      case 2: return `<input type="number" class="w-full rounded border p-2" />`;
      case 5: return `<label class="inline-flex items-center"><input type="checkbox" class="mr-2" /> ${field.label}</label>`;
      case 6: return `<div class="flex gap-2">${[1,2,3,4,5].map(n=>`<span class="inline-block h-8 w-8 rounded bg-muted text-center leading-8">${n}</span>`).join('')}</div>`;
      case 3: return `<em class="text-xs text-muted-foreground">Radio (configure options in DB)</em>`;
      case 4: return `<em class="text-xs text-muted-foreground">Select (configure options in DB)</em>`;
      default: return `<em class="text-xs text-muted-foreground">Unknown type</em>`;
    }
  }

  onMount(fetchTypes);
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
  <div class="space-y-3">
    <h2 class="text-sm font-semibold">Assessment Types</h2>
    <div class="space-y-2">
      <div class="flex gap-2">
        <Input placeholder="New type name" bind:value={createTypeName} />
        <Button size="sm" on:click={createType}>Add</Button>
      </div>
    </div>

    <div class="mt-3 divide-y rounded border">
      {#each types as t}
        <button class="flex w-full items-center justify-between p-2 text-left hover:bg-muted/50 {selectedType?.id===t.id ? 'bg-muted/60' : ''}" on:click={() => selectType(t)}>{t.name}</button>
      {/each}
    </div>
  </div>

  <div class="md:col-span-2">
    {#if selectedType}
      <div class="mb-3 flex items-center gap-2">
        <Input class="max-w-xs" bind:value={renameTypeName} />
        <Button size="sm" on:click={renameType}>Rename</Button>
        <Button size="sm" variant="destructive" on:click={deleteType}>Delete</Button>
      </div>

      <div class="mb-2 flex items-center justify-between">
        <h3 class="text-sm font-semibold">Fields</h3>
        <Button size="sm" on:click={() => openFieldModal()}>Add field</Button>
      </div>

      <div class="space-y-3">
        {#each fields as f}
          <div class="rounded border p-3">
            <div class="mb-1 text-sm font-medium">{f.label} <span class="ml-2 rounded bg-muted px-2 py-0.5 text-xs">{ANSWER_TYPES.find(a=>a.value===f.answerTypeCode)?.label ?? f.answerTypeCode}</span></div>
            <div class="prose prose-sm" this={undefined}>{@html renderFieldPreview(f)}</div>
            <div class="mt-2 flex gap-2">
              <Button size="xs" on:click={() => openFieldModal(f)}>Edit</Button>
              <Button size="xs" variant="destructive" on:click={() => removeField(f.id)}>Remove</Button>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-sm text-muted-foreground">Select a type to manage its fields.</p>
    {/if}
  </div>
</div>

<Dialog.Root open={showFieldsModal} onOpenChange={(v)=> showFieldsModal = v}>
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
        <Label>Answer type</Label>
        <Select.Root type="single" bind:value={(editingField.answerTypeCode as any)} onSelected={(e:any)=> editingField.answerTypeCode = Number(e.detail?.value ?? 0)} >
          <Select.Trigger class="w-[220px]">{ANSWER_TYPES.find(t=>t.value===editingField.answerTypeCode)?.label ?? 'Select type'}</Select.Trigger>
          <Select.Content>
            {#each ANSWER_TYPES as t}
              <Select.Item value={String(t.value)}>{t.label}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
    </div>

    <Dialog.Footer class="mt-4">
      <Button variant="ghost" on:click={() => (showFieldsModal = false)}>Cancel</Button>
      <Button on:click={saveField}>Save</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
