<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';

  let saving = false;
  let error: string | null = null;
  let email = '';
  let password = '';
  let firstName = '';
  let lastName = '';
  let role = 'Startup';
  let formEl: HTMLFormElement | null = null;
</script>

<h1 class="mb-4 text-2xl font-semibold">Create User</h1>
<Card.Root class="rounded-md">
  <Card.Content class="space-y-4 p-4">
    {#if error}<p class="text-red-500">{error}</p>{/if}

    <Dialog.Root>
      <form bind:this={formEl} id="create-user-form" method="post" action="?/create" on:submit={() => (saving = true)} class="grid gap-3">
        <button type="submit" class="hidden" tabindex="-1" aria-hidden="true"></button>
        <div class="grid gap-1.5">
          <Label for="email">Email</Label>
          <Input id="email" name="email" placeholder="Email" required bind:value={email} />
        </div>
        <div class="grid gap-1.5">
          <Label for="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="Password" required bind:value={password} />
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="grid gap-1.5">
            <Label for="firstName">First name</Label>
            <Input id="firstName" name="firstName" placeholder="First name" bind:value={firstName} />
          </div>
          <div class="grid gap-1.5">
            <Label for="lastName">Last name</Label>
            <Input id="lastName" name="lastName" placeholder="Last name" bind:value={lastName} />
          </div>
        </div>
        <div class="grid gap-1.5">
          <Label for="role">Role</Label>
          <select id="role" name="role" class="rounded-md border bg-background p-2" bind:value={role}>
            <option>Startup</option>
            <option>Mentor</option>
            <option>Manager</option>
          </select>
        </div>
        <div class="pt-2">
          <Dialog.Trigger asChild>
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
          <Dialog.Title>Create user?</Dialog.Title>
          <Dialog.Description>Confirm creating this user.</Dialog.Description>
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
  </Card.Content>
</Card.Root>
<div class="mt-6">
  <a href="/admin" class="text-sm text-flutter-blue hover:underline">Back to dashboard</a>
</div>
