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
  let { open, onOpenChange, create, members, startupId, tasks, status } = $props();

  const data = $state({
    initiativeNumber: '',
    description: '',
    measures: '',
    targets: '',
    remarks: '',
    rnsId: '',
    assigneeId: '',
  });
  $effect(() => {
 
  });
</script>

<Dialog.Root bind:open {onOpenChange}>
  <Dialog.Content class="h-4/5 max-w-[600px] overflow-scroll">
    <Dialog.Header>
      <Dialog.Title>Create {getStatusName(status)} Initiative</Dialog.Title>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
      <div class="flex flex-col gap-4">
        <Label for="name">Task</Label>
        <Select.Root type="single" bind:value={data.rnsId}>
          <Select.Trigger class="h-20 text-wrap text-start"
            >{data.rnsId
              ? tasks
                  .filter((task: any) => task.id == data.rnsId)[0]
                  .description.substring(0, 100)
              : ''}</Select.Trigger
          >
          <Select.Content>
            {#each tasks as task}
              <Select.Item value={`${task.id}`}>{task.description.substring(0, 90)}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
      <div class="flex flex-col gap-4">
        <Label for="username">Description</Label>
        <Textarea rows={4} bind:value={data.description} />
      </div>
      <div class="flex flex-col gap-4">
        <Label for="username">Measures</Label>
        <Textarea rows={2} bind:value={data.measures} />
      </div>
      <div class="flex flex-col gap-4">
        <Label for="username">Target</Label>
        <Textarea rows={2} bind:value={data.targets} />
      </div>
      <div class="flex flex-col gap-4">
        <Label for="username">Remarks</Label>
        <Textarea rows={2} bind:value={data.remarks} />
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
            <Select.Item value={member.userId}>{member.firstName} {member.lastName}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>
    <div class="flex flex-col gap-4">
      <Label for="name">Initiative No.</Label>
      <Select.Root type="single" bind:value={data.initiativeNumber}>
        <Select.Trigger class="w-[180px]">{data.initiativeNumber}</Select.Trigger>
        <Select.Content>
          {#each [1, 2, 3, 4, 5] as item}
            <Select.Item value={`${item}`}>{item}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>
    </div>
    <Dialog.Footer>
      <Button
        onclick={() =>{
          create({
            ...data,
            initiativeNumber: data.initiativeNumber ? Number(data.initiativeNumber) : undefined,
            rnsId: data.rnsId ? Number(data.rnsId) : undefined,
            assigneeId: data.assigneeId ? Number(data.assigneeId) : undefined,
            startupId: Number(startupId),
            status: status,
            isAiGenerated: false,
          })

          data.initiativeNumber = '';
          data.description = '';
          data.measures = '';
          data.targets = '';
          data.remarks = '';
          data.rnsId = '';
          data.assigneeId = '';
        }}
        disabled={
          data.description === '' ||
          data.measures === '' ||
          data.targets === '' ||
          data.remarks === '' ||
          data.rnsId === ''
        }
      >
        Create
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
