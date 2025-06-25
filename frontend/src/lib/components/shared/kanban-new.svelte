<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import { Column } from '.';
  import type { RNSItem } from '$lib/types';

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

<div
  class="
    mb-4
    grid
    w-full
    auto-rows-fr
    grid-cols-4
    grid-rows-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]
    gap-4
  "
>
  {#each columns as column, index}
    {#if column.show}
      <div
        class={column.name === 'Long Term'
          ? 'col-span-4 row-start-3'
          : column.name === 'Delayed'
            ? 'col-span-2 col-start-1 row-start-2'
            : column.name === 'Discontinued'
              ? 'col-span-2 col-start-3 row-start-2'
              : 'row-start-1'}
      >
        <Column
          name={column.name}
          itemCount={column.items.length}
          {showDialog}
          {updateStatus}
          statusId={column.value}
          {role}
        >
          <div
            use:dndzone={{
              items: column.items,
              flipDurationMs: flipDurationMs,
              dropTargetStyle: {
                outline: 'rgba(255, 255, 255, 0.5) solid 2px'
              }
            }}
            onconsider={(e: CustomEvent<DndEvent<RNSItem>>) =>
              handleDndConsider(e, index)}
            onfinalize={(e: CustomEvent<DndEvent<RNSItem>>) =>
              handleDndFinalize(e, index, column.value)}
            class="flex h-[700px] flex-col gap-3"
          >
            {#if column.items.length === 0}
              <div
                class="empty-placeholder"
                style="pointer-events: none;"
              ></div>
            {:else}
              {#each column.items as item (item.id)}

                <div
                  animate:flip={{ duration: flipDurationMs }}
                  class:hidden={!selectedMembers.includes(
                    item.assigneeId ? item.assigneeId : 999
                  ) && selectedMembers.length !== 0}
                >
                  {@render card(item, false, index)}
                </div>
              {/each}
            {/if}
          </div>
        </Column>
      </div>
    {/if}
  {/each}
</div>
