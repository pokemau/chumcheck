<script lang="ts">
  import {
    AIColumn,
    AITabs,
    Can,
    Column,
    KanbanBoard,
    MembersFilter,
    ShowHideColumns
  } from '$lib/components/shared';
  import {
    getData,
    getColumns,
    getReadiness,
    getSavedTab,
    getSelectedTab,
    updateTab
  } from '$lib/utils';
  import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
  import { useQueries } from '@sveltestack/svelte-query';
  import { page } from '$app/stores';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import axiosInstance from '$lib/axios';
  import axios from 'axios';
  import { toast } from 'svelte-sonner';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { InitiativeCard, InitiativeCreateDialog } from '$lib/components/startups/initiatives';
  import { Ellipsis, Kanban, TableIcon } from 'lucide-svelte';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as Table from '$lib/components/ui/table';

  const { data } = $props();
  const { access, startupId } = data;
  const initiativesQueries = useQueries([
    {
      queryKey: ['allowRNS', startupId],
      queryFn: () => getData(`/startups/${startupId}/allow-initiatives/`, access!)
    },
    {
      queryKey: ['rnsDataInitiative'],
      queryFn: () => getData(`/tasks/tasks/?startup_id=${startupId}`, access!)
    },
    {
      queryKey: ['initiativesData'],
      queryFn: () => getData(`/tasks/initiatives/?startup_id=${startupId}`, access!)
    },
    {
      queryKey: ['startupData'],
      queryFn: () => getData(`/startups/${startupId}`, access!)
    }
  ]);

  const { isLoading, isError } = $derived(useQueriesState($initiativesQueries));
  const isAccessible = $derived($initiativesQueries[0].data);
  let selectedTab = $state(getSelectedTab('initiatives'));

  const updateInitiativeTab = (tab: string) => {
    selectedTab = updateTab('initiatives', tab);
  };

  const columns = $state(getColumns());
  const readiness = $state(getReadiness());
  const views = $derived(selectedTab === 'initiatives' ? columns : readiness);
  const members = $derived(
    $initiativesQueries[3].isSuccess
      ? [
          ...$initiativesQueries[3].data.members.map(({ id, ...rest }) => ({
            ...rest
          })),
          {
            user_id: $initiativesQueries[3].data.user_id,
            startup_id: $initiativesQueries[3].data.id,
            first_name: $initiativesQueries[3].data.leader_first_name,
            last_name: $initiativesQueries[3].data.leader_last_name,
            email: $initiativesQueries[3].data.leader_email,
            selected: false
          }
        ]
      : []
  );

  $effect(() => {
    const searchParam = $page.url.searchParams.get('tab');
    selectedTab = getSavedTab('initiatives', searchParam);
  });

  let generatingInitiatives = false;
  let generatingType = 'Technology';
  let open = $state(false);
  const generateInitiatives = async (type: string) => {
    generatingInitiatives = true;
    let ids = $initiativesQueries[1].data.results
      .filter(
        (data: any) =>
          data.readiness_type_rl_type.slice(0, 1) === type &&
          data.is_ai_generated === false &&
          data.task_type === 1
      )
      .map((d: any) => d.id);

    if (ids.length > 0) {
      const requests = ids.map(async (id: any) => {
        return await axiosInstance.post(
          `/tasks/initiatives/generate-initiatives/`,
          {
            task_id: id,
            no_of_initiatives_to_create: 3
          },
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        );
      });

      await axios.all(requests);
      $initiativesQueries[2].refetch();
      $initiativesQueries[1].refetch();
      toast.success(`Successfully generated initiatives`);
    } else {
      toast.error('No initiatives to generate');
    }

    generatingInitiatives = false;
  };

  const addToInitiatives = async (id: number) => {
    await axiosInstance.patch(
      `/tasks/initiatives/${id}/`,
      {
        status: 4,
        is_ai_generated: false
      },
      {
        headers: {
          Authorization: `Bearer ${data.access}`
        }
      }
    );
    toast.success('Successfuly added to Initiatives');
    $initiativesQueries[1].refetch().then(() => {
      $initiativesQueries[2]
        .refetch()
        .then((res) => {
          columns.forEach((column) => {
            column.items = res.data.results.filter(
              (data: any) => data.is_ai_generated === false && data.status === column.value
            );
          });
        })
        .finally(async () => await updateInitiativeNumber());
    });
  };

  const createInitiative = async (payload: any) => {
    console.log(payload);
    await axiosInstance.post(
      '/tasks/initiatives/',
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
    toast.success('Successfully created the Initiative');
    open = false;
    $initiativesQueries[2]
      .refetch()
      .then((res) => {
        columns.forEach((column) => {
          column.items = res.data.results.filter(
            (data: any) => data.is_ai_generated === false && data.status === column.value
          );
        });
      })
      .finally(async () => await updateInitiativeNumber());
  };

  const updatedEditInitiative = async (id: number, payload: any) => {
    await axiosInstance.patch(`/tasks/initiatives/${id}/`, payload, {
      headers: {
        Authorization: `Bearer ${data.access}`
      }
    });
    toast.success('Successfuly updated Initiatives');
    $initiativesQueries[1].refetch();
    $initiativesQueries[2].refetch();
  };

  const deleteInitiative = async (id: number) => {
    console.log(id);
    await axiosInstance.delete(`/tasks/initiatives/${id}/`, {
      headers: {
        Authorization: `Bearer ${data.access}`
      }
    });
    toast.success('Successfuly deleted a task');
    $initiativesQueries[1].refetch();
    $initiativesQueries[2].refetch();
  };

  function handleDndConsider(e: any, x: number) {
    columns[x].items = e.detail.items;
  }

  async function handleDndFinalize(e: any, x: number, status: number) {
    columns[x].items = e.detail.items;
    if (e.detail.info.trigger == 'droppedIntoZone') {
      const task = e.detail.items.find((t: any) => t.id == e.detail.info.id);
      await axiosInstance.patch(
        `/tasks/initiatives/${task.id}/`,
        {
          status
        },
        {
          headers: {
            Authorization: `Bearer ${data.access}`
          }
        }
      );
    }

    updateInitiativeNumber();
  }

  $effect(() => {
    if (!isLoading) {
      columns.forEach((column) => {
        column.items = $initiativesQueries[2].data.results.filter(
          (data: any) => data.is_ai_generated === false && data.status === column.value
        );
      });
    }
  });

  const updateInitiativeNumber = async () => {
    const updatePromises: any = [];

    let task_ids: any = [];
    let counters: any = [];
    // Completed
    columns[4].items.map((item: any) => {
      let indexOf = task_ids.indexOf(item.task_id);

      if (indexOf === -1) {
        // New task_id, initialize it
        task_ids.push(item.task_id);
        counters.push(1); // Start counter at 1
        indexOf = task_ids.length - 1; // Get the last index
      }

      const initiativeNumber = counters[indexOf]; // Get the current counter value
      item.initiative_number = initiativeNumber;

      updatePromises.push(
        axiosInstance.patch(
          `/tasks/initiatives/${item.id}/`,
          {
            initiative_number: initiativeNumber
          },
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        )
      );

      counters[indexOf] += 1;
    });
    // Delayed
    columns[3].items.map((item: any) => {
      let indexOf = task_ids.indexOf(item.task_id);

      if (indexOf === -1) {
        // New task_id, initialize it
        task_ids.push(item.task_id);
        counters.push(1); // Start counter at 1
        indexOf = task_ids.length - 1; // Get the last index
      }

      const initiativeNumber = counters[indexOf]; // Get the current counter value
      item.initiative_number = initiativeNumber;

      updatePromises.push(
        axiosInstance.patch(
          `/tasks/initiatives/${item.id}/`,
          {
            initiative_number: initiativeNumber
          },
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        )
      );

      counters[indexOf] += 1;
    });
    // Track
    columns[2].items.map((item: any) => {
      let indexOf = task_ids.indexOf(item.task_id);

      if (indexOf === -1) {
        // New task_id, initialize it
        task_ids.push(item.task_id);
        counters.push(1); // Start counter at 1
        indexOf = task_ids.length - 1; // Get the last index
      }

      const initiativeNumber = counters[indexOf]; // Get the current counter value
      item.initiative_number = initiativeNumber;

      updatePromises.push(
        axiosInstance.patch(
          `/tasks/initiatives/${item.id}/`,
          {
            initiative_number: initiativeNumber
          },
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        )
      );

      counters[indexOf] += 1;
    });
    // Scheduled
    columns[1].items.map((item: any) => {
      let indexOf = task_ids.indexOf(item.task_id);

      if (indexOf === -1) {
        // New task_id, initialize it
        task_ids.push(item.task_id);
        counters.push(1); // Start counter at 1
        indexOf = task_ids.length - 1; // Get the last index
      }

      const initiativeNumber = counters[indexOf]; // Get the current counter value
      item.initiative_number = initiativeNumber;

      updatePromises.push(
        axiosInstance.patch(
          `/tasks/initiatives/${item.id}/`,
          {
            initiative_number: initiativeNumber
          },
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        )
      );

      counters[indexOf] += 1;
    });
    // Discontinued
    columns[0].items.map((item: any) => {
      let indexOf = task_ids.indexOf(item.task_id);

      if (indexOf === -1) {
        // New task_id, initialize it
        task_ids.push(item.task_id);
        counters.push(1); // Start counter at 1
        indexOf = task_ids.length - 1; // Get the last index
      }

      const initiativeNumber = counters[indexOf]; // Get the current counter value
      item.initiative_number = initiativeNumber;

      updatePromises.push(
        axiosInstance.patch(
          `/tasks/initiatives/${item.id}/`,
          {
            initiative_number: initiativeNumber
          },
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        )
      );

      counters[indexOf] += 1;
    });

    try {
      // Execute all update requests concurrently
      await Promise.all(updatePromises);
      // $rnsQueries[1].refetch();
      console.log('All tasks updated successfully');
    } catch (error) {
      $initiativesQueries[1].refetch();
      toast.error('Error updating');
      console.error('Failed to update tasks', error);
    }
  };

  const showDialog = () => {
    open = true;
    console.log('test');
  };

  const onOpenChange = () => {
    open = !open;
  };

  const tasks = $derived(
    $initiativesQueries[1].isSuccess ? $initiativesQueries[1].data.results : []
  );

  let status = $state(4);

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
      const userId = members[index].user_id;
      const userIndex = selectedMembers.indexOf(userId);

      if (userIndex !== -1) {
        selectedMembers.splice(userIndex, 1);
      } else {
        selectedMembers.push(userId);
      }
    }
  };

  let selectedFormat = $state('board');
