<script lang="ts">
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';
  import { cubicInOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { access } from '$lib/access';
  import { UserRound, KeyRound, Palette } from 'lucide-svelte';
  import type { LayoutData } from './$types';

  let { children, data }: { children: any; data: LayoutData } = $props();

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut
  });
  let modules = access.roles[`${data.user.role as 'Startup' | 'Mentor' | 'Manager'}`].modules;

  const currentModule = $derived(
    $page.url.pathname.slice(1).split('/')[$page.url.pathname.slice(1).split('/').length - 1]
  );

  const module = $derived($page.url.pathname.slice(1).split('/')[0]);
</script>

<div class="flex items-center justify-between">
  <div>
    <h2 class="text-3xl font-bold">Settings</h2>
    <p class="text-muted-foreground">Manage your account</p>
  </div>
</div>

<div class="mt-5 grid w-full grid-cols-[250px_1fr] gap-14">
  <nav class="flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
    {#each modules.filter((item) => item.link === module)[0].subModule as item}
      {@const isActive = currentModule === item.link}

      <a href={`/account/${item.link}`} class="w-full">
        <Button
          variant="ghost"
          class={cn(
            !isActive && 'w-full hover:underline',
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
            {#if item.link === 'profile'}
              <UserRound class="h-4 w-4" />
            {:else if item.link === 'appearance'}
              <Palette class="h-4 w-4" />
            {:else}
              <KeyRound class="h-4 w-4" />
            {/if}
            {item.name}
          </div>
        </Button>
      </a>
    {/each}
    <!-- <a href="/account_settings/profile" class="rounded-lg bg-secondary p-2 px-4 font-semibold text-primary" class:font-semibold={currentPage === 'profile'}> Profile </a>
		<a href="/account_settings/appearance" class="rounded-lg p-2 px-4 hover:bg-secondary/80" class:font-semibold={currentPage === 'appearance'}>Appearance</a>
		<a href="/account_settings/password" class="rounded-lg p-2 px-4 hover:bg-secondary/80" class:font-semibold={currentPage === 'password'}>Change Password</a> -->
  </nav>
  {@render children()}
</div>
