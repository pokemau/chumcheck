<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import * as Select from '$lib/components/ui/select';
  import { Plus, Edit2, Trash2, Users, Loader2 } from 'lucide-svelte';
  import { PUBLIC_API_URL } from '$env/static/public';

  let { data } = $props<{ data: { users: Array<any>; access: string } }>();
  let users = $state(data.users);
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
    email: '',
    firstName: '',
    lastName: '',
    role: 'Startup'
  });

  let createForm = $state({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'Startup'
  });

  function openCreateModal() {
    createForm = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: 'Startup'
    };
    createError = null;
    createOpen = true;
  }

  async function createUser() {
    creating = true;
    createError = null;

    try {
      const res = await fetch(`${PUBLIC_API_URL}/admin/users/create-json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.access}`
        },
        body: JSON.stringify(createForm)
      });

      if (!res.ok) {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          createError = json.message || text || 'Failed to create user';
        } catch {
          createError = text || 'Failed to create user';
        }
        creating = false;
        return;
      }

      // Add new user to local list
      const result = await res.json();
      if (result.user) {
        users = [...users, result.user];
      }

      createOpen = false;
    } catch (e) {
      createError = 'Failed to create user';
    } finally {
      creating = false;
    }
  }

  function openEditModal(user: any) {
    toEdit = user;
    editForm = {
      email: user.email ?? '',
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      role: user.role ?? 'Startup'
    };
    error = null;
    editOpen = true;
  }

  async function saveUser() {
    if (!toEdit) return;
    saving = true;
    error = null;

    try {
      const res = await fetch(
        `${PUBLIC_API_URL}/admin/users/edit-json/${toEdit.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.access}`
          },
          body: JSON.stringify(editForm)
        }
      );

      if (!res.ok) {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          error = json.message || text || 'Failed to update user';
        } catch {
          error = text || 'Failed to update user';
        }
        saving = false;
        return;
      }

      // Update local users list
      const updated = await res.json();
      users = users.map((u: any) =>
        u.id === toEdit.id ? { ...u, ...editForm } : u
      );

      editOpen = false;
      toEdit = null;
    } catch (e) {
      error = 'Failed to update user';
    } finally {
      saving = false;
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'default';
      case 'Manager':
        return 'secondary';
      case 'Mentor':
        return 'outline';
      case 'Startup':
        return 'outline';
      default:
        return 'outline';
    }
  };
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Users</h1>
      <p class="mt-1 text-sm text-muted-foreground">
        Manage user accounts and permissions
      </p>
    </div>
    <Button onclick={openCreateModal} class="gap-2">
      <Plus class="h-4 w-4" />
      Create User
    </Button>
  </div>

  <div class="rounded-lg border bg-card shadow-sm">
    <div
      class="bg-muted/50 flex items-center justify-between border-b px-6 py-4"
    >
      <h2 class="font-semibold">All Users</h2>
      {#if users.length}
        <span class="text-xs text-muted-foreground"
          >{users.length} {users.length === 1 ? 'user' : 'users'}</span
        >
      {/if}
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-muted/30 border-b">
            <th class="px-6 py-3 text-left font-medium">ID</th>
            <th class="px-6 py-3 text-left font-medium">Email</th>
            <th class="px-6 py-3 text-left font-medium">Name</th>
            <th class="px-6 py-3 text-left font-medium">Role</th>
            <th class="px-6 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each users as u}
            <tr class="hover:bg-muted/50 group border-b transition-colors">
              <td class="px-6 py-4 font-mono text-xs text-muted-foreground"
                >{u.id}</td
              >
              <td class="px-6 py-4">{u.email}</td>
              <td class="px-6 py-4"
                >{(u.firstName ?? '') + ' ' + (u.lastName ?? '')}</td
              >
              <td class="px-6 py-4">
                <Badge variant={getRoleBadgeVariant(u.role)}>{u.role}</Badge>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    onclick={() => openEditModal(u)}
                    class="text-flutter-blue hover:bg-flutter-blue/10 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
                  >
                    <Edit2 class="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                    onclick={() => {
                      toDelete = u;
                      deleteOpen = true;
                    }}
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

<!-- Create User Modal -->
<Dialog.Root
  bind:open={createOpen}
  onOpenChange={(open) => {
    if (!open && creating) return;
    createOpen = open;
  }}
