<script lang="ts">
  import {
    AIColumn,
    AITabs,
    Can,
    Column,
    KanbanBoard,
    KanbanBoardRns,
    MembersFilter,
    ShowHideColumns,
    TaskTypeFilter
  } from '$lib/components/shared';
  import {
    getData,
    getColumns,
    getSavedTab,
    getSelectedTab,
    updateTab,
    getReadiness
  } from '$lib/utils';
  import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
  import { useQueries } from '@sveltestack/svelte-query';
  import { page } from '$app/stores';
  import { toast } from 'svelte-sonner';
  import * as Card from '$lib/components/ui/card';
  import axiosInstance from '$lib/axios.js';
  import axios from 'axios';
  import { dndzone } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import * as Avatar from '$lib/components/ui/avatar';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import {
    RnsCard,
    RnsCreateDialog
  } from '$lib/components/startups/rns/index.js';
  import { Ellipsis, Kanban, TableIcon } from 'lucide-svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as Table from '$lib/components/ui/table';
  import { log10 } from 'chart.js/helpers';
  import type { RNSItem } from '$lib/types.js';

  const { data } = $props();
  const { access, startupId } = data;

  const queryArray = [
    {
      queryKey: ['allowRNS', startupId],
      queryFn: () => getData(`/startups/${startupId}/allow-tasks/`, access!)
    },
    {
      queryKey: ['rnsData'],
      queryFn: () => getData(`/rns/?startupId=${startupId}`, access!)
    },
    {
      queryKey: ['readinessData'],
      queryFn: () => getData(`/readinesslevel/readiness-levels/`, access!)
    },
    {
      queryKey: ['startupData'],
      queryFn: () => getData(`/startups/${startupId}`, access!)
    }
  ];
  const rnsQueries = useQueries(queryArray);
  const { isLoading, isError } = $derived(useQueriesState(queryArray));
  const isAccessible = $derived($rnsQueries[0].data);
  let selectedTab = $state(getSelectedTab('rns'));

  const updateRnsTab = (tab: string) => {
    selectedTab = updateTab('rns', tab);
  };

  const columns = $state(getColumns());
  const readiness = $state(getReadiness());

  const members = $derived(
    $rnsQueries[3].isSuccess
      ? [
          ...$rnsQueries[3].data.members.map(
            (member: { id: number; email: string; firstName: string; lastName: string }) => ({
              userId: member.id,
              startupId: $rnsQueries[3].data.id,
              firstName: member.firstName,
              lastName: member.lastName,
              email: member.email,
              selected: false
            })
          ),
          {
            userId: $rnsQueries[3].data.user.id,
            startupId: $rnsQueries[3].data.id,
            firstName: $rnsQueries[3].data.user.firstName,
            lastName: $rnsQueries[3].data.user.lastName,
            email: $rnsQueries[3].data.user.email,
            selected: false
          }
        ]
      : []
  );

  const views = $derived(
    selectedTab === 'rns'
      ? [
          {
            name: 'Long Term',
            value: 999,
            items: [],
            show: true
          },
          ...columns
        ]
      : readiness
  );

  $effect(() => {
    const searchParam = $page.url.searchParams.get('tab');
    selectedTab = getSavedTab('rns', searchParam);
  });

  let generatingRNS = false;
  let generatingType = 'Technology';
  let open = $state(false);
  const generateRNS = async (type: string) => {
    generatingRNS = true;
    await axios.all([
      await axiosInstance.post(
        `/tasks/tasks/generate-tasks/`,
        {
          startup_id: data.startupId,
          term: 1,
          readiness_type: type,
          no_of_tasks_to_create: 1
        },
        {
          headers: {
            Authorization: `Bearer ${data.access}`
          }
        }
      ),
      await axiosInstance.post(
        `/tasks/tasks/generate-tasks/`,
        {
          startup_id: data.startupId,
          term: 2,
          readiness_type: type,
          no_of_tasks_to_create: 1
        },
        {
          headers: {
            Authorization: `Bearer ${data.access}`
          }
        }
      )
    ]);
    generatingRNS = false;
    $rnsQueries[1].refetch();
    toast.success(`Successfully generated ${generatingType} RNS`);
  };

  const addToRNS = async (id: number) => {
    const length = columns[1].items.length;

    await axiosInstance.patch(
      `/rns/tasks/${id}/`,
      {
        status: 4,
        is_ai_generated: false,
        priority_number: length
      },
      {
        headers: {
          Authorization: `Bearer ${data.access}`
        }
      }
    );
    toast.success('Successfuly added to RNS');
    $rnsQueries[1]
      .refetch()
      .then((res) => {
        columns.forEach((column) => {
          column.items = res.data
            .filter(
              (data: any) =>
                data.isAiGenerated === false &&
                data.status === column.value &&
                data.task_type === 1
            )
            .sort((a: any, b: any) => a.order - b.order);
        });
      })
      .finally(async () => await updatePriorityNumber());
  };

  const createRns = async (payload: any) => {
    const statuses = [
      'Discontinued',
      'Scheduled',
      'Track',
      'Delayed',
      'Completed'
    ];

    await axiosInstance.post(
      '/rns',
      {
        ...payload,
        status
      },
      {
        headers: {
          Authorization: `Bearer ${data.access}`
        }
      }
    );
    toast.success('Successfully created the RNS');
    open = false;
    $rnsQueries[1]
      .refetch()
      .then((res) => {
        columns.forEach((column) => {
          column.items = res.data
            .filter(
              (data: any) =>
                data.isAiGenerated === false && data.status === column.value
            )
            .sort((a: any, b: any) => a.priorityNumber - b.priorityNumber);
        });
      })
      .finally(async () => {
        await updatePriorityNumber();
      });
  };

  const updatedEditRNS = async (
    id: number,
    payload: { readinessType: string }
  ) => {
    await axiosInstance.patch(`/rns/${id}/`, payload, {
      headers: {
        Authorization: `Bearer ${data.access}`
      }
    });

    toast.success('Successfully updated the RNS');
    open = false;
    $rnsQueries[1].refetch().then((res) => {
      columns.forEach((column) => {
        column.items = res.data
          .filter(
            (data: any) =>
              data.isAiGenerated === false && data.status === column.value
          )
          .sort((a: any, b: any) => a.order - b.order);
      });
    });
  };

  const deleteRNS = async (id: number, index: number) => {
    try {
      await axiosInstance.delete(`/rns/${id}/`, {
        headers: {
          Authorization: `Bearer ${data.access}`
        }
      });
      toast.success('Successfuly deleted a task');
      columns.forEach((column) => {
        column.items = column.items.filter((item: any) => item.id !== id);
      });

      await $rnsQueries[1].refetch();
      await updatePriorityNumber();
    } catch (error) {
      console.error('Error deleting RNS: ', error);
      toast.error('Failed to delete RNS');
    }
  };

  function handleDndConsider(e: CustomEvent<DndEvent<RNSItem>>, x: number) {
    columns[x].items = e.detail.items;
  }

  async function handleDndFinalize(e: CustomEvent<DndEvent<RNSItem>>, x: number, status: number) {
    columns[x].items = e.detail.items;
    if (e.detail.info.trigger === 'droppedIntoZone') {
      const task = e.detail.items.find((t: any) => t.id == e.detail.info.id);
      await axiosInstance.patch(
        `/rns/${task.id}/`,
        {
          status
        },
        {
          headers: {
            Authorization: `Bearer ${data.access}`
          }
        }
      );

      updatePriorityNumber();
      setTimeout(() => $rnsQueries[1].refetch(), 250);
    }
  }

  const updatePriorityNumber = async () => {
    const updatePromises: any = [];

    let counter = 1;

    columns.forEach((column) => {
      column.items.forEach((item: any) => {
        item.priorityNumber = counter;
        updatePromises.push(
          axiosInstance.patch(
            `/rns/${item.id}/`,
            { priorityNumber: counter },
            { headers: { Authorization: `Bearer ${data.access}` } }
          )
        );
        counter++;
      });
    });

    try {
      await Promise.all(updatePromises);
      console.log('All tasks updated successfully');
    } catch (error) {
      $rnsQueries[1].refetch();
      toast.error('Error updating');
      console.error('Failed to update tasks', error);
    }
  };

  let longTerms = $state([]);

  $effect(() => {
    if (!isLoading && $rnsQueries[1].isSuccess && Array.isArray($rnsQueries[1].data)) {
      columns.forEach((column) => {
        column.items = $rnsQueries[1].data
          ? $rnsQueries[1].data
              .filter(
                (data: any) =>
                  data.isAiGenerated === false && data.status === column.value
              )
              .sort((a: any, b: any) => a.priorityNumber - b.priorityNumber)
          : [];
      });
    }
  });

  const onOpenChange = () => {
    open = !open;
  };

  const showDialog = () => {
    open = true;
  };

  let status = $state(1);

  const updateStatus = (newStatus: number) => {
    status = newStatus;
  };
  const selectedMembers: any = $state([]);

  const toggleMemberSelection = (index: number) => {
    if (index === 999) {
      const userIndex = selectedMembers.indexOf(999);
      if (userIndex !== -1) {
        selectedMembers.splice(userIndex, 1);
      } else {
        selectedMembers.push(index);
      }
    } else {
      const userId = members[index].userId;
      const userIndex = selectedMembers.indexOf(userId);

      if (userIndex !== -1) {
        selectedMembers.splice(userIndex, 1);
      } else {
        selectedMembers.push(userId);
      }
    }
  };

  let selectedFormat = $state('board');

  let taskType = $state(3);

  const updateTaskType = (newType: number) => {
    taskType = newType;
  };
