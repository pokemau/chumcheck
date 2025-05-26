<script lang="ts">
  import {
    AIColumn,
    AITabs,
    Can,
    Column,
    KanbanBoard,
    KanbanBoardNew,
    MembersFilter,
    ShowHideColumns
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
  import * as Card from '$lib/components/ui/card';
  import { page } from '$app/stores';
  import axiosInstance from '$lib/axios.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { toast } from 'svelte-sonner';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { RoadblocksCard, RoadblocksCreateDialog } from '$lib/components/startups/roadblocks';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import { Ellipsis, Kanban, Loader, Sparkles, TableIcon } from 'lucide-svelte';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as Table from '$lib/components/ui/table';

  const { data } = $props();
  const { access, startupId } = data;

  const roadblocksQueries = useQueries([
    {
      queryKey: ['allowRoadblocks', startupId],
      queryFn: () => getData(`/startups/${startupId}/allow-roadblocks/`, access!)
    },
    {
      queryKey: ['roadblocksData'],
      queryFn: () => getData(`/roadblocks/?startupId=${startupId}`, access!)
    },
    {
      queryKey: ['startupData'],
      queryFn: () => getData(`/startups/${startupId}`, access!)
    }
  ]);

  const { isLoading, isError } = $derived(useQueriesState($roadblocksQueries));
  const isAccessible = $derived($roadblocksQueries[0].data);
  let selectedTab = $state(getSelectedTab('roadblocks'));

  const updateRoadblocksTab = (tab: string) => {
    selectedTab = updateTab('roadblocks', tab);
  };

  const columns = $state(getColumns());
  const readiness = $state(getReadiness());
  const members = $derived(
    $roadblocksQueries[2].isSuccess
      ? (() => {
          const data = $roadblocksQueries[2].data;
          const baseMembers = data.members.map(({ id, email, firstName, lastName }) => ({
            userId: id,
            startupId: data.id,
            firstName,
            lastName,
            email,
            selected: false
          }));

          // Check if user is already in members
          const isUserInMembers = baseMembers.some(member => member.userId === data.user.id);

          if (!isUserInMembers) {
            baseMembers.push({
              userId: data.user.id,
              startupId: data.id,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
              selected: false
            });
          }

          return baseMembers;
        })()
      : []
  );

  $effect(() => {
    const searchParam = $page.url.searchParams.get('tab');
    selectedTab = getSavedTab('roadblocks', searchParam);

    // console.log(members)

    if ($roadblocksQueries[1].isSuccess) {
      // console.log($roadblocksQueries[1].data);
    }

    if (!isLoading) {
      columns.forEach((column) => {
        column.items = $roadblocksQueries[1].data.filter(
          (data) => data.isAiGenerated === false && data.status === column.value
        );
      });
    }

    // console.log($roadblocksQueries[1].data)
  });

  const createRoadblocks = async (payload: any) => {
    // console.log(payload);
    await axiosInstance.post(
      '/roadblocks/',
      { ...payload, riskNumber: 1 },
      {
        headers: {
          Authorization: `Bearer ${data.access}`
        }
      }
    );
    toast.success('Successfully created the Roadblocks');
    open = false;
    $roadblocksQueries[1]
      .refetch()
      .then((res) => {
        columns.forEach((column) => {
          column.items = res.data.filter(
            (data) => data.isAiGenerated === false && data.status === column.value
          );
        });
      })
      .finally(async () => await updateRiskNumber());
  };

  const editRoadblock = async (
    id: number,
    riskNumber: number,
    description: string,
    fix: string,
    assigneeId: number
  ) => {
    await axiosInstance.patch(
      `/roadblocks/${id}/`,
      {
        riskNumber: riskNumber,
        description,
        fix,
        assignee_id: assigneeId
      },
      {
        headers: {
          Authorization: `Bearer ${data.access}`
        }
      }
    );
    toast.success('Successfuly updated the RNA');
    // open = false;
    $roadblocksQueries[1].refetch();
  };

  const updatedEditRoadblock = async (id: number, payload: any) => {
    await axiosInstance.patch(`/roadblocks/${id}/`, payload, {
      headers: {
        Authorization: `Bearer ${data.access}`
      }
    });
    toast.success('Successfuly updated the RNA');
    // open = false;
    $roadblocksQueries[1].refetch().then((res) => {
      columns.forEach((column) => {
        column.items = res.data.filter(
          (data) => data.isAiGenerated === false && data.status === column.value
        );
      });
    });
  };

  const deleteRoadblock = async (id: number) => {
    await axiosInstance.delete(`/roadblocks/${id}/`, {
      headers: {
        Authorization: `Bearer ${data.access}`
      }
    });
    toast.success('Successfuly deleted a task');
    $roadblocksQueries[1]
      .refetch()
      .then((res) => {
        columns.forEach((column) => {
          column.items = res.data.filter(
            (data: any) => data.isAiGenerated === false && data.status === column.value
          );
        });
      })
      .finally(async () => await updateRiskNumber());
  };

  function handleDndConsider(e: any, x: number) {
    columns[x].items = e.detail.items;
  }

  async function handleDndFinalize(e: any, x: number, status: number) {
    columns[x].items = e.detail.items;
    if (e.detail.info.trigger == 'droppedIntoZone') {
      const task = e.detail.items.find((t) => t.id == e.detail.info.id);
      await axiosInstance.patch(
        `/roadblocks/${task.id}/`,
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

    updateRiskNumber();
  }

  const updateRiskNumber = async () => {
    const updatePromises: any = [];

    let counter = 1;
    // Completed
    columns[0].items.map((item: any) => {
      item.riskNumber = counter;
      updatePromises.push(
        axiosInstance.patch(
          `/roadblocks/${item.id}/`,
          {
            riskNumber: counter
          },
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        )
      );
      counter++;
    });
    // Delayed
    columns[1].items.map((item: any) => {
      item.riskNumber = counter;
      updatePromises.push(
        axiosInstance.patch(
          `/roadblocks/${item.id}/`,
          {
            riskNumber: counter
          },
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        )
      );
      counter++;
    });
    // Track
    columns[2].items.map((item: any) => {
      item.riskNumber = counter;
      updatePromises.push(
        axiosInstance.patch(
          `/roadblocks/${item.id}/`,
          {
            riskNumber: counter
          },
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        )
      );
      counter++;
    });
    // Scheduled
    columns[3].items.map((item: any) => {
      item.riskNumber = counter;
      updatePromises.push(
        axiosInstance.patch(
          `/roadblocks/${item.id}/`,
          {
            riskNumber: counter
          },
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        )
      );
      counter++;
    });
    // Discontinued
    columns[4].items.map((item: any) => {
      item.riskNumber = counter;
      updatePromises.push(
        axiosInstance.patch(
          `/roadblocks/${item.id}/`,
          {
            riskNumber: counter
          },
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        )
      );
      counter++;
    });

    try {
      // Execute all update requests concurrently
      await Promise.all(updatePromises);
      // $rnsQueries[1].refetch();
      console.log('All tasks updated successfully');
    } catch (error) {
      $roadblocksQueries[1].refetch();
      toast.error('Error updating');
      console.error('Failed to update tasks', error);
    }
  };

  let generatingRoadblocks: boolean = $state(false);
  const generateRoadblocks = async () => {
    generatingRoadblocks = true;
    await axiosInstance.post(
      `/roadblocks/generate-roadblocks/`,
      {
        startupId: data.startupId,
        no_of_roadblocks_to_create: 3
      },
      {
        headers: {
          Authorization: `Bearer ${data.access}`
        }
      }
    );
    generatingRoadblocks = false;
    $roadblocksQueries[1].refetch();
    toast.success('Successfully generated Roadblocks');
  };

  const addToRoadblocks = async (id: number) => {
    await axiosInstance.patch(
      `/roadblocks/${id}/`,
      {
        //status change
        status: 4,
        isAiGenerated: false
      },
      {
        headers: {
          Authorization: `Bearer ${data.access}`
        }
      }
    );
    toast.success('Successfuly added to RNA');
    $roadblocksQueries[1]
      .refetch()
      .then((res) => {
        columns.forEach((column) => {
          column.items = res.data.filter(
            (data) => data.isAiGenerated === false && data.status === column.value
          );
        });
      })
      .finally(async () => await updateRiskNumber());
  };

  let open = $state(false);
  const showDialog = () => {
    open = true;
  };
  const onOpenChange = () => {
    open = !open;
  };
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
    >{$roadblocksQueries[2].isSuccess
      ? `${$roadblocksQueries[2].data.name} - Roadblocks`
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

<RoadblocksCreateDialog
  {open}
  {onOpenChange}
  {members}
  {startupId}
  create={createRoadblocks}
  status={1}
/>

{#snippet card(roadblocks: any, index: number)}
  <RoadblocksCard
    {roadblocks}
    {members}
    ai={false}
    update={updatedEditRoadblock}
    {addToRoadblocks}
    deleteRoadblocks={deleteRoadblock}
    role={data.role}
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

{#snippet error()}
  error
{/snippet}

{#snippet accessible()}
  <div class="flex items-center justify-between">
    <div class="flex gap-3">
      <Can role={['Mentor', 'Manager as Mentor']} userRole={data.role}>
        <div class="flex h-fit justify-between rounded-lg bg-background">
          <AITabs {selectedTab} name="roadblocks" realName="Roadblocks" updateTab={updateRoadblocksTab} />
        </div>
      </Can>
      {#if selectedTab === 'roadblocks'}
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
    <div class="flex items-center gap-3">
      {#if selectedTab === 'ai-roadblocks'}
        <Button
          class="ml-auto hidden rounded-lg lg:flex"
          onclick={generateRoadblocks}
          disabled={generatingRoadblocks}
        >
          {#if generatingRoadblocks}
            <Loader class="mr-2 h-4 w-4 animate-spin" />
          {:else}
            <Sparkles class="mr-2 h-4 w-4" />
          {/if}
          Generate
        </Button>
      {:else}
        <ShowHideColumns views={columns} />
      {/if}
      {#if data.role !== 'Startup'}
        <button
          class="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 transition-colors"
          onclick={showDialog}
          type="button"
        >
          + Add
        </button>
      {/if}
    </div>
  </div>
  {#if selectedTab === 'roadblocks'}
    {#if selectedFormat === 'board'}
      <div class="block w-full">
        <KanbanBoardNew
          {columns}
          {handleDndFinalize}
          {handleDndConsider}
          {card}
          {showDialog}
          role={data.role}
          {updateStatus}
          {selectedMembers}
        />
      </div>
    {:else}
      <div class="h-fit w-full rounded-md border">
        <Table.Root class="rounded-lg bg-background">
          <Table.Header>
            <Table.Row class="text-centery h-12">
              <Table.Head class="pl-5">Description</Table.Head>
              <Table.Head class="">Risk Number</Table.Head>
              <Table.Head class="">Assignee</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each $roadblocksQueries[1].data.filter((data) => data.isAiGenerated === false) as item}
              {#if selectedMembers.includes(item.assignee) || selectedMembers.length === 0}
                <Table.Row class="h-14 cursor-pointer">
                  <Table.Cell class="pl-5">{item.description.substring(0, 100)}</Table.Cell>
                  <Table.Cell class="">{item.riskNumber}</Table.Cell>
                  <Table.Cell class=""
                    >{members.filter((member: any) => member.userId === item.assignee)[0]
                      ?.firstName}
                    {members.filter((member: any) => member.userId === item.assignee)[0]
                      ?.lastName}</Table.Cell
                  >
                </Table.Row>
              {/if}
            {/each}
          </Table.Body>
        </Table.Root>
      </div>
    {/if}
  {:else}
    <div class="grid w-full grid-cols-4 gap-5 overflow-auto">
      {#each $roadblocksQueries[1].data.filter((data: any) => data.isAiGenerated === true) as r, index}
        <RoadblocksCard
          roadblocks={r}
          update={updatedEditRoadblock}
          {addToRoadblocks}
          deleteRoadblocks={deleteRoadblock}
          ai={true}
          {members}
          role={data.role}
          {index}
        />
      {/each}
    </div>
  {/if}
{/snippet}

{#snippet fallback()}
  <div>fallback</div>
{/snippet}
