<script lang="ts">
  import { Label } from '$lib/components/ui/label/index.js';
  import { Textarea } from '$lib/components/ui/textareav2';
  import { Button } from '$lib/components/ui/button';
  import Description from './Description.svelte';
  // export let label = '';
  // export let value = '';
  // export let rows = 12;
  // export let editable = true;
  // export let role = 'Startup';
  // export let onSave = () => {};
  // export let id;
  // export let propName = ''; // e.g., 'description'

  // let editMode = false;
  export let label = '';
  export let editMode = false;
  export let role = '';
  export let data = '';
  export let dataId = 0;
  export let dataColumn = '';
  export let update: (id: number, payload: any) => Promise<void>;
  export let isTask:boolean = false;
  export let taskDescription = 'None';
</script>

<div class="flex flex-col gap-3 break-words">
  <Label for="username" class="text-lg font-bold">{label}</Label>

  {#if !isTask}
  {#if editMode && role !== 'Startup'}
    <Textarea
      rows={12}
      bind:value={data}
      class="text-justify text-base"
    />
    <div class="ml-auto flex gap-2">
      <Button size="sm" variant="outline" onclick={() => (editMode = false)}>Cancel</Button>
      <Button
        size="sm"
        onclick={async () => {
          await update(dataId, { [dataColumn]: data });
          editMode = false;
        }}
      >Save</Button>
    </div>
  {:else}
    <button
      on:click={() => {
        if (role !== 'Startup') {
          editMode = true;
        }
      }}
    >
    <Description>
      {data}
    </Description>
    </button>
  {/if}
  {:else}
    <Description>
    {#if data}
      {taskDescription}
    {/if}
    </Description>
  {/if}
</div>
