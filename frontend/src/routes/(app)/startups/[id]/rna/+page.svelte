<script lang="ts">
  import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
  import {
    AIColumn,
    AITabs,
    Can,
    Column,
    MembersFilter,
    ShowHideColumns
  } from '$lib/components/shared';
  import { getData, getReadiness, getSavedTab, getSelectedTab, updateTab } from '$lib/utils';
  import { useQueries } from '@sveltestack/svelte-query';
  import { page } from '$app/stores';
  import { RnaCard, RnaCreateDialog, RnaDialog } from '$lib/components/startups/rna';
  import type { Actions } from '$lib/types';
  import { Button } from '$lib/components/ui/button';
  import { Ellipsis, Loader, Plus, Sparkles } from 'lucide-svelte';
  import axiosInstance from '$lib/axios';
  import { toast } from 'svelte-sonner';
  import * as Card from '$lib/components/ui/card';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Skeleton } from '$lib/components/ui/skeleton';

  const { data } = $props();
  const { access, startupId } = data;

  const rnaQueries = useQueries([
    {
      queryKey: ['allowRNA', startupId],
      queryFn: () => getData(`/startups/${startupId}/allow-rnas/`, access!)
    },
    {
      queryKey: ['rnaData'],
      queryFn: () => getData(`/startup-rna/?startup_id=${startupId}`, access!)
    },
    {
      queryKey: ['readinessData'],
      queryFn: () => getData(`/startup-readiness-levels/?startup_id=${startupId}`, access!)
    },
    {
      queryKey: ['startupData'],
      queryFn: () => getData(`/startups/${startupId}`, access!)
    }
  ]);

  const { isLoading, isError } = $derived(useQueriesState($rnaQueries));
  const isAccessible = $derived($rnaQueries[0].data);

  let selectedTab = $state(getSelectedTab('rna'));
  const readiness = $state(getReadiness());
  const aiReadiness = $state(getReadiness());

  const updateRnaTab = (tab: string) => {
    selectedTab = updateTab('rna', tab);
  };

  const views = $derived(selectedTab === 'rna' ? readiness : aiReadiness);

  $effect(() => {
    const searchParam = $page.url.searchParams.get('tab');
    selectedTab = getSavedTab('rna', searchParam);
  });

  let open = $state(false);
  let action: Actions = $state('View');
  const onOpenChange = () => {
    open = !open;
  };

  const openDialog = () => {
    open = true;
  };

  let generatingRNA = $state(false);

  const generateRNA = async () => {
    generatingRNA = true;
    await axiosInstance.get(`/startups/${data.startupId}/generate-rna/`, {
      headers: {
        Authorization: `Bearer ${data.access}`
      }
    });
    generatingRNA = false;
    toast.success('Successfuly generated RNA');
    $rnaQueries[1].refetch();
  };

  const checkIfExist = (id: number) => {
    const toBeAdded = $rnaQueries[1].data.results.find((item: any) => item.id === id);
    const existingItem = $rnaQueries[1].data.results.find(
      (d: any) =>
        d.is_ai_generated === false && d.readiness_type_rl_type === toBeAdded.readiness_type_rl_type
    );

    if (existingItem) {
      return true;
    }

    return false;
  };

  const addToRNA = async (id: number) => {
    const toBeAdded = $rnaQueries[1].data.results.find((item: any) => item.id === id);
    const existingItem = $rnaQueries[1].data.results.find(
      (d: any) =>
        d.is_ai_generated === false && d.readiness_type_rl_type === toBeAdded.readiness_type_rl_type
    );

    if (existingItem) {
      await axiosInstance.delete(`/startup-rna/${existingItem.id}/`, {
        headers: {
          Authorization: `Bearer ${data.access}`
        }
      });
      toast.info('Existing RNA data with the same readiness type deleted');
    }

    await axiosInstance.patch(
      `/startup-rna/${id}/`,
      {
        is_ai_generated: false
      },
      {
        headers: {
          Authorization: `Bearer ${data.access}`
        }
      }
    );
    toast.success('Successfuly added to RNA');
    $rnaQueries[1].refetch().then(() => (open = false));
  };

  const createRna = async (payload: any) => {
    console.log(payload);
    await axiosInstance.post(
      '/startup-rna/',
      { ...payload, status },
      {
        headers: {
          Authorization: `Bearer ${data.access}`
        }
      }
    );
    toast.success('Successfully created the Roadblocks');
    open = false;
    $rnaQueries[1].refetch();
  };

  const editRNA = async (id: number, description: string) => {
    await axiosInstance.patch(
      `/startup-rna/${id}/`,
      {
        rna: description
      },
      {
        headers: {
          Authorization: `Bearer ${data.access}`
        }
      }
    );
    toast.success('Successfuly updated the RNA');
    open = false;
    $rnaQueries[1].refetch();
  };

  const deleteRNA = async (id: number, index: number) => {
    await axiosInstance.delete(`/startup-rna/${Number(id)}/`, {
      headers: {
        Authorization: `Bearer ${data.access}`
      }
    });
    toast.success('Successfuly deleted the RNA');
    $rnaQueries[1].refetch();
  };

  $effect(() => {
    console.log($rnaQueries[1].data);
  });

  const currentCondition = $derived(selectedTab === 'rna' ? false : true);
  // is_ai_generated, readiness_level_id, startup_id, rna, readiness_type_rl_type
  $effect(() => {
    if ($rnaQueries[1].isSuccess) {
      console.log($rnaQueries[1].data);
    }
  });

  const readinessData = $derived(
    $rnaQueries[2].isSuccess
      ? $rnaQueries[2].data.results
          .slice(-6)
          .sort((a: any, b: any) => a.readiness_type.localeCompare(b.readiness_type))
      : []
  );

  $effect(() => {
    if ($rnaQueries[2].isSuccess) {
      console.log(
        $rnaQueries[2].data.results
          .slice(-6)
          .sort((a: any, b: any) => a.readiness_type.localeCompare(b.readiness_type))
      );
    }
  });
