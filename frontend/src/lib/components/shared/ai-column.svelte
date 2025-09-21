<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Loader, Sparkles } from 'lucide-svelte';
  let { children, name, role }: { children: any; name: string; role: any } =
    $props();
</script>

<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]">
  <Card.Header>
    <div class="flex h-4 items-center justify-between">
      <h2 class="text-[15px] font-semibold leading-none tracking-tight">
        {name}
      </h2>
    </div>
  </Card.Header>
  <Card.Content class="flex h-[700px] flex-col gap-3 overflow-auto">
    {@render children()}
  </Card.Content>
</Card.Root>
