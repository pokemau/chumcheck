<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import * as Avatar from '$lib/components/ui/avatar';
  import { Delete, Edit, Ellipsis, Plus, Trash, User } from 'lucide-svelte';
  import { getProfileColor, zIndex } from '$lib/utils';
  import { RoadblocksCreateDialog, RoadblocksViewEditDialog, RoadblocksViewEditAIDialog  } from '.';
  import type { Actions } from '$lib/types';
  let {
    roadblocks,
    members,
    update,
    ai,
    deleteRoadblocks,
    role,
    index
  } = $props();

  let assignee = $derived(roadblocks.assignee);

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

    if (!roadblocks.clickedByMentor && role === 'Mentor') {
      update(roadblocks.id, { ...roadblocks, clickedByMentor: true }, false);
    }
    if (!roadblocks.clickedByStartup && role === 'Startup') {
      update(roadblocks.id, { ...roadblocks, clickedByStartup: true }, false);
    }
  };

  const isNewCard = () => {
    return (role == 'Mentor' && !roadblocks.clickedByMentor) || (role == 'Startup' && !roadblocks.clickedByStartup);
  }
</script>

<Card.Root
  class={`bg-gray-900 border rounded-lg shadow-sm cursor-pointer${
    isNewCard() ? 'border-sky-600 border-2 animate-pulse' : 'border-gray-700'}`}
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
      {#if isNewCard()}
        <div class="absolute -top-5 -right-5 z-100 bg-primary text-xs p-[1px] rounded-[2px]">New</div>
      {/if}
    </div>
    <div class="text-sm text-white mb-1 break-words whitespace-pre-wrap">
      Description: {@html roadblocks?.description?.substring(0, 60) + (roadblocks?.description?.length > 60 ? '...' : '')}
    </div>
    <div class="text-xs text-muted-foreground break-words whitespace-pre-wrap">
      Fix: {@html roadblocks?.fix?.substring(0, 60) + (roadblocks?.fix?.length > 60 ? '...' : '')}
    </div>  
    <div class="flex items-center gap-2 mt-1 text-xs">
      <div class="flex items-center gap-1">
        {#if assignedMember}
          <div class={`flex h-5 w-5 items-center justify-center rounded-full ${getProfileColor(assignedMember.firstName)}`}>
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

{#if  role === 'Startup'}
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
  addToRoadblocks={update}
  {index}
  {role}
/>
{:else}
<RoadblocksViewEditAIDialog
  {open}
  {onOpenChange}
  roadblock={roadblocks}
  deleteroadblock={deleteRoadblocks}
  {members}
  {closeDialog}
  {update}
  {index}
/>
{/if} 