</script>

<svelte:head>
  <title
    >{$rnaQueries[3].isSuccess
      ? `${$rnaQueries[3].data.name} - Readiness and Needs Assessment`
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

<RnaCreateDialog {open} {onOpenChange} create={createRna} {startupId} {readinessData} />

{#snippet loading()}
  <div class="flex h-full flex-col gap-3">
    {#if data.role !== 'Startup'}
      <div class="flex justify-between">
        <div class="bg-background">
          <Skeleton class="h-9 w-[127px]" />
        </div>
        <div class="ml-auto bg-background">
          <Skeleton class="h-9 w-[82px]" />
        </div>
      </div>
    {/if}

    <div class="grid h-full grid-cols-4 gap-5">
      <div class="h-full w-full bg-background">
        <Skeleton class="h-[180px]" />
      </div>
      <div class="h-full w-full bg-background">
        <Skeleton class="h-[180px]" />
      </div>
      <div class="h-full w-full bg-background">
        <Skeleton class="h-[180px]" />
      </div>
    </div>
  </div>
{/snippet}

{#snippet error()}{/snippet}

{#snippet accessible()}
  <div class="flex items-center justify-between">
    <Can role={['Mentor', 'Manager as Mentor']} userRole={data.role}>
      <div class="flex gap-3">
        <div class="flex h-fit justify-between rounded-lg bg-background">
          <AITabs {selectedTab} name="rna" updateTab={updateRnaTab} />
        </div>
      </div>
    </Can>
    <div class="ml-auto flex items-center gap-3">
      {#if selectedTab === 'ai-rna'}
        <Button onclick={generateRNA} disabled={generatingRNA}>
          {#if generatingRNA}
            <Loader class="mr-2 h-4 w-4 animate-spin" />
          {:else}
            <Sparkles class="h-4 w-4" />
          {/if}
          Generate</Button
        >
      {:else if data.role !== 'Startup'}
        <Button onclick={() => (open = true)}><Plus class="h-4 w-4" />Add</Button>
      {/if}
    </div>
  </div>
  <div class="grid w-full grid-cols-4 gap-5 overflow-scroll">
    {#each $rnaQueries[1].data.results.filter((d: any) => d.is_ai_generated === currentCondition) as rna, index}
      <RnaCard
        {rna}
        ai={selectedTab === 'rna' ? false : true}
        update={editRNA}
        deleteRna={deleteRNA}
        addToRna={addToRNA}
        role={data.role}
        {readinessData}
        {checkIfExist}
      />
    {/each}
  </div>
{/snippet}

{#snippet fallback()}
  <div>test</div>
{/snippet}

<!-- <RnaDialog {action} {open} {onOpenChange} /> -->
