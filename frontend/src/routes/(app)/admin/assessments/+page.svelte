<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Select from '$lib/components/ui/select';
  import { Badge } from '$lib/components/ui/badge';
  import {
    Plus,
    Edit2,
    Trash2,
    ClipboardList,
    FileText,
    Type,
    Upload,
    ChevronRight
  } from 'lucide-svelte';

  const { data, form } = $props();

  console.log(data);

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
  let showCreateTypeModal = $state(false);
  let createName = $state('');
  let renameName = $state('');
  let editingField = $state<Partial<AssessmentField> & { id?: number }>({});

  const ASSESSMENT_TYPES = [
    'Technology',
    'Acceptance',
    'Market',
    'Regulatory',
    'Organizational',
    'Investment'
  ];

  let expandedTypes = $state<Set<string>>(new Set());

  const FIELD_TYPES: { value: number; label: string; icon: any }[] = [
    { value: 1, label: 'Short answer', icon: Type },
    { value: 2, label: 'Long answer', icon: FileText },
    { value: 3, label: 'File upload', icon: Upload }
  ];

  import { PUBLIC_API_URL } from '$env/static/public';

  async function refreshTypes() {
    const res = await fetch(`${PUBLIC_API_URL}/assessments/types`, {
      headers: { Authorization: `Bearer ${data.access}` }
    });
    if (!res.ok) {
      console.error('Failed to load types', res.status, await res.text());
      alert(
        `Failed to load assessment types (${res.status}). Check PUBLIC_API_URL and backend.`
      );
      return;
    }
    types = await res.json();
  }

  async function fetchFields() {
    if (!selectedType) return;
    const res = await fetch(
      `${PUBLIC_API_URL}/assessments/types/${selectedType.id}/fields`,
      { headers: { Authorization: `Bearer ${data.access}` } }
    );
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

  function toggleType(typeName: string) {
    if (expandedTypes.has(typeName)) {
      expandedTypes.delete(typeName);
    } else {
      expandedTypes.add(typeName);
    }
    expandedTypes = new Set(expandedTypes);
  }

  async function createType() {
    if (!createName.trim()) return;
    const res = await fetch(`${PUBLIC_API_URL}/assessments/types`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.access}`
      },
      body: JSON.stringify({ name: createName.trim() })
    });
    if (!res.ok) {
      console.error('Create type failed', res.status, await res.text());
      alert(`Create type failed (${res.status}). Check backend logs.`);
      return;
    }
    createName = '';
    showCreateTypeModal = false;
    await refreshTypes();
  }

  async function renameType() {
    if (!selectedType) return;
    const res = await fetch(
      `${PUBLIC_API_URL}/assessments/types/${selectedType.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.access}`
        },
        body: JSON.stringify({ name: renameName })
      }
    );
    if (!res.ok) {
      console.error('Rename type failed', res.status, await res.text());
      alert(`Rename type failed (${res.status}).`);
      return;
    }
    await refreshTypes();
  }

  async function deleteType() {
    if (!selectedType) return;
    const res = await fetch(
      `${PUBLIC_API_URL}/assessments/types/${selectedType.id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${data.access}` }
      }
    );
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
      res = await fetch(
        `${PUBLIC_API_URL}/assessments/fields/${editingField.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.access}`
          },
          body: JSON.stringify(payload)
        }
      );
    } else {
      res = await fetch(`${PUBLIC_API_URL}/assessments/fields`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.access}`
        },
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

<!-- <div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Assessment Types</h1>
      <p class="mt-1 text-sm text-muted-foreground">
        Configure assessment types and their custom fields
      </p>
    </div>
    <Button onclick={() => (showCreateTypeModal = true)} class="gap-2">
      <Plus class="h-4 w-4" />
      Add Type
    </Button>
  </div>

  <div class="rounded-lg border bg-card shadow-sm">
    <div
      class="bg-muted/50 flex items-center justify-between border-b px-6 py-4"
    >
      <h2 class="font-semibold">All Assessment Types</h2>
      {#if types.length}
        <span class="text-xs text-muted-foreground"
          >{types.length} {types.length === 1 ? 'type' : 'types'}</span
        >
      {/if}
    </div>
    <div class="divide-y">
      {#each types as t}
        <button
          class="hover:bg-muted/50 group flex w-full items-center justify-between px-6 py-4 text-left transition-colors"
          onclick={() => onClickType(t)}
        >
          <div class="flex items-center gap-3">
            <div
              class="bg-flutter-blue/10 group-hover:bg-flutter-blue/20 rounded-lg p-2 transition-colors"
            >
              <ClipboardList class="text-flutter-blue h-5 w-5" />
            </div>
            <span class="font-medium">{t.name}</span>
          </div>
          <ChevronRight
            class="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1"
          />
        </button>
      {/each}
      {#if !types.length}
        <div
          class="flex flex-col items-center justify-center py-12 text-center"
        >
          <div class="mb-3 rounded-full bg-muted p-3">
            <ClipboardList class="h-6 w-6 text-muted-foreground" />
          </div>
          <p class="text-sm font-medium text-muted-foreground">
            No assessment types yet
          </p>
          <p class="mt-1 text-xs text-muted-foreground">
            Create your first type to get started
          </p>
        </div>
      {/if}
    </div>
  </div>
</div> -->

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Assessments</h1>
      <p class="mt-1 text-sm text-muted-foreground">
        View all assessments organized by type
      </p>
    </div>
    <Button onclick={() => (showCreateTypeModal = true)} class="gap-2">
      <Plus class="h-4 w-4" />
      Add Type
    </Button>
  </div>

  <div class="rounded-lg border bg-card shadow-sm">
    <div
      class="bg-muted/50 flex items-center justify-between border-b px-6 py-4"
    >
      <h2 class="font-semibold">All Assessments by Type</h2>
      <span class="text-xs text-muted-foreground">
        {Object.keys(data.assessments || {}).length} types
      </span>
    </div>

    <div class="divide-y">
      {#each ASSESSMENT_TYPES as typeName}
        {@const assessments = data.assessments?.[typeName] || []}
        {@const isExpanded = expandedTypes.has(typeName)}

        <div>
          <!-- Type Header (Collapsible) -->
          <button
            class="hover:bg-muted/50 group flex w-full items-center justify-between px-6 py-4 text-left transition-colors"
            onclick={() => toggleType(typeName)}
          >
            <div class="flex items-center gap-3">
              <div
                class="bg-flutter-blue/10 group-hover:bg-flutter-blue/20 rounded-lg p-2 transition-colors"
              >
                <ClipboardList class="text-flutter-blue h-5 w-5" />
              </div>
              <div>
                <span class="font-medium">{typeName}</span>
                <span class="ml-2 text-xs text-muted-foreground">
                  {assessments.length}
                  {assessments.length === 1 ? 'assessment' : 'assessments'}
                </span>
              </div>
            </div>
            <ChevronRight
              class="h-4 w-4 text-muted-foreground transition-transform {isExpanded
                ? 'rotate-90'
                : ''}"
            />
          </button>

          <!-- Assessments List (Collapsible Content) -->
          {#if isExpanded}
            <div class="bg-muted/20 border-t px-6 py-4">
              {#if assessments.length > 0}
                <div class="space-y-2">
                  {#each assessments as assessment}
                    {@const FieldIcon =
                      FIELD_TYPES.find((t) =>
                        t.label
                          .toLowerCase()
                          .includes(assessment.answerType.toLowerCase())
                      )?.icon ?? FileText}

                    <div
                      class="hover:bg-card/80 rounded-lg border bg-card p-4 transition-colors"
                    >
                      <div class="flex items-start gap-3">
                        <div class="rounded-lg bg-muted p-2">
                          <FieldIcon class="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="text-sm font-medium">
                            {assessment.description}
                          </p>
                          <div class="mt-1 flex items-center gap-2">
                            <Badge variant="secondary" class="text-xs">
                              {assessment.answerType}
                            </Badge>
                            <span class="text-xs text-muted-foreground"
                              >ID: {assessment.id}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  {/each}
                </div>
              {:else}
                <div
                  class="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div class="mb-3 rounded-full bg-muted p-3">
                    <FileText class="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p class="text-sm font-medium text-muted-foreground">
                    No assessments for {typeName}
                  </p>
                  <p class="mt-1 text-xs text-muted-foreground">
                    Add assessments to this type to get started
                  </p>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Type (fields) Modal -->
<Dialog.Root open={showTypeModal} onOpenChange={(v) => (showTypeModal = v)}>
  <Dialog.Content class="max-h-[90vh] max-w-[1000px] overflow-hidden p-0">
    {#if selectedType}
      <!-- Header Section -->
      <div
        class="from-flutter-blue/5 border-b bg-gradient-to-r to-transparent px-6 py-5"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="mb-2 flex items-center gap-3">
              <div class="bg-flutter-blue/10 rounded-lg p-2.5">
                <ClipboardList class="text-flutter-blue h-5 w-5" />
              </div>
              <div>
                <Dialog.Title class="text-2xl font-bold"
                  >{selectedType.name}</Dialog.Title
                >
                <Dialog.Description class="mt-1">
                  Configure fields and settings for this assessment type
                </Dialog.Description>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="max-h-[calc(90vh-200px)] overflow-y-auto px-6 py-6">
        <div class="space-y-8">
          <!-- Type Settings Section -->
          <div class="space-y-4">
            <div class="mb-3 flex items-center gap-2">
              <div class="bg-flutter-blue h-1 w-1 rounded-full"></div>
              <h3
                class="text-sm font-bold uppercase tracking-wider text-muted-foreground"
              >
                Type Settings
              </h3>
            </div>

            <div class="rounded-xl border bg-card shadow-sm">
              <div class="p-5">
                <Label for="renameName" class="mb-3 block text-sm font-medium">
                  Assessment Type Name
                </Label>
                <div class="flex items-center gap-3">
                  <Input
                    id="renameName"
                    class="flex-1"
                    bind:value={renameName}
                    placeholder="Enter type name"
                  />
                  <Button
                    size="default"
                    onclick={() =>
                      openConfirm('Rename this assessment type?', renameType)}
                    class="gap-2 px-4"
                    disabled={!renameName.trim() ||
                      renameName === selectedType.name}
                  >
                    <Edit2 class="h-4 w-4" />
                    Rename
                  </Button>
                  <Button
                    size="default"
                    variant="destructive"
                    onclick={() =>
                      openConfirm(
                        'Delete this assessment type and all its fields? This action cannot be undone.',
                        deleteType
                      )}
                    class="gap-2 px-4"
                  >
                    <Trash2 class="h-4 w-4" />
                    Delete Type
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <!-- Custom Fields Section -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="bg-flutter-blue h-1 w-1 rounded-full"></div>
                <div>
                  <h3
                    class="text-sm font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Custom Fields
                  </h3>
                  <p class="mt-0.5 text-xs text-muted-foreground">
                    {fields.length}
                    {fields.length === 1 ? 'field' : 'fields'} defined
                  </p>
                </div>
              </div>
              <Button onclick={() => openFieldModal()} class="shadow-sm">
                <Plus class="h-4 w-4" />
                Add Field
              </Button>
            </div>

            <div class="space-y-3">
              {#each fields as f, index}
                {@const FieldIcon =
                  FIELD_TYPES.find((a) => a.value === f.fieldType)?.icon ??
                  FileText}
                <div
                  class="hover:border-flutter-blue/30 group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
                >
                  <div
                    class="bg-flutter-blue/20 group-hover:bg-flutter-blue absolute bottom-0 left-0 top-0 w-1 transition-all"
                  ></div>
                  <div class="p-5 pl-6">
                    <div class="flex items-start justify-between gap-4">
                      <div class="min-w-0 flex-1">
                        <div class="mb-3 flex items-center gap-3">
                          <div
                            class="group-hover:bg-flutter-blue/10 rounded-lg bg-muted p-2 transition-colors"
                          >
                            <FieldIcon
                              class="group-hover:text-flutter-blue h-4 w-4 text-muted-foreground transition-colors"
                            />
                          </div>
                          <div class="min-w-0 flex-1">
                            <div class="flex items-center gap-2">
                              <span
                                class="text-xs font-medium text-muted-foreground"
                                >Field {index + 1}</span
                              >
                            </div>
                            <h4 class="truncate text-base font-semibold">
                              {f.label}
                            </h4>
                          </div>
                        </div>
                        <div class="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            class="text-xs font-medium"
                          >
                            {FIELD_TYPES.find((a) => a.value === f.fieldType)
                              ?.label ?? `Type ${f.fieldType}`}
                          </Badge>
                        </div>
                      </div>
                      <div class="flex shrink-0 gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onclick={() => openFieldModal(f)}
                          class="h-9 gap-2"
                        >
                          <Edit2 class="h-3.5 w-3.5" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onclick={() =>
                            openConfirm(
                              'Remove this field? This action cannot be undone.',
                              () => removeField(f.id)
                            )}
                          class="h-9 gap-2"
                        >
                          <Trash2 class="h-3.5 w-3.5" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              {/each}

              {#if !fields.length}
                <div
                  class="bg-muted/30 hover:bg-muted/50 flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16 text-center transition-colors"
                >
                  <div class="mb-4 rounded-full bg-muted p-4">
                    <FileText class="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p class="mb-1 text-base font-semibold text-foreground">
                    No fields defined yet
                  </p>
                  <p class="mb-4 max-w-sm text-sm text-muted-foreground">
                    Add custom fields to collect specific information for this
                    assessment type
                  </p>
                  <Button onclick={() => openFieldModal()} class="gap-2">
                    <Plus class="h-4 w-4" />
                    Add Your First Field
                  </Button>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Section -->
      <div class="bg-muted/30 border-t px-6 py-4">
        <div class="flex items-center justify-between">
          <p class="text-xs text-muted-foreground">
            Changes are saved automatically
          </p>
          <Button
            variant="outline"
            onclick={() => (showTypeModal = false)}
            class="gap-2"
          >
            Close
          </Button>
        </div>
      </div>
    {/if}
  </Dialog.Content>
</Dialog.Root>

<Dialog.Root
  open={showFieldEditModal}
  onOpenChange={(v) => (showFieldEditModal = v)}
>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>{editingField?.id ? 'Edit' : 'Add'} Field</Dialog.Title>
      <Dialog.Description
        >Define how this field should appear and behave</Dialog.Description
      >
    </Dialog.Header>

    <div class="space-y-4 pt-4">
      <div class="grid gap-2">
        <Label for="fieldLabel">Field Label</Label>
        <Input
          id="fieldLabel"
          placeholder="Enter field label"
          bind:value={editingField.label}
        />
      </div>

      <div class="grid gap-2">
        <Label>Field Type</Label>
        <Select.Root
          type="single"
          bind:value={editingField.fieldType as any}
          onValueChange={() =>
            (editingField.fieldType = Number(
              editingField.fieldType ?? 1
            ) as any)}
        >
          <Select.Trigger class="w-full">
            {#snippet children()}
              {@const SelectedIcon =
                FIELD_TYPES.find(
                  (t) => t.value === Number(editingField.fieldType)
                )?.icon ?? FileText}
              <div class="flex items-center gap-2">
                <SelectedIcon class="h-4 w-4" />
                {FIELD_TYPES.find(
                  (t) => t.value === Number(editingField.fieldType)
                )?.label ?? 'Select type'}
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
      <Button variant="outline" onclick={() => (showFieldEditModal = false)}
        >Cancel</Button
      >
      <Button onclick={saveField} disabled={!editingField.label?.trim()}>
        {editingField?.id ? 'Update' : 'Create'} Field
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Confirm Modal -->
<Dialog.Root open={showConfirm} onOpenChange={(v) => (showConfirm = v)}>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>Confirm Action</Dialog.Title>
      <Dialog.Description class="pt-2">{confirmText}</Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer class="mt-6">
      <Button variant="outline" onclick={() => (showConfirm = false)}
        >Cancel</Button
      >
      <Button
        onclick={async () => {
          if (confirmAction) await confirmAction();
          showConfirm = false;
        }}>Confirm</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Create Type Modal -->
<Dialog.Root
  open={showCreateTypeModal}
  onOpenChange={(v) => (showCreateTypeModal = v)}
>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>Create New Assessment Type</Dialog.Title>
      <Dialog.Description
        >Enter a name for the new assessment type</Dialog.Description
      >
    </Dialog.Header>
    <div class="space-y-4 pt-4">
      <div class="grid gap-2">
        <Label for="createName">Type Name</Label>
        <Input
          id="createName"
          placeholder="Enter assessment type name"
          bind:value={createName}
        />
      </div>
    </div>
    <Dialog.Footer class="mt-6">
      <Button
        variant="outline"
        onclick={() => ((showCreateTypeModal = false), (createName = ''))}
        >Cancel</Button
      >
      <Button onclick={createType} disabled={!createName.trim()}>
        Create Type
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
