<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import type { Role } from '$lib/types';
  let {
    children,
    name,
    itemCount = 0,
    showDialog,
    updateStatus,
    statusId,
    role,
    classNames = ''
  }: {
    children: any;
    name: string;
    itemCount: number;
    showDialog: any;
    updateStatus: any;
    statusId: number;
    role: Role;
    classNames?: string;
  } = $props();
</script>

<Card.Root class={`h-full min-w-0 bg-background border border-gray-700 rounded-xl shadow-sm ${classNames}`}>
  <Card.Header class="flex items-center justify-between px-4 pt-4 pb-2">
    <div class="w-full flex items-center justify-between">
      <h2 class="text-base font-semibold tracking-tight">{name}</h2>
      <span class="text-xs font-semibold border-2 border-sky-600 text-sky-600 bg-blue-950 rounded px-2 py-0.5">{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
    </div>
  </Card.Header>  
  <Card.Content class="flex flex-col gap-3 px-4 pb-4 h-[430px] overflow-y-auto">
    {@render children()}
  </Card.Content>
</Card.Root>
