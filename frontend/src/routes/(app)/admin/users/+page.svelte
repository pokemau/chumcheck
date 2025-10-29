<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import { enhance } from '$app/forms';

  export let data: { users: Array<any> };
  let users = data.users;
  let toDelete: any = null;
  let open = false;
  let deleting = false;
  let errorMsg: string | null = null;

  function onSuccess(id: number) {
    users = users.filter((u) => u.id !== id);
    open = false;
    toDelete = null;
  }
</script>

<div class="mb-4 flex items-center justify-between">
  <h1 class="text-2xl font-semibold">Users</h1>
  <a data-sveltekit-preload-data="tap" href="/admin/users/create" class="rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90">Create user</a>
</div>
<div class="overflow-hidden rounded-md border bg-background">
  <div class="border-b p-4 font-medium">All Users</div>
  <div class="p-4">
    <table class="w-full table-auto text-sm">
      <thead>
        <tr class="text-left">
          <th class="p-2">ID</th>
          <th class="p-2">Email</th>
          <th class="p-2">Name</th>
          <th class="p-2">Role</th>
          <th class="p-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each users as u}
          <tr class="border-t">
            <td class="p-2">{u.id}</td>
            <td class="p-2">{u.email}</td>
            <td class="p-2">{(u.firstName ?? '') + ' ' + (u.lastName ?? '')}</td>
            <td class="p-2">{u.role}</td>
            <td class="p-2 text-right">
              <a class="text-flutter-blue hover:underline" data-sveltekit-preload-data="tap" href={`/admin/users/edit/${u.id}`}>Edit</a>
              <button class="ml-3 text-red-600 hover:underline" on:click={() => { toDelete = u; open = true; }}>Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Delete user?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete {toDelete?.email}.
      </Dialog.Description>
    </Dialog.Header>
    <form method="post" action="?/delete" use:enhance={(submit) => {
      // show spinner immediately on submit
      deleting = true; errorMsg = null;
      return async ({ result, update }) => {
        try {
          if (result.type === 'success') {
            const payload: any = result.data;
            if (payload?.ok && typeof payload.id === 'number') {
              onSuccess(payload.id);
              // ensure UI reflects latest server state
              setTimeout(() => window.location.reload(), 50);
              return;
            }
            await update();
            return;
          }
          if (result.type === 'failure') {
            errorMsg = (result.data?.message as string) || 'Failed to delete user';
            return;
          }
          // handle redirects or other responses via default updater
          await update();
        } finally {
          deleting = false;
        }
      };
    }}>
      <input type="hidden" name="id" value={toDelete?.id} />
      {#if errorMsg}
        <p class="mb-2 text-sm text-red-600">{errorMsg}</p>
      {/if}
      <div class="flex justify-end gap-2 pt-4">
        <Dialog.Close type="button" class="rounded-md border px-3 py-2 text-sm" disabled={deleting} on:click={() => { if (!deleting) { toDelete = null; } }}>Cancel</Dialog.Close>
        <button aria-busy={deleting} class="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-60" disabled={deleting} type="submit">
          {#if deleting}
            <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
          {/if}
          Delete
        </button>
      </div>
    </form>
  </Dialog.Content>
</Dialog.Root>

<div class="mt-6">
  <a href="/admin" class="text-sm text-flutter-blue hover:underline">Back to dashboard</a>
</div>
