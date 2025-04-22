<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import type { Role } from '$lib/types';
  import { Plus } from 'lucide-svelte';
  let {
    children,
    name,
    showDialog,
    updateStatus,
    statusId,
    role
  }: {
    children: any;
    name: string;
    showDialog: any;
    updateStatus: any;
    statusId: number;
    role: Role;
  } = $props();
</script>

<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]">
  <Card.Header>
    <div class="flex h-4 items-center justify-between">
      <h2 class="text-[15px] font-semibold leading-none tracking-tight">{name}</h2>
      {#if role !== 'Startup'}
        <button
          onclick={() => {
            showDialog();
            updateStatus(statusId);
          }}
        >
          <Plus class="h-4 w-4" />
        </button>
      {/if}
    </div>
  </Card.Header>
  <Card.Content class="flex h-[700px] flex-col gap-3 overflow-scroll">
    {@render children()}
  </Card.Content>
</Card.Root>
