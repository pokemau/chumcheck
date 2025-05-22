<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import { User } from 'lucide-svelte';
  import { getProfileColor, getReadinessStyles, zIndex } from '$lib/utils';
  import { InitiativeViewEditDeleteDialog } from '.';
  import type { Actions } from '$lib/types';
  import { goto } from '$app/navigation';
  import { hoveredRNSCard } from '$lib/stores/hoveredRNSCard';
  let { initiative, ai, members, update, addToInitiative, deleteInitiative, role, tasks, index } =
    $props();

  const assignedRNS = tasks.filter((task: any) => task.id === initiative.rns)[0];
  const assignedMember = assignedRNS.assignee;

  let open = $state(false);
  const onOpenChange = () => {
    open = !open;
  };

  let action: Actions = $state('View');
  const closeDialog = () => {
    open = false;
  };

  function handleMouseEnter(event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    hoveredRNSCard.set({
      rns: assignedRNS,
      coords: { x: rect.left + rect.width / 2, y: rect.top },
      visible: true
    });
  }
  function handleMouseLeave() {
    hoveredRNSCard.set({ rns: null, coords: null, visible: false });
  }

</script>

<Card.Root
  class="bg-gray-900 border border-gray-700 rounded-lg shadow-sm cursor-pointer"
  onclick={() => {
    open = true;
    action = 'View';
  }}
>
  <Card.Content class="flex flex-col gap-2 p-4">
    <div class="flex items-center justify-between mb-1 relative">
      <Badge class="text-xs font-semibold border-2 border-sky-600 text-sky-600 bg-blue-950 rounded px-2 py-0.5">
        #{initiative.initiativeNumber ? initiative.initiativeNumber : ''}
      </Badge>
      <span class="relative inline-block">
        <Badge
          class="text-xs font-semibold border-2 border-sky-600 text-sky-600 bg-blue-950 rounded px-2 py-0.5"
          onmouseenter={handleMouseEnter}
          onmouseleave={handleMouseLeave}
          onclick={() => goto(`rns?tab=rns`)}
        >
          RNS #{assignedRNS?.priorityNumber ?? ''}
        </Badge>
      </span>
      <Badge class={`text-xs font-bold ${getReadinessStyles(assignedRNS.readinessType)}`}>
        {assignedRNS.readinessType}
      </Badge>
    </div>
    <div class="text-sm font-semibold text-white mb-1">
      Task: {assignedRNS?.description?.substring(0, 60) + (assignedRNS?.description?.length > 60 ? '...' : '')}
    </div>  
    {#if initiative.description}
      <div class="text-muted-foreground text-sm mb-1">
        Description: {initiative.description.substring(0, 100) + (initiative.description.length > 100 ? '...' : '')}
      </div>
    {/if}
    {#if initiative.measures}
      <div class="text-muted-foreground text-sm mb-1">
        Measures: {initiative.measures.substring(0, 100) + (initiative.measures.length > 100 ? '...' : '')}
      </div>
    {/if}
    {#if initiative.targets}
      <div class="flex items-center gap-1 text-xs text-muted-foreground mb-1">
        Targets: {initiative.targets.substring(0, 100) + (initiative.targets.length > 100 ? '...' : '')}
      </div>
    {/if}
    {#if initiative.remarks}
      <div class="text-muted-foreground text-sm mb-1">
        Remarks: {initiative.remarks.substring(0, 100) + (initiative.remarks.length > 100 ? '...' : '')}
      </div>
    {/if}
    <div class="flex items-center gap-2 mt-2 text-xs">
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
  </Card.Content>
</Card.Root>

<InitiativeViewEditDeleteDialog
  {open}
  {onOpenChange}
  rns={initiative}
  {update}
  {action}
  deleteRns={deleteInitiative}
  {members}
  {assignedMember}
  {closeDialog}
  {tasks}
  {addToInitiative}
  {ai}
  {index}
  {role}
/>
