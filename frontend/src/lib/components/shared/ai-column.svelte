<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Loader, Sparkles } from 'lucide-svelte';
  let {
    children,
    name,
    generate,
    role
  }: { children: any; name: string; generate: any; role: any } = $props();

  let generating = $state(false);
</script>

<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]">
  <Card.Header>
    <div class="flex h-4 items-center justify-between">
      <h2 class="text-[15px] font-semibold leading-none tracking-tight">{name}</h2>
      {#if role !== 'Startup'}
        <button
          onclick={async () => {
            generating = true;
            await generate(name);
            generating = false;
          }}
        >
          {#if generating}
            <Loader class="h-4 w-4 animate-spin text-flutter-blue" />
          {:else}
            <Sparkles class="h-4 w-4 text-flutter-blue" />
          {/if}
        </button>
      {/if}
    </div>
  </Card.Header>
  <Card.Content class="flex h-[700px] flex-col gap-3 overflow-auto">
    {@render children()}
  </Card.Content>
</Card.Root>
