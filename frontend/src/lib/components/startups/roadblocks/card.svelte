<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import * as Avatar from '$lib/components/ui/avatar';
  import { Delete, Edit, Ellipsis, Plus, Trash, User } from 'lucide-svelte';
  import { getProfileColor, zIndex } from '$lib/utils';
  import {
    RoadblocksCreateDialog,
    RoadblocksViewEditDialog,
    RoadblocksViewEditAIDialog
  } from '.';
  import type { Actions } from '$lib/types';
  let { roadblocks, members, update, ai, deleteRoadblocks, role, index } =
    $props();

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
    return (
      (role == 'Mentor' && !roadblocks.clickedByMentor) ||
      (role == 'Startup' && !roadblocks.clickedByStartup)
    );
  };

  const approveDialog = () => {
    open = false;
    update(roadblocks.id, {
      ...roadblocks,
      approvalStatus: 'Unchanged',
      status: roadblocks.requestedStatus
    });
  };

  const denyDialog = () => {
    open = false;
    update(roadblocks.id, {
      ...roadblocks,
      approvalStatus: 'Unchanged',
      requestedStatus: roadblocks.status
    });
  };

  let roadblocksCopy = $state({ ...roadblocks });

  $effect(() => {
    roadblocksCopy = { ...roadblocks };
  });
</script>

<Card.Root
  class={`cursor-pointer rounded-lg border bg-gray-900 shadow-sm
  ${isNewCard() || roadblocksCopy.approvalStatus !== 'Unchanged' ? 'border-3 animate-pulse border-sky-600' : 'border-gray-700'} `}
  onclick={() => {
    open = true;
    action = 'View';
  }}
>
  <Card.Content class="flex flex-col gap-2">
    <div class="relative mb-1 flex items-center justify-between">
      <Badge
        class="rounded border-2 border-sky-600 bg-blue-950 px-2 py-0.5 text-xs font-semibold text-sky-600"
      >
        Risk #{roadblocks.riskNumber ? roadblocks.riskNumber : ''}
      </Badge>
      {#if isNewCard()}
        <div
          class="z-100 absolute -right-5 -top-5 rounded-[2px] bg-primary p-[1px] text-xs"
        >
          New
        </div>
      {/if}
      {#if roadblocksCopy.approvalStatus !== 'Unchanged'}
        <div
          class="z-100 absolute -right-5 -top-5 rounded-[2px] bg-primary p-[1px] text-xs"
        >
          Pending Approval
        </div>
      {/if}
    </div>
    <div class="mb-1 whitespace-pre-wrap break-words text-sm text-white">
      Description: {@html roadblocks?.description?.substring(0, 60) +
        (roadblocks?.description?.length > 60 ? '...' : '')}
    </div>
    <div class="whitespace-pre-wrap break-words text-xs text-muted-foreground">
      Fix: {@html roadblocks?.fix?.substring(0, 60) +
        (roadblocks?.fix?.length > 60 ? '...' : '')}
    </div>
    <div class="mt-1 flex items-center gap-2 text-xs">
      <div class="flex items-center gap-1">
        {#if assignedMember}
          <div
            class={`flex h-5 w-5 items-center justify-center rounded-full ${getProfileColor(assignedMember.firstName)}`}
          >
            {assignedMember.firstName.charAt(0)}
          </div>
          <span class="text-muted-foreground">
            {#if assignedMember.firstName.length + assignedMember.lastName.length + 1 > 15}
              {(assignedMember.firstName + ' ' + assignedMember.lastName).slice(
                0,
                15
              ) + '...'}
            {:else}
              {assignedMember.firstName} {assignedMember.lastName}
            {/if}
          </span>
        {:else}
          <div
            class="flex h-5 w-5 items-center justify-center rounded-full bg-muted"
          >
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

{#if role === 'Startup'}
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
    {approveDialog}
    {denyDialog}
  />
{/if}
