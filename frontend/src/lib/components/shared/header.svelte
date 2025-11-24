<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Badge } from '$lib/components/ui/badge';
  import { access } from '$lib/access';
  import { page } from '$app/state';
  import { Separator } from '$lib/components/ui/separator';
  import { crossfade } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { onMount, onDestroy } from 'svelte';
  import { getProfileColor } from '$lib/utils';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';

  const { user, startup, scrollContainer } = $props();

  let dropdownOpen = $state(false);

  function navigateTo(path: string) {
    dropdownOpen = false;
    goto(path);
  }

  const userRole = user.role;
  const modules =
    access.roles[`${userRole as 'Startup' | 'Mentor' | 'Manager'}`].modules;

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

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut
  });

  let isBlurred = $state(false);

  function handleScroll(e?: Event) {
    // Prefer scrollContainer if provided, fallback to window
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
</script>

<header
  class="fixed left-1/2 top-0 z-10 flex h-16 w-screen -translate-x-1/2 justify-center border-b transition-all duration-300"
  class:backdrop-blur-lg={isBlurred}
  style="backdrop-filter: blur(16px);"
>
  <nav class="flex h-16 w-4/5 items-center px-0">
    <div class="flex flex-1 cursor-pointer gap-2">
      <!-- <img src="/logo.png" alt="citeams_logo" class="h-7 w-7" /> -->
      <a
        data-sveltekit-preload-data="tap"
        href={`/${modules[0].link}`}
        class="cursor-pointer text-xl font-black normal-case">LaunchUp</a
      >
    </div>
    <div class="flex h-1/3 items-center justify-center gap-5">
      <ul class="flex flex-1 cursor-pointer items-center gap-7 text-sm">
        {#if module !== subModule && module !== 'account' && subModule !== 'pending'}
          <!-- submodule -->
          {#each modules.filter((item) => item.link === module)[0].subModule as item}
            {@const isActive =
              currentModule === item.link || currentModulev2 === item.link}
            <a
              data-sveltekit-preload-data="tap"
              href={`/${module}/${startup}/${item.link}${item.name === 'Overview' ? `/${item?.subModule[0].link}` : ''}`}
              class="hover:text-flutter-blue relative flex h-16 items-center justify-center text-center active:scale-95"
              class:text-flutter-blue={currentModule === item.link ||
                currentModulev2 === item.link}
            >
              <li>
                {item.name}
                {#if isActive}
                  <div
                    class="absolute bottom-0 h-[1px] w-full bg-primary"
                    in:send={{ key: 'active-sidebar-tab' }}
                    out:receive={{ key: 'active-sidebar-tab' }}
                  ></div>
                {/if}
              </li>
            </a>
          {/each}
        {:else}
          <!-- module -->
          {#each modules as item}
            {@const isActive =
              currentModule === item.link || currentModulev2 === item.link}
            <a
              data-sveltekit-preload-data="tap"
              href={`/${item.link}${item.subModule.length > 0 && item.name !== 'Startups' ? `/${item.subModule[0].link}` : ''}`}
              class="hover:text-flutter-blue relative flex h-16 items-center justify-center text-center active:scale-95"
              class:text-flutter-blue={currentModule === item.link ||
                currentModulev2 === item.link}
            >
              <li>
                {item.name}
                {#if isActive}
                  <div
                    class="absolute bottom-0 h-[1px] w-full bg-primary"
                  ></div>
                {/if}
              </li>
            </a>
          {/each}
        {/if}
      </ul>
      <Separator orientation="vertical" />
      <Badge
        variant="outline"
        class="h-8 rounded-full bg-accent text-sm font-normal"
        >{user?.role ? user?.role : 'Anonymous'}</Badge
      >
      <DropdownMenu.Root bind:open={dropdownOpen}>
        <DropdownMenu.Trigger>
          <div
            class={`flex h-9 w-9 items-center justify-center rounded-full ${getProfileColor(user.firstName)}`}
          >
            {user.firstName.charAt(0)}
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Group>
            <DropdownMenu.Label>
              <p>My Account</p>
              <p class="text-xm font-normal">{user?.email}</p>
            </DropdownMenu.Label>
            <DropdownMenu.Separator />
            {#each modules as module}
              <DropdownMenu.Item
                class="cursor-pointer"
                onclick={() =>
                  navigateTo(
                    `/${module.link}${module.subModule.length > 0 && module.name !== 'Startups' ? `/${module.subModule[0].link}` : ''}`
                  )}
              >
                {module.name}
              </DropdownMenu.Item>
            {/each}
            <form action="/logout" method="post" class="w-full">
              <button type="submit" class="w-full">
                <DropdownMenu.Item class="cursor-pointer"
                  >Logout</DropdownMenu.Item
                >
              </button>
            </form>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </nav>
</header>
