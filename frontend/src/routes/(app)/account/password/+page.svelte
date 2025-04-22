<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label/index.js';
  let currentPassword = '';
  let newPassword = '';
</script>

<svelte:head>
  <title>Account - Password</title>
</svelte:head>
<Card.Root>
  <Card.Header>
    <Card.Title>Change Password</Card.Title>
    <Card.Description>Manage your personal information.</Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="grid grid-cols-2 gap-4">
      <div class="grid gap-2">
        <Label for="oldPassword">Current Password</Label>
        <Input name="oldPassword" id="oldPassword" type="password" required />
      </div>
      <div class="grid gap-2">
        <Label for="newPassword">New Password</Label>
        <Input name="newPassword" id="newPassword" type="password" required />
      </div>
    </div>
  </Card.Content>
  <Card.Footer class="border-t px-6 py-4">
    <Button size="sm">Update</Button>
  </Card.Footer>
</Card.Root>
