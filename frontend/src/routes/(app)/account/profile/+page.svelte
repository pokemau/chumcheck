<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label/index.js';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:head>
  <title>Account - Profile</title>
</svelte:head>
<Card.Root>
  <Card.Header>
    <Card.Title>Profile</Card.Title>
    <Card.Description>Manage your personal information.</Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="grid grid-cols-2 gap-4">
      <div class="grid gap-2">
        <Label for="firstName">First Name</Label>
        <Input
          name="firstName"
          id="firstName"
          type="firstName"
          required
          value={data.user.firstName}
          readonly
        />
      </div>
      <div class="grid gap-2">
        <Label for="lastName">Last Name</Label>
        <Input
          name="lastName"
          id="lastName"
          type="lastName"
          required
          value={data.user.lastName}
          readonly
        />
      </div>
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input
          name="email"
          id="email"
          type="email"
          value={data.user.email}
          required
          readonly
        />
      </div>
    </div>
  </Card.Content>
  <Card.Footer class="border-t px-6 py-4">
    <Button size="sm">Update</Button>
  </Card.Footer>
</Card.Root>
