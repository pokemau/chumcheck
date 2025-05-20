<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import * as Avatar from '$lib/components/ui/avatar';
  import { Edit, Ellipsis, Plus, Trash, User } from 'lucide-svelte';
  import { getPriorityStyles, getProfileColor, zIndex } from '$lib/utils';
  import { InitiativeViewEditDeleteDialog } from '.';
  import type { Actions } from '$lib/types';
  let { initiative, ai, members, update, addToInitiative, deleteInitiative, role, tasks, index } =
    $props();

  let assignee = $derived(initiative.assigneeId);

  const assignedMember = $derived(members.filter((member: any) => member.userId === assignee)[0]);

  let open = $state(false);
  const onOpenChange = () => {
    open = !open;
  };

  let action: Actions = $state('View');

  // console.log(tasks);
  // console.log(initiative);

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
        Initiative #{initiative.initiativeNumber ? initiative.initiativeNumber : ''}
      </h2>
    </div>
    <div class="text-sm text-muted-foreground">
      {initiative.description.substring(0, 150) +
        `${initiative.description.length > 150 ? '...' : ''}`}
    </div>
    <div class="flex items-center justify-between">
      <Badge
        class={`${getPriorityStyles(
          tasks.filter((task: any) => task.id === initiative.rns)[0].priorityNumber
        )}`}
        >RNS Priority #{tasks.filter((task: any) => task.id === initiative.rns)[0]
          .priorityNumber}</Badge
      >
      {#if assignedMember}
        <div
          class={`flex h-8 w-8 items-center justify-center rounded-full ${getProfileColor(assignedMember.first_name)}`}
        >
          {assignedMember.first_name.charAt(0)}
        </div>
      {:else}
        <div class={`flex h-8 w-8 items-center justify-center rounded-full bg-muted ${zIndex[1]}`}>
          <User class="h-4 w-4" />
        </div>
      {/if}
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
