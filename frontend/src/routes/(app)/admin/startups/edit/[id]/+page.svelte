<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';

  export let data: { startup: any };
  let form = {
    name: data.startup?.name ?? '',
    userId: String(data.startup?.user?.id ?? ''),
    groupName: data.startup?.groupName ?? '',
    universityName: data.startup?.universityName ?? '',
    links: data.startup?.links ?? '',
    dataPrivacy: Boolean(data.startup?.dataPrivacy),
    eligibility: Boolean(data.startup?.eligibility)
  };

  let saving = false;
  let error: string | null = null;
  let open = false;

  function onSubmit({ result }: any) {
    saving = false;
    if (result.type === 'failure') {
      error = (result.data && result.data.message) || 'Failed to update startup';
    } else if (result.type === 'success') {
      // Navigate after success; server action returns success only
      window.location.href = '/admin/startups';
    }
  }
</script>

<h1 class="mb-4 text-2xl font-semibold">Edit Startup</h1>
<Card.Root class="rounded-md">
  <Card.Content class="space-y-4 p-4">
    {#if error}<p class="text-red-500">{error}</p>{/if}
    <form id="edit-startup-form" method="post" action="?/save" use:enhance={(opts) => {
      saving = true;
      return ({ result }) => onSubmit({ result });
    }} class="space-y-4">
      <div class="grid gap-1.5">
        <Label for="name">Name</Label>
        <Input id="name" name="name" placeholder="Name" bind:value={form.name} />
      </div>
      <div class="grid gap-1.5">
        <Label for="owner">Owner ID (optional)</Label>
        <Input id="owner" name="userId" placeholder="Owner ID" bind:value={form.userId} />
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="grid gap-1.5">
          <Label for="group">Group</Label>
          <Input id="group" name="groupName" placeholder="Group" bind:value={form.groupName} />
        </div>
        <div class="grid gap-1.5">
          <Label for="university">University</Label>
          <Input id="university" name="universityName" placeholder="University" bind:value={form.universityName} />
        </div>
      </div>
      <div class="grid gap-1.5">
        <Label for="links">Links</Label>
        <Input id="links" name="links" placeholder="Links" bind:value={form.links} />
      </div>
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
        <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="dataPrivacy" bind:checked={form.dataPrivacy}/> Data privacy</label>
        <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="eligibility" bind:checked={form.eligibility}/> Eligibility</label>
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
          <Dialog.Description>Confirm updating this startup. You can’t undo this action.</Dialog.Description>
        </Dialog.Header>
        <div class="flex justify-end gap-2 pt-4">
          <Dialog.Close type="button" class="rounded-md border px-3 py-2 text-sm" disabled={saving}>Cancel</Dialog.Close>
          <button type="submit" form="edit-startup-form" class="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90 disabled:opacity-60" disabled={saving}>
            {#if saving}
              <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
            {/if}
            Confirm
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  </Card.Content>
</Card.Root>

<div class="mt-6">
  <a href="/admin" class="text-sm text-flutter-blue hover:underline">Back to dashboard</a>
</div>
