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
  let { open, onOpenChange, create, members, startupId, status } = $props();

  const data = $state({
    priorityNumber: null,
    readinessTypeId: '',
    targetLevelId: '',
    targetLevelScoreId: 2,
    description: '',
    startupId: startupId,
    taskType: '1',
    dueDate: null,
    isAiGenerated: false,
    assigneeId: ''
  });

  const levels = $derived(
    getReadinessLevels(
      data.readinessTypeId
        ? (getReadinessTypes().filter(
            (d) => d.id === Number(data.readinessTypeId)
          )[0].name as
            | 'Technology'
            | 'Market'
            | 'Acceptance'
            | 'Organizational'
            | 'Regulatory'
            | 'Investment')
        : 'Technology'
    )
  );

  const getLevel = (id: any) => {
    if (id === 0) return '';
    return levels.filter((level: any) => Number(level.id) === Number(id))[0]
      .level;
  };
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="h-4/5  max-w-[600px] overflow-scroll">
    <Dialog.Header>
      <Dialog.Title>Create {getStatusName(status)} Rns</Dialog.Title>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="flex flex-col gap-4">
        <Label for="name">Type</Label>
        <Select.Root type="single" bind:value={data.readinessTypeId}>
          <Select.Trigger class="w-[180px]"
            >{data.readinessTypeId
              ? getReadinessTypes().filter(
                  (d) => d.id === Number(data.readinessTypeId)
                )[0].name
              : ''}</Select.Trigger
          >
          <Select.Content>
            {#each getReadinessTypes() as type}
              <Select.Item value={`${type.id}`}>{type.name}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
      <div class="flex flex-col gap-4">
        <Label for="username">Description</Label>
        <Textarea rows={10} bind:value={data.description} />
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <Label for="name">Assignee</Label>
      <Select.Root type="single" bind:value={data.assigneeId}>
        <Select.Trigger class="w-[180px]"
          >{data.assigneeId
            ? `${members.filter((member: any) => member.userId === data.assigneeId)[0].firstName} ${members.filter((member: any) => member.userId === data.assigneeId)[0].lastName}`
            : ''}</Select.Trigger
        >
        <Select.Content>
          {#each members as member}
            <Select.Item value={member.userId}
              >{member.firstName} {member.lastName}</Select.Item
            >
          {/each}
        </Select.Content>
      </Select.Root>
    </div>
    <div class="flex flex-col gap-4">
      <Label for="name">Target Level</Label>
      <Select.Root type="single" bind:value={data.targetLevelId}>
        <Select.Trigger class="w-[50px]"
          >{data.targetLevelId
            ? getLevel(data.targetLevelId)
            : ''}</Select.Trigger
        >
        <Select.Content>
          {#each levels as item}
            <Select.Item value={`${item.id}`}>{item.level}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>
    <div class="flex flex-col gap-4">
      <Label for="name">Term</Label>
      <Select.Root type="single" bind:value={data.taskType}>
        <Select.Trigger class="w-[120px]"
          >{data.taskType === '1' ? 'Short Term' : 'Long Term'}</Select.Trigger
        >
        <Select.Content>
          <Select.Item value="1">Short Term</Select.Item>
          <Select.Item value="2">Long Term</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
    <Dialog.Footer>
      <Button
        onclick={() => create(data)}
        disabled={data.targetLevelId === '' || data.description === ''
          ? true
          : false}>Create</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
