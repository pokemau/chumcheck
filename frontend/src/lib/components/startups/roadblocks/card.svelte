<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import * as Avatar from '$lib/components/ui/avatar';
  import { Delete, Edit, Ellipsis, Plus, Trash, User } from 'lucide-svelte';
  import { getProfileColor, zIndex } from '$lib/utils';
  import { RoadblocksCreateDialog, RoadblocksViewEditDialog } from '.';
  import type { Actions } from '$lib/types';
  let {
    roadblocks,
    members,
    update,
    ai,
    addToRoadblocks,
    deleteRoadblocks,
    role,
    index
  } = $props();

  let assignee = $derived(roadblocks.assignee_id);

  const assignedMember = $derived(
    members.filter((member: any) => member.user_id === assignee)[0]
  );

  let open = $state(false);
  const onOpenChange = () => {
    open = !open;
  };

  let action: Actions = $state('View');
  const closeDialog = () => {
    open = false;
  };
</script>

<Card.Root
  class="h-full min-w-[calc(25%-1.25rem*3/4)] cursor-pointer"
  onclick={() => {
    open = true;
    action = 'View';
  }}
>
  <Card.Content class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <h2 class="text-[15px] font-semibold leading-none tracking-tight">
        Risk #{roadblocks.risk_number}
      </h2>
    </div>
    <div class="text-sm text-muted-foreground">
      {roadblocks.description.substring(0, 150) +
        `${roadblocks.description.length > 150 ? '...' : ''}`}
    </div>
    <div class="flex items-center justify-between">
      <div class="flex flex-wrap items-center gap-2"></div>
      {#if assignedMember}
        <div
          class={`flex h-8 w-8 items-center justify-center rounded-full ${getProfileColor(assignedMember.first_name)}`}
        >
          {assignedMember.first_name.charAt(0)}
        </div>
      {:else}
        <div
          class={`flex h-8 w-8 items-center justify-center rounded-full bg-muted ${zIndex[1]}`}
        >
          <User class="h-4 w-4" />
        </div>
      {/if}
    </div>
  </Card.Content>
</Card.Root>

<RoadblocksViewEditDialog
  {open}
  {onOpenChange}
  rns={roadblocks}
  {update}
  {action}
  deleteRns={deleteRoadblocks}
  {members}
  {assignedMember}
  {closeDialog}
  {ai}
  {addToRoadblocks}
  {index}
  {role}
/>
