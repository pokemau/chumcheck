<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import { Target, User } from 'lucide-svelte';
  import { getProfileColor, getReadinessStyles, zIndex } from '$lib/utils';
  import { RnsViewEditDeleteDialog, RnsViewEditDeleteAiDialog } from '.';
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

    if (!rns.clickedByMentor && role === 'Mentor') {
      update(rns.id, { ...rns, clickedByMentor: true }, false);
    }
    if (!rns.clickedByStartup && role === 'Startup') {
      update(rns.id, { ...rns, clickedByStartup: true }, false);
    }
  };

  const isNewCard = () => {
    return (
      (role == 'Mentor' && !rns.clickedByMentor) ||
      (role == 'Startup' && !rns.clickedByStartup)
    );
  };

  let rnsCopy = $state({ ...rns });

  $effect(() => {
    rnsCopy = { ...rns };
  });

  const approveDialog = () => {
    open = false;
    update(rns.id, {
      ...rns,
      approvalStatus: 'Unchanged',
      status: rns.requestedStatus
    });
  };

  const denyDialog = () => {
    open = false;
    update(rns.id, {
      ...rns,
      approvalStatus: 'Unchanged',
      requestedStatus: rns.status
    });
  };
</script>

<Card.Root
  class={`bg-accent cursor-pointer rounded-lg border shadow-sm
  ${isNewCard() || rnsCopy.approvalStatus !== 'Unchanged' ? 'border-3 animate-pulse' : ''} `}
  onclick={() => {
    open = true;
    action = 'View';
  }}
>
  <Card.Content class="relative flex flex-col gap-2 p-4">
    <div class="mb-1 flex items-center justify-between">
      <Badge
        class="rounded border-2 border-sky-600 bg-blue-950 px-2 py-0.5 text-xs font-semibold text-sky-600"
        >#{rns.priorityNumber ? rns.priorityNumber : ''}</Badge
      >
      {#if isNewCard()}
        <div
          class="z-100 bg-primary absolute -right-2 -top-2 rounded-[2px] p-[1px] text-xs"
        >
          New
        </div>
      {/if}
      {#if rnsCopy.approvalStatus !== 'Unchanged'}
        <div
          class="z-100 bg-primary absolute -right-2 -top-2 rounded-[2px] p-[1px] text-xs"
        >
          Pending Approval
        </div>
      {/if}
      <Badge
        class={`text-xs font-bold ${getReadinessStyles(rns.readinessType)}`}
        >{rns.readinessType}</Badge
      >
    </div>
    <div class="whitespace-pre-wrap break-words text-sm">
      {@html rns.description.substring(0, 100) +
        `${rns.description.length > 100 ? '...' : ''}`}
    </div>
    <div class="flex items-center justify-between">
      <div class="text-muted-foreground flex items-center gap-1 text-xs">
        <Target class="h-4 w-4" /> Target Level: {rns.targetLevelScore}
      </div>

      <div class="flex items-center gap-1 text-xs">
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
            class="bg-muted flex h-5 w-5 items-center justify-center rounded-full"
          >
            <User class="h-4 w-4" />
          </div>
          <span>Unassigned</span>
        {/if}
      </div>
    </div>
    <div class="text-muted-foreground flex items-center gap-1 text-xs">
      <img src="/clock.png" alt="Clock" class="h-4 w-4" />
      <span>{rns.status === 7 ? 'Long Term' : 'Short Term'}</span>
    </div>
  </Card.Content>
</Card.Root>

{#if role === 'Startup'}
  <RnsViewEditDeleteDialog
    {open}
    {onOpenChange}
    {rns}
    {deleteRns}
    {update}
    {action}
    {members}
    {closeDialog}
    {index}
    {role}
  />
{:else}
  <RnsViewEditDeleteAiDialog
    {open}
    {onOpenChange}
    {rns}
    {deleteRns}
    {members}
    {closeDialog}
    {index}
    {addToRns}
    isEdit={!ai}
    {approveDialog}
    {denyDialog}
  />
{/if}
