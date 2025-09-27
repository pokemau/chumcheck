<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog';
  import { enhance } from '$app/forms';

  export let data: { user: any };
  let form = {
    email: data.user?.email ?? '',
    firstName: data.user?.firstName ?? '',
    lastName: data.user?.lastName ?? '',
    role: data.user?.role ?? 'Startup',
    password: ''
  };
  let open = false;
  let saving = false;
  let error: string | null = null;

  function onSubmit({ result }: any) {
    saving = false;
    if (result.type === 'failure') {
      error = (result.data && result.data.message) || 'Failed to update user';
    } else if (result.type === 'success') {
      window.location.href = '/admin/users';
    }
  }
</script>

<h1 class="mb-4 text-2xl font-semibold">Edit User</h1>
<Card.Root class="rounded-md">
  <Card.Content class="space-y-4 p-4">
    {#if error}<p class="text-red-500">{error}</p>{/if}

    <form id="edit-user-form" method="post" action="?/save" use:enhance={(opts) => {
      saving = true;
      return ({ result }) => onSubmit({ result });
    }} class="space-y-4">
      <div class="grid gap-1.5">
        <Label for="email">Email</Label>
        <Input id="email" name="email" placeholder="Email" bind:value={form.email} />
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="grid gap-1.5">
          <Label for="firstName">First name</Label>
          <Input id="firstName" name="firstName" placeholder="First name" bind:value={form.firstName} />
        </div>
        <div class="grid gap-1.5">
          <Label for="lastName">Last name</Label>
          <Input id="lastName" name="lastName" placeholder="Last name" bind:value={form.lastName} />
        </div>
      </div>

      <div class="grid gap-1.5">
        <Label for="role">Role</Label>
        <select id="role" name="role" class="rounded-md border bg-background p-2" bind:value={form.role}>
          <option>Startup</option>
          <option>Mentor</option>
          <option>Manager</option>
        </select>
      </div>

      <div class="grid gap-1.5">
        <Label for="password">New password (optional)</Label>
        <Input id="password" name="password" type="password" placeholder="New password" bind:value={form.password} />
      </div>

      <div class="pt-2">
        <Button type="button" onclick={() => (open = true)} disabled={saving} class="inline-flex items-center gap-2">
          {#if saving}
            <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
          {/if}
          Save changes
        </Button>
      </div>
    </form>

    <Dialog.Root bind:open>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Apply changes?</Dialog.Title>
          <Dialog.Description>
            Confirm updating this user. You can’t undo this action.
          </Dialog.Description>
        </Dialog.Header>
        <div class="flex justify-end gap-2 pt-4">
          <Dialog.Close type="button" class="rounded-md border px-3 py-2 text-sm" disabled={saving}>Cancel</Dialog.Close>
          <button type="submit" form="edit-user-form" class="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90 disabled:opacity-60" disabled={saving}>
            {#if saving}
              <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
            {/if}
            Confirm
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>

    <div class="mt-6">
      <a href="/admin" class="text-sm text-flutter-blue hover:underline">Back to dashboard</a>
    </div>
  </Card.Content>
</Card.Root>
