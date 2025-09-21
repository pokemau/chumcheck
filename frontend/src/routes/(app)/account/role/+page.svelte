<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Switch } from '$lib/components/ui/switch/index.js';
  import { page } from '$app/state';
  import { toast } from 'svelte-sonner';

  let { data } = $props();
  let { isMentorRole } = data;

  let mentorRole = $state(false);

  $effect(() => {
    if (isMentorRole === 'yes') {
      mentorRole = true;
    }
  });

  $effect(() => {
    const success = page.url.searchParams.get('success');

    if (success === 'true') {
      toast.success('You are now in mentor view.');
      const url = new URL(page.url.href);
      url.searchParams.delete('success');
      history.replaceState(null, '', url);
    }
  });
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Manage Role</Card.Title>
    <Card.Description>Manage your account role.</Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="flex items-center space-x-2">
      <Switch id="airplane-mode" bind:checked={mentorRole} />
      <Label for="airplane-mode">Enable mentor role</Label>
    </div>
  </Card.Content>
  <Card.Footer class="border-t px-6 py-4">
    <form method="post">
      <input type="hidden" name="mentorRole" bind:value={mentorRole} />
      <Button size="sm" type="submit">Update</Button>
    </form>
  </Card.Footer>
</Card.Root>
