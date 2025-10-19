<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Badge } from '$lib/components/ui/badge';
  import { access } from '$lib/access';
  import { page as pageStore } from '$app/stores';
  import { Separator } from '$lib/components/ui/separator';
  import { crossfade } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { onMount, onDestroy } from 'svelte';
  import { getProfileColor } from '$lib/utils';
  import { browser } from '$app/environment';

  const { user, startup, scrollContainer } = $props();

  const userRole = user.role;
  const modules = (access.roles?.[`${userRole as 'Startup' | 'Mentor' | 'Manager'}`]?.modules ?? []) as Array<any>;

  // Provide a reactive page value compatible with master code
  const page = $derived($pageStore);

  const currentModule = $derived(
    page.url.pathname.slice(1).split('/')[
      page.url.pathname.slice(1).split('/').length - 1
    ]
  );

  const currentModulev2 = $derived(
    page.url.pathname.slice(1).split('/')[
      page.url.pathname.slice(1).split('/').length - 2
    ]
  );

  const module = $derived(page.url.pathname.slice(1).split('/')[0]);
  const subModule = $derived(
    page.url.pathname.slice(1).split('/')[
      page.url.pathname.slice(1).split('/').length - 1
    ]
  );

  const activeModule = $derived(modules.find((m) => m.link === module));

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut
  });

  let isBlurred = $state(false);

  function handleScroll(e?: Event) {
    let scrollY = 0;
    if (scrollContainer) {
      scrollY = scrollContainer.scrollTop;
    } else {
      scrollY = window.scrollY;
    }
    isBlurred = scrollY > 100;
  }

  onMount(() => {
    if (!browser) return;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
    }
  });

  onDestroy(() => {
    if (!browser) return;
    if (scrollContainer) {
      scrollContainer.removeEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  // Hide Applications/Analytics/Account only on admin pages; otherwise show all
  const filteredModules = $derived(
    module === 'admin'
      ? (modules ?? []).filter(
          (m) => m.name !== 'Applications' && m.name !== 'Analytics' && m.name !== 'Account'
        )
      : modules ?? []
  );

  type ModuleItem = { name: string; link: string; subModule?: Array<{ name: string; link: string }>; };
  const displayModules = $derived((): ModuleItem[] => {
    let list = [...(filteredModules ?? [])];
    if (module !== 'admin') {
      if (!list.some((m) => m.name === 'Applications'))
        list = [...list, { name: 'Applications', link: 'applications', subModule: [] } as any];
      if (!list.some((m) => m.name === 'Analytics'))
        list = [...list, { name: 'Analytics', link: 'analytics', subModule: [] } as any];
      if (!list.some((m) => m.name === 'Account'))
        list = [...list, { name: 'Account', link: 'account', subModule: [] } as any];
    }
    return list as ModuleItem[];
  });
  // Create a reactive array value for template iteration
  let modulesToShow = $state<ModuleItem[]>([]);
  $effect(() => { modulesToShow = displayModules(); });
</script>

<header
  class="fixed left-1/2 top-0 z-10 flex h-16 w-screen -translate-x-1/2 justify-center border-b transition-all duration-300"
  class:backdrop-blur-lg={isBlurred}
  style="backdrop-filter: blur(16px);"
>
  <nav class="flex h-16 w-4/5 items-center px-0">
    <div class="flex flex-1 cursor-pointer gap-2">
      <img src="/logo.png" alt="citeams_logo" class="h-7 w-7" />
      <a
        data-sveltekit-preload-data="tap"
        href={`/${modules?.[0]?.link ?? 'admin'}`}
        class="cursor-pointer text-xl font-black normal-case">ChumCheck</a
      >
    </div>
    <div class="flex h-1/3 items-center justify-center gap-5">
      <ul class="flex flex-1 cursor-pointer items-center gap-7 text-sm">
        {#if activeModule && module !== 'account' && subModule !== 'pending' && activeModule.subModule?.length}
          <!-- submodule -->
          {#each activeModule.subModule as item}
            {@const isActive = currentModule === item.link || currentModulev2 === item.link}
            <a
              data-sveltekit-preload-data="tap"
              href={`/${module}/${startup}/${item.link}${item.name === 'Overview' ? `/${item?.subModule?.[0]?.link ?? ''}` : ''}`}
              class="relative flex h-16 items-center justify-center text-center hover:text-flutter-blue active:scale-95"
              class:text-flutter-blue={isActive}
            >
              <li>
                {item.name}
                {#if isActive}
                  <div class="absolute bottom-0 h-[1px] w-full bg-flutter-blue" in:send={{ key: 'active-sidebar-tab' }} out:receive={{ key: 'active-sidebar-tab' }}></div>
                {/if}
              </li>
            </a>
          {/each}
        {:else}
          <!-- module -->
          {#each modulesToShow as item}
            {@const isActive = currentModule === item.link || currentModulev2 === item.link}
            <a
              data-sveltekit-preload-data="tap"
              href={`/${item.link}${(item.subModule && item.subModule.length > 0 && item.name !== 'Startups') ? `/${item.subModule[0]?.link ?? ''}` : ''}`}
              class="relative flex h-16 items-center justify-center text-center hover:text-flutter-blue active:scale-95"
              class:text-flutter-blue={isActive}
            >
              <li>
                {item.name}
                {#if isActive}
                  <div class="absolute bottom-0 h-[1px] w-full bg-flutter-blue"></div>
                {/if}
              </li>
            </a>
          {/each}
        {/if}
      </ul>
      <Separator orientation="vertical" />
      <Badge variant="outline" class="h-8 rounded-full bg-flutter-gray/20 text-sm font-normal">{user?.role ? user?.role : 'Anonymous'}</Badge>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div class={`flex h-9 w-9 items-center justify-center rounded-full ${getProfileColor(user.firstName)}`}>
            {user.firstName?.charAt(0) ?? '?'}
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Group>
            <DropdownMenu.Label>
              <p>My Account</p>
              <p class="text-xm font-normal">{user?.email}</p>
            </DropdownMenu.Label>
            <DropdownMenu.Separator />
            {#each modules as moduleItem}
              <a
                class="cursor-pointer"
                data-sveltekit-preload-data="tap"
                href={`/${moduleItem.link}${moduleItem.subModule?.length > 0 && moduleItem.name !== 'Startups' ? `/${moduleItem.subModule[0].link}` : ''}`}
              >
                <DropdownMenu.Item class="cursor-pointer">{moduleItem.name}</DropdownMenu.Item>
              </a>
            {/each}
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
