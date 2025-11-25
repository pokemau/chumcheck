<script lang="ts">
  import { onMount } from 'svelte';

  import { toggleMode } from 'mode-watcher';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Sun, Moon } from 'lucide-svelte';

  let isBlurred = false;

  function handleScroll() {
    const scrollY = window.scrollY;

    isBlurred = scrollY > 100;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<header
  class="fixed left-1/2 top-0 z-10 flex h-16 w-screen -translate-x-1/2 justify-center transition-all duration-300 ease-in-out"
  class:border-b={isBlurred}
  class:backdrop-blur-lg={isBlurred}
>
  <nav
    class="flex h-16 w-4/5 items-center p-[var(--navbar-padding,0.5rem)] px-0"
  >
    <div class="flex flex-1 cursor-pointer gap-2">
      <!-- <img src="/logo.png" alt="citeams_logo" class="h-7 w-7" /> -->
      <a href="/" class="cursor-pointer text-xl font-black normal-case"
        >LaunchUp</a
      >
    </div>
    <div class="flex-none font-medium">
      <ul class="flex flex-1 cursor-pointer items-center gap-7 text-[15px]">
        <li class="hover:text-flutter-blue active:scale-95">
          <a href="#hero">Home</a>
        </li>
        <li class="hover:text-flutter-blue active:scale-95">
          <a href="#howitwork">How it Works</a>
        </li>
        <li class="hover:text-flutter-blue active:scale-95">
          <a href="#aboutus">About Us</a>
        </li>
        <li class="hover:text-flutter-blue active:scale-95">
          <a data-sveltekit-reload href="/login">Login</a>
        </li>
        <li>
          <Button
            onclick={toggleMode}
            variant="ghost"
            size="icon"
            class="hover:text-flutter-blue hover:bg-transparent"
          >
            <Sun
              class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <Moon
              class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>
        </li>
      </ul>
    </div>
  </nav>
</header>
