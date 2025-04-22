<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { cn } from '$lib/utils';
  import { cubicInOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { access } from '$lib/access';
  import { page } from '$app/stores';

  const { data, children } = $props();
  const { role } = data;

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut
  });
  const currentModule = $derived(
    $page.url.pathname.slice(1).split('/')[$page.url.pathname.slice(1).split('/').length - 1]
  );

  const modules =
    access.roles[`${data.user?.role as 'Startup' | 'Mentor' | 'Manager'}`].modules[0].subModule[6]
      .subModule;

  console.log(role);
</script>

<Card.Root class="h-full">
  <Card.Header>
    <Card.Title class="text-xl">Startup Settings</Card.Title>
    <Card.Description>Manage your startup</Card.Description>
  </Card.Header>
  <Card.Content class="mt-1 grid w-full grid-cols-[250px_1fr] gap-10">
    <div class="grid w-full grid-cols-[250px_1fr] gap-14">
      <nav class="flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
        {#each modules as item}
          {@const isActive = currentModule === item.link}
          <a href={`/startups/${data.startupId}/overview/${item.link}`} class="w-full">
            <Button
              variant="ghost"
              class={cn(
                'w-full hover:underline',
                'relative w-full justify-start hover:bg-transparent'
              )}
              data-sveltekit-noscroll
            >
              {#if isActive}
                <div
                  class="absolute inset-0 rounded-md bg-muted"
                  in:send={{ key: 'active-sidebar-tab' }}
                  out:receive={{ key: 'active-sidebar-tab' }}
                ></div>
              {/if}
              <div class="relative flex items-center justify-center gap-3">
                <!-- {#if item.link === 'profile'}
                  <UserRound class="h-4 w-4" />
                {:else if item.link === 'appearance'}
                  <Palette class="h-4 w-4" />
                {:else}
                  <KeyRound class="h-4 w-4" />
                {/if} -->
                {item.name}
              </div>
            </Button>
          </a>
        {/each}
        <!-- <a href="/account_settings/profile" class="rounded-lg bg-secondary p-2 px-4 font-semibold text-primary" class:font-semibold={currentPage === 'profile'}> Profile </a>
        <a href="/account_settings/appearance" class="rounded-lg p-2 px-4 hover:bg-secondary/80" class:font-semibold={currentPage === 'appearance'}>Appearance</a>
        <a href="/account_settings/password" class="rounded-lg p-2 px-4 hover:bg-secondary/80" class:font-semibold={currentPage === 'password'}>Change Password</a> -->
      </nav>
    </div>
    {@render children()}
  </Card.Content>
</Card.Root>
