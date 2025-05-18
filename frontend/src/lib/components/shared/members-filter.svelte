<script lang="ts">
  import * as Tooltip from '$lib/components/ui/tooltip/index.js';
  import { getProfileColor, zIndex } from '$lib/utils';
  import { Kanban, Table, SlidersHorizontal } from 'lucide-svelte';

  let {
    members = $bindable(),
    toggleMemberSelection,
    selectedMembers
  } = $props();
</script>

<div class="flex items-center">
  {#each members as member, index}
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          class={`border-2 ${
            selectedMembers.includes(member.id)
              ? 'ring-2 ring-flutter-blue'
              : ''
          } flex h-9 w-9 items-center justify-center rounded-full border-background ${
            index !== members.length - 1 ? '-mr-1' : ''
          } ${zIndex[index]} ${getProfileColor(member.firstName)}`}
          onclick={() => {
            toggleMemberSelection(index);
          }}
        >
          {member.firstName.charAt(0)}
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">
          <p>{member.firstName} {member.lastName}</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  {/each}
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger
        class={`border-2 ${selectedMembers.includes(999) ? 'ring-2 ring-flutter-blue' : ''} -ml-1 flex h-9 w-9 items-center justify-center rounded-full border-background bg-gray-700`}
        onclick={() => {
          toggleMemberSelection(999);
        }}
      >
        ?
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom">
        <p>Unassigned</p>
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
</div>
