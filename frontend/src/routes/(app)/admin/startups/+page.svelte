<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Select from '$lib/components/ui/select';
  import { Plus, Edit2, Trash2, Rocket, Loader2, User } from 'lucide-svelte';
  import { PUBLIC_API_URL } from '$env/static/public';

  let { data } = $props<{ data: { startups: Array<any>; users: Array<any>; access: string } }>();
  let startups = $state(data.startups);
  let users = data.users;
  let toDelete: any = $state(null);
  let toEdit: any = $state(null);
  let deleteOpen = $state(false);
  let editOpen = $state(false);
  let createOpen = $state(false);
  let deleting = $state(false);
  let saving = $state(false);
  let creating = $state(false);
  let error: string | null = $state(null);
  let createError: string | null = $state(null);

  let editForm = $state({
    name: '',
    userId: '',
    groupName: '',
    universityName: '',
    links: '',
    dataPrivacy: false,
    eligibility: false
  });

  let createForm = $state({
    name: '',
    userId: '',
    groupName: '',
    universityName: '',
    links: '',
    dataPrivacy: false,
    eligibility: false,
    qualificationStatus: 'PENDING'
  });

  function openCreateModal() {
    createForm = {
      name: '',
      userId: '',
      groupName: '',
      universityName: '',
      links: '',
      dataPrivacy: false,
      eligibility: false,
      qualificationStatus: 'PENDING'
    };
    createError = null;
    createOpen = true;
  }

  async function createStartup() {
    creating = true;
    createError = null;

    try {
      const payload: any = { ...createForm };
      if (payload.userId) payload.userId = Number(payload.userId);

      const res = await fetch(`${PUBLIC_API_URL}/admin/startups/create-json`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${data.access}` 
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          createError = json.message || text || 'Failed to create startup';
        } catch {
          createError = text || 'Failed to create startup';
        }
        creating = false;
        return;
      }

      const result = await res.json();
      if (result.startup) {
        startups = [...startups, result.startup];
      }
      
      createOpen = false;
    } catch (e) {
      createError = 'Failed to create startup';
    } finally {
      creating = false;
    }
  }

  function openEditModal(startup: any) {
    toEdit = startup;
    editForm = {
      name: startup.name ?? '',
      userId: String(startup.user?.id ?? ''),
      groupName: startup.groupName ?? '',
      universityName: startup.universityName ?? '',
      links: startup.links ?? '',
      dataPrivacy: Boolean(startup.dataPrivacy),
      eligibility: Boolean(startup.eligibility)
    };
    error = null;
    editOpen = true;
  }

  async function saveStartup() {
    if (!toEdit) return;
    saving = true;
    error = null;

    try {
      const payload: any = { ...editForm };
      if (payload.userId) payload.userId = Number(payload.userId);

      const res = await fetch(
        `${PUBLIC_API_URL}/admin/startups/edit-json/${toEdit.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.access}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          error = json.message || text || 'Failed to update startup';
        } catch {
          error = text || 'Failed to update startup';
        }
        saving = false;
        return;
      }

      const updated = await res.json();
      startups = startups.map((s: any) =>
        s.id === toEdit.id ? { ...s, ...updated.startup } : s
      );

      editOpen = false;
      toEdit = null;
    } catch (e) {
      error = 'Failed to update startup';
    } finally {
      saving = false;
    }
  }
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Startups</h1>
      <p class="text-muted-foreground mt-1 text-sm">Manage startup applications and data</p>
    </div>
    <Button onclick={openCreateModal} class="gap-2">
      <Plus class="h-4 w-4" />
      Create Startup
    </Button>
  </div>

  <div class="bg-card rounded-lg border shadow-sm">
    <div class="bg-muted/50 flex items-center justify-between border-b px-6 py-4">
      <h2 class="font-semibold">All Startups</h2>
      {#if startups && startups.length}
        <span class="text-muted-foreground text-xs">{startups.length} {startups.length === 1 ? 'startup' : 'startups'}</span>
      {/if}
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b bg-muted/30">
            <th class="px-6 py-3 text-left font-medium">ID</th>
            <th class="px-6 py-3 text-left font-medium">Name</th>
            <th class="px-6 py-3 text-left font-medium">Owner</th>
            <th class="px-6 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each startups as s}
            <tr class="group border-b transition-colors hover:bg-muted/50">
              <td class="px-6 py-4 font-mono text-xs text-muted-foreground">{s.id}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div class="rounded-full bg-flutter-blue/10 p-1.5">
                    <Rocket class="h-3.5 w-3.5 text-flutter-blue" />
                  </div>
                  <span class="font-medium">{s.name}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                {#if s.user?.email}
                  <div class="flex items-center gap-2">
                    <div class="rounded-full bg-muted p-1">
                      <User class="h-3 w-3 text-muted-foreground" />
                    </div>
                    <span class="text-muted-foreground">{s.user.email}</span>
                  </div>
                {:else}
                  <span class="italic text-muted-foreground text-xs">No owner</span>
                {/if}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    onclick={() => openEditModal(s)}
                    class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-flutter-blue transition-colors hover:bg-flutter-blue/10"
                  >
                    <Edit2 class="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button 
                    class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                    onclick={() => { toDelete = s; deleteOpen = true; }}
                  >
                    <Trash2 class="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Create Startup Modal -->
<Dialog.Root bind:open={createOpen} onOpenChange={(open) => { if (!open && creating) return; createOpen = open; }}>
  <Dialog.Content class="sm:max-w-lg">
    <Dialog.Header>
      <Dialog.Title>Create New Startup</Dialog.Title>
      <Dialog.Description class="pt-2">
        Add a new startup to the system
      </Dialog.Description>
    </Dialog.Header>

    {#if createError}
      <div class="rounded-md bg-red-50 p-3 text-sm text-red-600">
        {createError}
      </div>
    {/if}

    <div class="space-y-4 pt-4">
      <div class="grid gap-2">
        <Label for="create-name">Name *</Label>
        <Input id="create-name" required bind:value={createForm.name} />
      </div>

      <div class="grid gap-2">
        <Label for="create-owner">Owner</Label>
        <Select.Root type="single" bind:value={createForm.userId}>
          <Select.Trigger id="create-owner">
            {createForm.userId ? users.find((u: any) => String(u.id) === createForm.userId)?.email || 'Select owner' : 'Select owner'}
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="">No owner</Select.Item>
            {#each users as u}
              <Select.Item value={String(u.id)}>{u.email}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="create-group">Group Name</Label>
          <Input id="create-group" bind:value={createForm.groupName} />
        </div>
        <div class="grid gap-2">
          <Label for="create-university">University</Label>
          <Input id="create-university" bind:value={createForm.universityName} />
        </div>
      </div>

      <div class="grid gap-2">
        <Label for="create-links">Links</Label>
        <Input id="create-links" bind:value={createForm.links} />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" bind:checked={createForm.dataPrivacy} />
          Data Privacy
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" bind:checked={createForm.eligibility} />
          Eligibility
        </label>
      </div>
    </div>

    <Dialog.Footer class="mt-6">
      <Button
        type="button"
        variant="outline"
        disabled={creating}
        onclick={() => {
          createOpen = false;
          createError = null;
        }}
      >
        Cancel
      </Button>
      <Button
        onclick={createStartup}
        disabled={creating || !createForm.name}
        class="gap-2"
      >
        {#if creating}
          <Loader2 class="h-4 w-4 animate-spin" />
        {/if}
        Create Startup
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Edit Startup Modal -->
<Dialog.Root bind:open={editOpen} onOpenChange={(open) => { if (!open && saving) return; editOpen = open; }}>
  <Dialog.Content class="sm:max-w-lg">
    <Dialog.Header>
      <Dialog.Title>Edit Startup</Dialog.Title>
      <Dialog.Description class="pt-2">
        Update startup information for <span class="text-foreground font-semibold">{toEdit?.name}</span>
      </Dialog.Description>
    </Dialog.Header>

    {#if error}
      <div class="rounded-md bg-red-50 p-3 text-sm text-red-600">
        {error}
      </div>
    {/if}

    <div class="space-y-4 pt-4">
      <div class="grid gap-2">
        <Label for="edit-name">Name</Label>
        <Input id="edit-name" bind:value={editForm.name} />
      </div>

      <div class="grid gap-2">
        <Label for="edit-owner">Owner</Label>
        <Select.Root type="single" bind:value={editForm.userId}>
          <Select.Trigger id="edit-owner">
            {editForm.userId ? users.find((u: any) => String(u.id) === editForm.userId)?.email || 'Select owner' : 'Select owner'}
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="">No owner</Select.Item>
            {#each users as u}
              <Select.Item value={String(u.id)}>{u.email}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="edit-group">Group Name</Label>
          <Input id="edit-group" bind:value={editForm.groupName} />
        </div>
        <div class="grid gap-2">
          <Label for="edit-university">University</Label>
          <Input id="edit-university" bind:value={editForm.universityName} />
        </div>
      </div>

      <div class="grid gap-2">
        <Label for="edit-links">Links</Label>
        <Input id="edit-links" bind:value={editForm.links} />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" bind:checked={editForm.dataPrivacy} />
          Data Privacy
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" bind:checked={editForm.eligibility} />
          Eligibility
        </label>
      </div>
    </div>

    <Dialog.Footer class="mt-6">
      <Button
        type="button"
        variant="outline"
        disabled={saving}
        onclick={() => {
          editOpen = false;
          toEdit = null;
          error = null;
        }}
      >
        Cancel
      </Button>
      <Button onclick={saveStartup} disabled={saving} class="gap-2">
        {#if saving}
          <Loader2 class="h-4 w-4 animate-spin" />
        {/if}
        Save Changes
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Delete Startup Modal -->
<Dialog.Root bind:open={deleteOpen} onOpenChange={(open) => { if (!open && deleting) return; deleteOpen = open; }}>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>Delete Startup</Dialog.Title>
      <Dialog.Description class="pt-2">
        Are you sure you want to delete <span class="font-semibold text-foreground">{toDelete?.name}</span>? This action cannot be undone.
      </Dialog.Description>
    </Dialog.Header>
    <form method="post" action="?/delete" onsubmit={() => (deleting = true)}>
      <input type="hidden" name="id" value={toDelete?.id} />
      <div class="flex justify-end gap-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          disabled={deleting} 
          onclick={() => { if (!deleting) { toDelete = null; deleteOpen = false; } }}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="destructive" 
          disabled={deleting}
          class="gap-2"
        >
          {#if deleting}
            <Loader2 class="h-4 w-4 animate-spin" />
          {:else}
            <Trash2 class="h-4 w-4" />
          {/if}
          Delete Startup
        </Button>
      </div>
    </form>
  </Dialog.Content>
</Dialog.Root>