</script>

<svelte:head>
  <title
    >{$initiativesQueries[3].isSuccess
      ? `${$initiativesQueries[3].data.name} - Initiatives`
      : 'Loading'}</title
  >
</svelte:head>
{#if isLoading}
  {@render loading()}
{:else if isError}
  {@render error()}
{:else if isAccessible}
  {@render accessible()}
{:else}
  {@render fallback()}
{/if}

<InitiativeCreateDialog
  {open}
  {onOpenChange}
  {members}
  {startupId}
  create={createInitiative}
  {tasks}
  {status}
/>

{#snippet card(initiative: any, ai: any = false, index: number)}
  <InitiativeCard
    {initiative}
    {ai}
    {members}
    update={updatedEditInitiative}
    {deleteInitiative}
    addToInitiative={addToInitiatives}
    role={data.role}
    {tasks}
    {index}
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
          <AITabs {selectedTab} name="initiatives" updateTab={updateInitiativeTab} />
        </div>
      </Can>
      {#if selectedTab === 'initiatives'}
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
    {#if selectedFormat === 'board'}
      <ShowHideColumns {views} />
    {/if}
  </div>
  <div class="flex h-full gap-5 overflow-scroll">
    {#if selectedTab === 'initiatives'}
      {#if selectedFormat === 'board'}
        <KanbanBoard
          {columns}
          {handleDndFinalize}
          {handleDndConsider}
          {card}
          {showDialog}
          role={data.role}
          {updateStatus}
          {selectedMembers}
        />
      {:else}
        <div class="h-fit w-full rounded-md border">
          <Table.Root class="rounded-lg bg-background">
            <Table.Header>
              <Table.Row class="text-centery h-12">
                <Table.Head class="pl-5">Description</Table.Head>
                <Table.Head class="">Priority No.</Table.Head>
                <Table.Head class="">Initiative No.</Table.Head>
                <Table.Head class="">Assignee</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each $initiativesQueries[2].data.results.filter((data) => data.is_ai_generated === false) as item}
                {#if selectedMembers.includes(item.assignee_id) || selectedMembers.length === 0}
                  <Table.Row class="h-14 cursor-pointer">
                    <Table.Cell class="pl-5">{item.description.substring(0, 100)}</Table.Cell>
                    <Table.Cell class=""
                      >{tasks.filter((task) => task.id === item.task_id)[0]
                        .priority_number}</Table.Cell
                    >
                    <Table.Cell class="">{item?.initiative_number}</Table.Cell>
                    <Table.Cell class="">
                      {members.filter((member: any) => member.user_id === item.assignee_id)[0]
                        ?.first_name}
                      {members.filter((member: any) => member.user_id === item.assignee_id)[0]
                        ?.last_name}
                    </Table.Cell>
                  </Table.Row>
                {/if}
              {/each}
            </Table.Body>
          </Table.Root>
        </div>
      {/if}
    {:else}
      {#each readiness as readiness}
        {#if readiness.show}
          <AIColumn name={readiness.name} generate={generateInitiatives} role={data.role}>
            {#each $initiativesQueries[2].data.results.filter((data) => data.is_ai_generated === true) as item, index}
              {@const ids = $initiativesQueries[1].data.results
                .filter(
                  (data) =>
                    data.readiness_type_rl_type === readiness.name && data.is_ai_generated === false
                )
                .map((d) => d.id)}
              {@const cur = $initiativesQueries[1].data.results.filter(
                (data) =>
                  data.readiness_type_rl_type === readiness.name &&
                  data.is_ai_generated === false &&
                  data.id === item.task_id
              )[0]}
              {#if ids.includes(item.task_id)}
                <div>
                  {@render card(item, true, index)}
                </div>
              {/if}
            {/each}
          </AIColumn>
        {/if}
      {/each}
    {/if}
  </div>
{/snippet}

{#snippet fallback()}{/snippet}