</script>

{#if isLoading}
  {@render loading()}
{:else if isError}
  {@render error()}
{:else if isAccessible}
  {@render accessible()}
{:else}
  {@render fallback()}
{/if}

<svelte:head>
  <title
    >{$rnsQueries[3].isSuccess
      ? `${$rnsQueries[3].data.name} - Recommended Next Steps`
      : 'Loading'}</title
  >
</svelte:head>

<RnsCreateDialog
  {open}
  {onOpenChange}
  create={createRns}
  {startupId}
  {members}
  {status}
/>
{#snippet card(rns: any, ai = false, index: number)}
  <RnsCard
    {rns}
    {members}
    update={updatedEditRNS}
    {ai}
    addToRns={addToRNS}
    deleteRns={deleteRNS}
    {index}
    role={data.role}
  />
{/snippet}

{#snippet loading()}
  <div class="flex h-full flex-col gap-3">
    <div class="flex justify-between">
      <div class="flex gap-3">
        <div class="bg-background" class:hidden={data.role === 'Startup'}>
          <Skeleton class="h-9 w-[126px]" />
        </div>
        <div class="bg-background">
          <Skeleton class="h-9 w-[170px]" />
        </div>
        <div class="flex">
          {#each [1, 2] as item, index}
            <Skeleton
              class={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-background ${
                index !== 2 - 1 ? '-mr-1' : ''
              } `}
            >
              ?
            </Skeleton>
          {/each}
        </div>
      </div>
      <div class="ml-auto bg-background">
        <Skeleton class="h-9 w-[90px]" />
      </div>
    </div>

    <div class="grid h-full grid-cols-4 gap-5">
      <div class="h-full w-full bg-background">
        <Skeleton class="h-full" />
      </div>
      <div class="h-full w-full bg-background">
        <Skeleton class="h-full" />
      </div>
      <div class="h-full w-full bg-background">
        <Skeleton class="h-full" />
      </div>
      <div class="h-full w-full bg-background">
        <Skeleton class="h-full" />
      </div>
    </div>
  </div>
{/snippet}

{#snippet error()}{/snippet}

{#snippet accessible()}
  <div class="flex items-center justify-between">
    <div class="flex gap-3">
      <Can role={['Mentor', 'Manager as Mentor']} userRole={data.role}>
        <div class="flex h-fit justify-between rounded-lg bg-background">
          <AITabs {selectedTab} name="rns" updateTab={updateRnsTab} />
        </div>
      </Can>
      {#if selectedTab === 'rns'}
        <div class="flex h-fit justify-between rounded-lg bg-background">
          <Tabs.Root value={selectedFormat}>
            <Tabs.List class="border bg-flutter-gray/20">
              <Tabs.Trigger
                class="flex items-center gap-1"
                value="board"
                onclick={() => (selectedFormat = 'board')}
              >
                <Kanban class="h-4 w-4" />
                Board</Tabs.Trigger
              >
              <Tabs.Trigger
                class="flex items-center gap-1"
                value="table"
                onclick={() => (selectedFormat = 'table')}
              >
                <TableIcon class="h-4 w-4" />
                Table</Tabs.Trigger
              >
            </Tabs.List>
          </Tabs.Root>
        </div>
        <MembersFilter {members} {toggleMemberSelection} {selectedMembers} />
      {/if}
    </div>
    <div class="flex gap-2 items-center">
      {#if selectedFormat !== 'table'}
        <ShowHideColumns {views} />
      {/if}
      {#if data.role !== 'Startup'}
      <button
        class="ml-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 transition-colors"
        onclick={showDialog}
        type="button"
      >
        + Add
      </button>
      {/if}
    </div>
  </div>
  <div class="block w-full">
    {#if selectedTab === 'rns'}
      {#if selectedFormat === 'board'}
        <KanbanBoardRns
          {columns}
          {handleDndFinalize}
          {handleDndConsider}
          {card}
          {showDialog}
          role={data.role}
          {updateStatus}
          {selectedMembers}
          {taskType}
          {longTerms}
        />
      {:else}
        <div class="h-fit w-full rounded-md border">
          <Table.Root class="rounded-lg bg-background">
            <Table.Header>
              <Table.Row class="text-centery h-12">
                <Table.Head class="pl-5">Type</Table.Head>
                <Table.Head class="">Description</Table.Head>
                <Table.Head class="">Target Level</Table.Head>
                <Table.Head class="">Term</Table.Head>
                <Table.Head class="">Assignee</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each $rnsQueries[1].data.filter((data: any) => data.isAiGenerated === false) as item}
                {#if selectedMembers.includes(item.user.id) || selectedMembers.length === 0}
                  <Table.Row class="h-14 cursor-pointer">
                    <Table.Cell class="pl-5"
                      >{item.readiness_type_rl_type}</Table.Cell
                    >
                    <Table.Cell class=""
                      >{item.description.substring(0, 100)}</Table.Cell
                    >
                    <Table.Cell class="">{item.target_level_level}</Table.Cell>
                    <Table.Cell class=""
                      ><Badge
                        class={`${item.task_type === 1 ? 'bg-gray-700 hover:bg-gray-800' : 'bg-rose-700 hover:bg-rose-800'}`}
                        >{item.task_type === 1 ? 'Short' : 'Long'} Term</Badge
                      ></Table.Cell
                    >
                    <Table.Cell class=""
                      >{members.filter(
                          (member: any) => member.userId === item.assignee_id
                      )[0]?.firstName}
                      {members.filter(
                          (member: any) => member.userId === item.assignee_id
                      )[0]?.lastName}</Table.Cell
                    >
                  </Table.Row>
                {/if}
              {/each}
            </Table.Body>
          </Table.Root>
        </div>
      {/if}
    {:else}
      {#each readiness as readiness}
        <AIColumn name={readiness.name} generate={generateRNS} role={data.role}>
          {#each $rnsQueries[1].data.filter((data: any) => data.readiness_type_rl_type === readiness.name && data.is_ai_generated === true) as item, index}
            <div>
              {@render card(item, true, index)}
            </div>
          {/each}
        </AIColumn>
      {/each}
    {/if}
  </div>
{/snippet}

{#snippet fallback()}{/snippet}
