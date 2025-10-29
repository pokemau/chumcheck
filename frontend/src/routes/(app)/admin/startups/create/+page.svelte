<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';

  // Use Svelte 5 props API for reliability
  const { data } = $props<{ data: { users: Array<{ id: number; email: string }> } }>();

  let saving = false;
  let error: string | null = null;
  let formEl: HTMLFormElement | null = null;

  let name = '';
  let userId = '';
  let groupName = '';
  let universityName = '';
  let links = '';
  let dataPrivacy = false;
  let eligibility = false;

  // Required by backend DTO, default to PENDING
  let qualificationStatus = 'PENDING';
</script>

<svelte:head><title>Create Startup</title></svelte:head>

<h1 class="mb-4 text-2xl font-semibold">Create Startup</h1>
<Card.Root class="rounded-md">
  <Card.Content class="space-y-4 p-4">
    {#if error}<p class="text-red-500">{error}</p>{/if}

    <Dialog.Root>
      <form bind:this={formEl} id="create-startup-form" method="post" action="?/create" on:submit={() => (saving = true)} class="grid gap-3">
        <button type="submit" class="hidden" tabindex="-1" aria-hidden="true"></button>
        <input type="hidden" name="qualificationStatus" value={qualificationStatus} />
        <div class="grid gap-1.5">
          <Label for="name">Name</Label>
          <Input id="name" name="name" placeholder="Name" required bind:value={name} />
        </div>
        <div class="grid gap-1.5">
          <Label for="owner">Owner</Label>
          <select id="owner" name="userId" class="rounded-md border bg-background p-2" required bind:value={userId}>
            <option value="" disabled selected>Select owner</option>
            {#each data.users as u}<option value={u.id}>{u.email}</option>{/each}
          </select>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="grid gap-1.5">
            <Label for="group">Group</Label>
            <Input id="group" name="groupName" placeholder="Group" bind:value={groupName} />
          </div>
          <div class="grid gap-1.5">
            <Label for="university">University</Label>
            <Input id="university" name="universityName" placeholder="University" bind:value={universityName} />
          </div>
        </div>
        <div class="grid gap-1.5">
          <Label for="links">Links</Label>
          <Input id="links" name="links" placeholder="Links" bind:value={links} />
        </div>
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
          <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="dataPrivacy" bind:checked={dataPrivacy} /> Data privacy</label>
          <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="eligibility" bind:checked={eligibility} /> Eligibility</label>
        </div>
        <div class="pt-2">
          <Dialog.Trigger>
            <Button type="button" disabled={saving} class="inline-flex items-center gap-2">
              {#if saving}
                <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
              {/if}
              {saving ? 'Saving…' : 'Create'}
            </Button>
          </Dialog.Trigger>
        </div>
      </form>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Create startup?</Dialog.Title>
          <Dialog.Description>Confirm creating this startup.</Dialog.Description>
        </Dialog.Header>
        <div class="flex justify-end gap-2 pt-4">
          <Dialog.Close type="button" class="rounded-md border px-3 py-2 text-sm" disabled={saving}>Cancel</Dialog.Close>
          <button type="button" class="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90 disabled:opacity-60" disabled={saving} on:click={() => { (formEl as HTMLFormElement)?.requestSubmit(); }}>
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
