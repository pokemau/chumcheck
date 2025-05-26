<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Textarea } from '$lib/components/ui/textarea';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Badge } from '$lib/components/ui/badge';
  import {
    getProfileColor,
    getReadinessLevels,
    getReadinessTypes,
    getStatusName,
    zIndex
  } from '$lib/utils';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  let { open, onOpenChange, create, startupId, readinessData } = $props();

  let data = $state({
    readiness_level_id: '',
    startup_id: startupId,
    rna: '',
    is_ai_generated: false
  });

  $effect(() => {
    if (!open) {
      data = {
        readiness_level_id: '',
        startup_id: startupId,
        rna: '',
        is_ai_generated: false
      };
    }
  });
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="h-4/5  max-w-[600px] overflow-y-auto">
    <Dialog.Header>
      <Dialog.Title>Create RNA</Dialog.Title>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="flex flex-col gap-4">
        <Label for="name">Type</Label>
        <Select.Root type="single" bind:value={data.readiness_level_id}>
          <Select.Trigger class="w-[180px]">
            {data.readiness_level_id
              ? readinessData.find(
                  (d: any) => d.readinessLevel.id === Number(data.readiness_level_id)
                )?.readinessLevel.readinessType
              : ''}
          </Select.Trigger>
          <Select.Content>
            {#each readinessData as type}
              <Select.Item value={`${type.readinessLevel.id}`}>{type.readinessLevel.readinessType}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
      <div class="flex flex-col gap-4">
        <Label for="username">Description</Label>
        <Textarea rows={10} bind:value={data.rna} />
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <Label for="name">Current Level</Label>
      <Select.Root type="single">
        <Select.NoTrigger class="w-[50px]"
          >
          {data.readiness_level_id
            ? readinessData.find(
                (d: any) => d.readinessLevel.id === Number(data.readiness_level_id)
              )?.readinessLevel.level
            : ''}
          </Select.NoTrigger>
      </Select.Root>
    </div>
    <Dialog.Footer>
      <Button
        onclick={() => create(data)}
        disabled={data.readiness_level_id === '' || data.rna === ''}
        >Create</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
