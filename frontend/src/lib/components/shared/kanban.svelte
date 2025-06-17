<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import { Column } from '.';
  let {
    handleDndConsider,
    handleDndFinalize,
    columns,
    card,
    showDialog,
    role,
    updateStatus,
    selectedMembers
  }: {
    handleDndConsider: any;
    handleDndFinalize: any;
    columns: any;
    card: any;
    showDialog: any;
    role: any;
    updateStatus: any;
    selectedMembers: any;
  } = $props();

  const flipDurationMs = 300;
</script>

{#each columns as column, index}
  {#if column.show}
    <Column
      name={column.name}
      {showDialog}
      {updateStatus}
      statusId={column.value}
      {role}
    >
      {#if role !== 'Startup'}
        <div
          use:dndzone={{
            items: column.items,
            flipDurationMs,
            dropTargetStyle: {
              outline: 'rgba(255, 255, 255, ) solid 2px'
            }
          }}
          onconsider={(e) => handleDndConsider(e, index)}
          onfinalize={(e) => handleDndFinalize(e, index, column.value)}
          class="flex h-[700px] flex-col gap-3 overflow-scroll"
        >
          {#if column.items.length === 0}
            <div class="h-40"></div>
          {:else}
            {#each column.items as item (item.id)}
              <div
                animate:flip={{ duration: flipDurationMs }}
                class:hidden={!selectedMembers.includes(
                  item.assignee ? item.assignee : 999
                ) && selectedMembers.length !== 0}
              >
                {@render card(item)}
              </div>
            {/each}
          {/if}
        </div>
      {:else}
        <div class="flex h-[700px] flex-col gap-3 overflow-scroll">
          {#if column.items.length === 0}
            <div class="h-40"></div>
          {:else}
            {#each column.items as item (item.id)}
              <div
                animate:flip={{ duration: flipDurationMs }}
                class:hidden={!selectedMembers.includes(
                  item.assignee ? item.assignee : 999
                ) && selectedMembers.length !== 0}
              >
                {@render card(item)}
              </div>
            {/each}
          {/if}
        </div>
      {/if}
    </Column>
  {/if}
{/each}
