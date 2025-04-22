<script lang="ts">
  import * as Card from '$lib/components/ui/card';

  let { children } = $props();
</script>

<div class="relative h-full w-full">
  <div
    class="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#ecf3fc_1px,transparent_1px)] [background-size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#171e31_1px,transparent_1px)]"
  ></div>
  <div class="flex h-screen items-center justify-center">
    <Card.Root
      class="flex h-4/5 w-4/5 items-center justify-center rounded-xl bg-white shadow-lg dark:bg-[#020817]"
    >
      {@render children()}
    </Card.Root>
  </div>
</div>
