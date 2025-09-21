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

<Card.Root
  class={`h-full min-w-0 rounded-xl border border-gray-700 bg-background shadow-sm ${classNames}`}
>
  <Card.Header class="flex items-center justify-between px-4 pb-2 pt-4">
    <div class="flex w-full items-center justify-between">
      <h2 class="text-base font-semibold tracking-tight">{name}</h2>
      <span
        class="rounded border-2 border-sky-600 bg-blue-950 px-2 py-0.5 text-xs font-semibold text-sky-600"
        >{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span
      >
    </div>
  </Card.Header>
  <Card.Content class="flex h-[430px] flex-col gap-3 overflow-y-auto px-4 pb-4">
    {@render children()}
  </Card.Content>
</Card.Root>
