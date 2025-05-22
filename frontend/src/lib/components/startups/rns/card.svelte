<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import { Target, User } from 'lucide-svelte';
  import { getProfileColor, getReadinessStyles, zIndex } from '$lib/utils';
  import { RnsViewEditDeleteDialog } from '.';
  import type { Actions } from '$lib/types';
  let { rns, members, update, ai, addToRns, deleteRns, role, index } = $props();

  let assignee = $derived(rns.assignee.id);

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
  <Card.Content class="flex flex-col gap-2 p-4">
    <div class="flex items-center justify-between mb-1">
      <Badge class="text-xs font-semibold border-2 border-sky-600 text-sky-600 bg-blue-950 rounded px-2 py-0.5">#{rns.priorityNumber ? rns.priorityNumber : ''}</Badge>
      <Badge class={`text-xs font-bold ${getReadinessStyles(rns.readinessType)}`}>{rns.readinessType}</Badge>
    </div>
    <div class="text-sm">
      {rns.description.substring(0, 150) +
        `${rns.description.length > 150 ? '...' : ''}`}
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1 text-xs text-muted-foreground ">
        <Target class="h-4 w-4" /> Target Level: {rns.targetLevelScore}
      </div>

      <div class="flex items-center gap-1 text-xs">
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
    <div class="flex items-center gap-1 text-xs text-muted-foreground">
      <img src="/clock.png" alt="Clock" class="h-4 w-4" />
      <span>{rns.status === 7 ? "Long Term" : "Short Term"}</span>
    </div>
  </Card.Content>
</Card.Root>

<RnsViewEditDeleteDialog
  {open}
  {onOpenChange}
  {rns}
  {update}
  {action}
  {deleteRns}
  {members}
  {assignedMember}
  {closeDialog}
  {ai}
  {addToRns}
  {index}
  {role}
/>
