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

  let assignee = $derived(roadblocks.assignee);

  // console.log($state.snapshot(roadblocks));

  const assignedMember = $derived(
    members.filter((member: any) => member.userId === assignee)[0]
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
  class="bg-gray-900 border border-gray-700 rounded-lg shadow-sm cursor-pointer"
  onclick={() => {
    open = true;
    action = 'View';
  }}
>
  <Card.Content class="flex flex-col gap-2">
    <div class="flex items-center justify-between mb-1 relative">
      <Badge class="text-xs font-semibold border-2 border-sky-600 text-sky-600 bg-blue-950 rounded px-2 py-0.5">
        Risk #{roadblocks.riskNumber ? roadblocks.riskNumber : ''}
      </Badge>
    </div>
    <div class="text-[13px] font-semibold text-white mb-1">
      Description: {roadblocks?.description?.substring(0, 60) + (roadblocks?.description?.length > 60 ? '...' : '')}
    </div>
    <div class="text-[13px] font-semibold text-white mb-1">
      Fix: {roadblocks?.fix?.substring(0, 60) + (roadblocks?.fix?.length > 60 ? '...' : '')}
    </div>  
    <div class="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
      <div class="flex items-center gap-1">
        {#if assignedMember}
          <div class={`flex h-5 w-5 items-center justify-center rounded-full ${getProfileColor(assignedMember.first_name)}`}>
            {assignedMember.firstName.charAt(0)}
          </div>
          <span class="text-muted-foreground">
            {#if (assignedMember.firstName.length + assignedMember.lastName.length + 1) > 15}
              {(assignedMember.firstName + ' ' + assignedMember.lastName).slice(0, 15) + '...'}
            {:else}
              {assignedMember.firstName} {assignedMember.lastName}
            {/if}
          </span>
        {:else}
          <div class="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
            <User class="h-4 w-4" />
          </div>
          <span>Unassigned</span>
        {/if}
      </div>
    </div>


    <!-- <div class="flex items-center justify-between">
      <h2 class="text-[15px] font-semibold leading-none tracking-tight">
        Risk #{roadblocks.riskNumber}
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
          class={`flex h-8 w-8 items-center justify-center rounded-full ${getProfileColor(assignedMember.firstName)}`}
        >
          {assignedMember.firstName.charAt(0)}
        </div>
      {:else}
        <div
          class={`flex h-8 w-8 items-center justify-center rounded-full bg-muted ${zIndex[1]}`}
        >
          <User class="h-4 w-4" />
        </div>
      {/if}
    </div> -->
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
