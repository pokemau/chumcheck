<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Badge } from '$lib/components/ui/badge';
  import { getProfileColor } from '$lib/utils';
  const { user } = $props();
  const p = $derived($page);
  const current = $derived(p.url.pathname.split('/')[2] || 'dashboard');
  const links = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Users', href: '/admin/users' },
    { name: 'Startups', href: '/admin/startups' },
    { name: 'Assessments', href: '/admin/assessments' }
  ];
</script>

<header class="fixed top-0 left-0 z-20 flex h-14 w-full items-center border-b bg-background/80 backdrop-blur">
  <nav class="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
    <div class="flex items-center gap-4">
      <a href="/admin" class="text-lg font-bold">Admin</a>
      <ul class="flex items-center gap-6 text-sm">
        {#each links as l}
          <li>
            <a href={l.href} class="hover:text-flutter-blue {current.toLowerCase() === l.name.toLowerCase() ? 'text-flutter-blue font-medium' : ''}">{l.name}</a>
          </li>
        {/each}
      </ul>
    </div>
    <div class="flex items-center gap-4">
      <Badge variant="outline" class="h-8 rounded-full bg-flutter-gray/20 text-sm font-normal">{user.role}</Badge>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div class={`flex h-9 w-9 items-center justify-center rounded-full ${getProfileColor(user.firstName)}`}>
            {user.firstName?.charAt(0) ?? '?'}
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Group>
            <DropdownMenu.Label>
              <p>Admin</p>
              <p class="text-xm font-normal">{user?.email}</p>
            </DropdownMenu.Label>
            <DropdownMenu.Separator />
            <a href="/startups"><DropdownMenu.Item>Switch to App</DropdownMenu.Item></a>
            <form action="/logout" method="post" class="w-full">
              <button type="submit" class="w-full" aria-label="Logout">
                <DropdownMenu.Item class="cursor-pointer">Logout</DropdownMenu.Item>
              </button>
            </form>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </nav>
</header>

<div class="h-14"></div>
