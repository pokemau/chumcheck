<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Edit, Ellipsis, Plus, Target, Trash, User } from 'lucide-svelte';
  import { getProfileColor, getReadinessStyles, zIndex } from '$lib/utils';
  import { RnsViewEditDeleteDialog } from '.';
  import type { Actions } from '$lib/types';
  let { rns, members, update, ai, addToRns, deleteRns, role, index } = $props();

  let assignee = $derived(rns.assignee_id);

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
  class="h-full min-w-[calc(25%-1.25rem*3/4)] cursor-pointer"
  onclick={() => {
    open = true;
    action = 'View';
  }}
>
  <Card.Content class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <h2 class="text-[15px] font-semibold leading-none tracking-tight">
        Priority #{rns.priorityNumber ? rns.priorityNumber : ''}
      </h2>
    </div>
    <div class="text-sm text-muted-foreground">
      {rns.description.substring(0, 150) +
        `${rns.description.length > 150 ? '...' : ''}`}
    </div>
    <div class="flex items-center gap-1 text-sm text-muted-foreground">
      <Target class="h-4 w-4" /> Target Level: <Badge variant="secondary"
        >{rns.targetLevel}</Badge
      >
    </div>
    <div class="flex items-center justify-between">
      <div class="flex flex-wrap items-center gap-2">
        <Badge class={`${rns.readinessType}`}>{rns.readinessType}</Badge>
        <!-- <Badge -->
        <!--   class={`${rns.task_type === 1 ? 'bg-blue-700 hover:bg-blue-800' : 'bg-rose-700 hover:bg-rose-800'}`} -->
        <!--   >{rns.task_type === 1 ? 'Short' : 'Long'} Term</Badge -->
        <!-- > -->
      </div>
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
