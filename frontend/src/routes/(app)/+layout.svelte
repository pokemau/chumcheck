<script lang="ts">
  import { Header } from '$lib/components/shared';
  import { onMount, onDestroy } from 'svelte';

  let { children, data } = $props();
  let scrollContainer: HTMLDivElement | null = null;

  function handleScroll() {}

  onMount(() => {
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
  });

  onDestroy(() => {
    if (scrollContainer) {
      scrollContainer.removeEventListener('scroll', handleScroll);
    }
  });
</script>

<div class="flex h-full flex-col overflow-x-hidden">
  <div
    class="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#ecf3fc_1px,transparent_1px)] [background-size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#171e31_1px,transparent_1px)]"
  ></div>
  <Header user={data.user} startup={data.startup} {scrollContainer} />
  <div class="mx-auto my-5 flex h-full w-4/5 flex-col">
    <div class="min-h-14"></div>
    <div bind:this={scrollContainer} class="flex-1" style="height: 100%;">
      {@render children()}
    </div>
  </div>
</div>
