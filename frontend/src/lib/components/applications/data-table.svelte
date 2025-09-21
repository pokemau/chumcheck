<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { FlexRender } from '$lib/components/ui/data-table/index.js';

  let { table, selectedTab } = $props();

  let open = $state(false);
</script>

<div class="rounded-md border">
  <Table.Root class="rounded-lg bg-background">
    <Table.Header>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <Table.Row>
          {#each headerGroup.headers as header (header.id)}
            <Table.Head class="h-12 [&:has([role=checkbox])]:pl-3">
              {#if !header.isPlaceholder}
                <FlexRender
                  content={header.column.columnDef.header}
                  context={header.getContext()}
                />
              {/if}
            </Table.Head>
          {/each}
        </Table.Row>
      {/each}
    </Table.Header>
    <Table.Body>
      {#each table.getRowModel().rows as row (row.id)}
        <Table.Row
          data-state={row.getIsSelected() && 'selected'}
          onclick={() => (open = true)}
        >
          {#each row.getVisibleCells() as cell (cell.id)}
            <Table.Cell
              class="h-14 cursor-pointer [&:has([role=checkbox])]:pl-3"
            >
              <FlexRender
                content={cell.column.columnDef.cell}
                context={cell.getContext()}
              />
            </Table.Cell>
          {/each}
        </Table.Row>
      {:else}
        <Table.Row>
          <Table.Cell
            colspan={table.getAllColumns().length}
            class="h-24 text-center">No results.</Table.Cell
          >
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
<div class="flex items-center justify-end space-x-2 pt-4">
  <div class="flex-1 text-sm text-muted-foreground">
    {table.getFilteredSelectedRowModel().rows.length} of
    {table.getFilteredRowModel().rows.length} row(s) selected.
  </div>
  <div class="space-x-2">
    <Button
      variant="outline"
      size="sm"
      onclick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >
      Previous
    </Button>
    <Button
      variant="outline"
      size="sm"
      onclick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >
      Next
    </Button>
  </div>
</div>

<Dialog.Root bind:open>
  <Dialog.Content>
    {#if selectedTab === 'pending'}
      <Dialog.Header>
        <Dialog.Title>pending</Dialog.Title>
        <Dialog.Description>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </Dialog.Description>
      </Dialog.Header>
    {:else if selectedTab === 'rated'}
      <Dialog.Header>
        <Dialog.Title>rated</Dialog.Title>
        <Dialog.Description>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </Dialog.Description>
      </Dialog.Header>
    {:else}
      <Dialog.Header>
        <Dialog.Title>qualified</Dialog.Title>
        <Dialog.Description>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </Dialog.Description>
      </Dialog.Header>
    {/if}
  </Dialog.Content>
</Dialog.Root>