>
  <Dialog.Content class="sm:max-w-lg">
    <Dialog.Header>
      <Dialog.Title>Create New User</Dialog.Title>
      <Dialog.Description class="pt-2">
        Add a new user to the system
      </Dialog.Description>
    </Dialog.Header>

    {#if createError}
      <div class="rounded-md bg-red-50 p-3 text-sm text-red-600">
        {createError}
      </div>
    {/if}

    <div class="space-y-4 pt-4">
      <div class="grid gap-2">
        <Label for="create-email">Email *</Label>
        <Input
          id="create-email"
          type="email"
          required
          bind:value={createForm.email}
        />
      </div>

      <div class="grid gap-2">
        <Label for="create-password">Password *</Label>
        <Input
          id="create-password"
          type="password"
          required
          bind:value={createForm.password}
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="create-firstName">First Name</Label>
          <Input id="create-firstName" bind:value={createForm.firstName} />
        </div>
        <div class="grid gap-2">
          <Label for="create-lastName">Last Name</Label>
          <Input id="create-lastName" bind:value={createForm.lastName} />
        </div>
      </div>

      <div class="grid gap-2">
        <Label for="create-role">Role</Label>
        <Select.Root type="single" bind:value={createForm.role}>
          <Select.Trigger id="create-role">
            {createForm.role}
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="Startup">Startup</Select.Item>
            <Select.Item value="Mentor">Mentor</Select.Item>
            <Select.Item value="Manager">Manager</Select.Item>
            <Select.Item value="Admin">Admin</Select.Item>
          </Select.Content>
        </Select.Root>
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
        onclick={createUser}
        disabled={creating || !createForm.email || !createForm.password}
        class="gap-2"
      >
        {#if creating}
          <Loader2 class="h-4 w-4 animate-spin" />
        {/if}
        Create User
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Edit User Modal -->
<Dialog.Root
  bind:open={editOpen}
  onOpenChange={(open) => {
    if (!open && saving) return;
    editOpen = open;
  }}
>
  <Dialog.Content class="sm:max-w-lg">
    <Dialog.Header>
      <Dialog.Title>Edit User</Dialog.Title>
      <Dialog.Description class="pt-2">
        Update user information for <span class="font-semibold text-foreground"
          >{toEdit?.email}</span
        >
      </Dialog.Description>
    </Dialog.Header>

    {#if error}
      <div class="rounded-md bg-red-50 p-3 text-sm text-red-600">
        {error}
      </div>
    {/if}

    <div class="space-y-4 pt-4">
      <div class="grid gap-2">
        <Label for="edit-email">Email</Label>
        <Input id="edit-email" type="email" bind:value={editForm.email} />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="edit-firstName">First Name</Label>
          <Input id="edit-firstName" bind:value={editForm.firstName} />
        </div>
        <div class="grid gap-2">
          <Label for="edit-lastName">Last Name</Label>
          <Input id="edit-lastName" bind:value={editForm.lastName} />
        </div>
      </div>

      <div class="grid gap-2">
        <Label for="edit-role">Role</Label>
        <Select.Root type="single" bind:value={editForm.role}>
          <Select.Trigger id="edit-role">
            {editForm.role}
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="Startup">Startup</Select.Item>
            <Select.Item value="Mentor">Mentor</Select.Item>
            <Select.Item value="Manager">Manager</Select.Item>
            <Select.Item value="Admin">Admin</Select.Item>
          </Select.Content>
        </Select.Root>
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
      <Button onclick={saveUser} disabled={saving} class="gap-2">
        {#if saving}
          <Loader2 class="h-4 w-4 animate-spin" />
        {/if}
        Save Changes
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<!-- Delete User Modal -->
<Dialog.Root
  bind:open={deleteOpen}
  onOpenChange={(open) => {
    if (!open && deleting) return;
    deleteOpen = open;
  }}
>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>Delete User</Dialog.Title>
      <Dialog.Description class="pt-2">
        Are you sure you want to delete <span
          class="font-semibold text-foreground">{toDelete?.email}</span
        >? This action cannot be undone.
      </Dialog.Description>
    </Dialog.Header>
    <form method="post" action="?/delete" onsubmit={() => (deleting = true)}>
      <input type="hidden" name="id" value={toDelete?.id} />
      <div class="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          disabled={deleting}
          onclick={() => {
            if (!deleting) {
              toDelete = null;
              deleteOpen = false;
            }
          }}
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
          Delete User
        </Button>
      </div>
    </form>
  </Dialog.Content>
</Dialog.Root>
