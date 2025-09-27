<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';

  export let data: { startups: Array<any> };
  let startups = data.startups;
  let toDelete: any = null;
  let open = false;
  let deleting = false;

  function onSuccess() {
    startups = startups.filter((s) => s.id !== toDelete?.id);
    open = false;
    toDelete = null;
  }
</script>

<div class="mb-4 flex items-center justify-between">
  <h1 class="text-2xl font-semibold">Startups</h1>
  <a data-sveltekit-preload-data="tap" href="/admin/startups/create" class="rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90">Create startup</a>
</div>
<div class="overflow-hidden rounded-md border bg-background">
  <div class="border-b p-4 font-medium">All Startups</div>
  <div class="p-4">
    <table class="w-full table-auto text-sm">
      <thead>
        <tr class="text-left">
          <th class="p-2">ID</th>
          <th class="p-2">Name</th>
          <th class="p-2">Owner</th>
          <th class="p-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each startups as s}
          <tr class="border-t">
            <td class="p-2">{s.id}</td>
            <td class="p-2">{s.name}</td>
            <td class="p-2">{s.user?.email}</td>
            <td class="p-2 text-right">
              <a class="text-flutter-blue hover:underline" data-sveltekit-preload-data="tap" href={`/admin/startups/edit/${s.id}`}>Edit</a>
              <button class="ml-3 text-red-600 hover:underline" on:click={() => { toDelete = s; open = true; }}>Delete</button>
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
      <Dialog.Title>Delete startup?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete {toDelete?.name}.
      </Dialog.Description>
    </Dialog.Header>
    <form method="post" action="?/delete" on:submit={() => (deleting = true)}>
      <input type="hidden" name="id" value={toDelete?.id} />
      <div class="flex justify-end gap-2 pt-4">
        <Dialog.Close type="button" class="rounded-md border px-3 py-2 text-sm" disabled={deleting} on:click={() => { if (!deleting) { toDelete = null; } }}>Cancel</Dialog.Close>
        <button class="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-60" disabled={deleting} type="submit">
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
