<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import { User } from 'lucide-svelte';
  import { getProfileColor, getReadinessStyles, zIndex } from '$lib/utils';
  import { InitiativeViewEditDeleteDialog, InitiativeViewEditDeleteAiDialog } from '.';
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
    if (!initiative.clickedByMentor && role === 'Mentor') {
      update(initiative.id, { ...initiative, clickedByMentor: true });
    }
    if (!initiative.clickedByStartup && role === 'Startup') {
      update(initiative.id, { ...initiative, clickedByStartup: true });
    }
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

  const isNewCard = () => {
    return (role == 'Mentor' && !initiative.clickedByMentor) || (role == 'Startup' && !initiative.clickedByStartup)
  }

  let initiativesCopy = $state({ ...initiative });

  $effect(() => {
    initiativesCopy = { ...initiative };
  });

</script>

<Card.Root
  class={`${initiativesCopy.approvalStatus === 'Unchanged' ? 'bg-gray-900' : 'bg-violet-950'} border 
  ${ isNewCard() ? 'border-3 border-sky-600 animate-pulse' : 'border-gray-700'} rounded-lg shadow-sm cursor-pointer`}
  onclick={() => {
    open = true;
    action = 'View';
  }}
>
  <Card.Content class="flex flex-col gap-2 p-4">
    <div class="flex relative items-center justify-between mb-1 relative">
      {#if isNewCard()}
        <div class="absolute -top-5 -right-5 z-100 bg-primary text-xs">New</div>
      {/if}
      <Badge class="text-xs border-2 border-sky-600 text-sky-600 bg-blue-950 rounded px-2 py-0.5">
        #{initiative.initiativeNumber ? initiative.initiativeNumber : ''}
      </Badge>
      <Badge
        class="text-xs border-2 border-sky-600 text-sky-600 bg-blue-950 rounded px-2 py-0.5"
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
        onclick={() => goto(`rns?tab=rns`)}
      >
        RNS #{assignedRNS?.priorityNumber ?? ''}
      </Badge>
      <Badge class={`text-xs font-bold ${getReadinessStyles(assignedRNS.readinessType)}`}>
        {assignedRNS.readinessType}
      </Badge>
    </div>
    <div class="text-sm text-white break-words whitespace-pre-wrap">
      Task: {@html assignedRNS?.description?.substring(0, 40) + (assignedRNS?.description?.length > 40 ? '...' : '')}
    </div>
    {#if initiative.description}
      <div class="text-xs break-words whitespace-pre-wrap">
        Description: <span class="text-muted-foreground">{@html initiative.description.substring(0, 50) + (initiative.description.length > 50 ? '...' : '')}</span>
      </div>
    {/if}
    {#if initiative.measures}
      <div class="text-xs break-words whitespace-pre-wrap">
        Measures: <span class="text-muted-foreground">{@html initiative.measures.substring(0, 50) + (initiative.measures.length > 50 ? '...' : '')}</span>
      </div>
    {/if}
    {#if initiative.targets}
      <div class="text-xs break-words whitespace-pre-wrap">
        Targets: <span class="text-muted-foreground">{@html initiative.targets.substring(0, 50) + (initiative.targets.length > 50 ? '...' : '')}</span>
      </div>
    {/if}
    {#if initiative.remarks}
      <div class="text-xs break-words whitespace-pre-wrap">
        Remarks: <span class="text-muted-foreground">{@html initiative.remarks.substring(0, 50) + (initiative.remarks.length > 50 ? '...' : '')}</span>
      </div>
    {/if}
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
  </Card.Content>
</Card.Root>

{#if role === 'Startup'}
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
{:else}
  <InitiativeViewEditDeleteAiDialog
  {open}
  {onOpenChange}
  initiative={initiative}
  {deleteInitiative}
  {members}
  {closeDialog}
  {addToInitiative}
  {index}
  {tasks}
  isEdit={!ai}
  />
{/if}
