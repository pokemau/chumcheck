<script lang="ts">
  import Users from 'lucide-svelte/icons/users';
  import * as Card from '$lib/components/ui/card/index.js';
  import { useQueries, useQuery } from '@sveltestack/svelte-query';
  import axiosInstance from '$lib/axios';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import BarChart from '$lib/components/shared/BarChart.svelte';

  let { data } = $props();

  const analyticsQueries = useQueries([
    {
      queryKey: ['analytics'],
      queryFn: async () =>
        (
          await axiosInstance.get(`/analytics/startups/?cohort_id=1`, {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          })
        ).data,

      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false
    },
    {
      queryKey: ['logs'],
      queryFn: async () =>
        (
          await axiosInstance.get(`/analytics/elevate-logs/`, {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          })
        ).data,

      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false
    },
    {
      queryKey: ['cohorts'],
      queryFn: async () =>
        (
          await axiosInstance.get(`/cohorts`, {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          })
        ).data,

      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false
    }
  ]);

  const isLoading = $derived($analyticsQueries[0].isLoading || $analyticsQueries[1].isLoading);
  const isError = $derived($analyticsQueries[0].isError || $analyticsQueries[1].isError);

  $effect(() => {
    if ($analyticsQueries[2].isSuccess) {
      console.log($analyticsQueries[2].data.results);
    }
  });
</script>

<div class="flex h-full flex-col gap-3">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-3xl font-bold">Cohorts</h2>
      <p class="text-muted-foreground">
        Manage startup batches, track progress, and analyze trends to measure your platform's
        impact.
      </p>
    </div>
  </div>
  {#if isLoading}
    {@render loading()}
  {:else if isError}
    {@render error()}
  {:else}
    {@render fallback()}
  {/if}
</div>
<svelte:head>
  <title>ChumCheck - Analytics</title>
</svelte:head>
{#snippet loading()}
  <div class="grid h-[175px] grid-cols-4 gap-3">
    {#each [1, 2, 3, 4] as column}
      <Skeleton class="h-full w-full" />
    {/each}
  </div>
{/snippet}

{#snippet error()}{/snippet}

{#snippet fallback()}
  <div class="grid h-[175px] grid-cols-4 gap-3">
    <Card.Root>
      <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="text-lg font-medium">Number of Users</Card.Title>
        <Users class="h-4 w-4 text-muted-foreground" />
      </Card.Header>
      <Card.Content>
        <div class="text-4xl font-bold">{$analyticsQueries[0].data.num_of_users}</div>
      </Card.Content>
    </Card.Root>
    <Card.Root>
      <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="text-lg font-medium">Number of Startups</Card.Title>
        <Users class="h-4 w-4 text-muted-foreground" />
      </Card.Header>
      <Card.Content>
        <div class="text-4xl font-bold">{$analyticsQueries[0].data.num_startups}</div>
      </Card.Content>
    </Card.Root>
    <Card.Root>
      <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="text-lg font-medium">Number of Elevated Startups</Card.Title>
        <Users class="h-4 w-4 text-muted-foreground" />
      </Card.Header>
      <Card.Content>
        <div class="text-2xl font-bold">{$analyticsQueries[0].data.num_elevated_startups}</div>
      </Card.Content>
    </Card.Root>
    <Card.Root>
      <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="text-lg font-medium">Average Completed Tasks</Card.Title>
        <Users class="h-4 w-4 text-muted-foreground" />
      </Card.Header>
      <Card.Content>
        <div class="text-2xl font-bold">{$analyticsQueries[0].data.average_completed_tasks}</div>
      </Card.Content>
    </Card.Root>
  </div>
  <div class="flex flex-1 gap-3">
    <Card.Root class="h-full w-4/6">
      <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="font-medium">Elevated Startups per Type</Card.Title>
        <Users class="h-4 w-4 text-muted-foreground" />
      </Card.Header>
      <Card.Content class="flex h-[500px] w-full items-center justify-center">
        <BarChart id={1123} x={$analyticsQueries[0].data.elevated_startups_per_type} />
      </Card.Content>
    </Card.Root>
    <Card.Root class="h-full flex-1">
      <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="font-medium">Elevated Logs</Card.Title>
        <Users class="h-4 w-4 text-muted-foreground" />
      </Card.Header>
      <Card.Content>
        <ul class="flex h-[500px] list-disc flex-col gap-3 overflow-scroll pl-2">
          {#each $analyticsQueries[1].data.logs as item}
            <li><div class="text-base">{item}</div></li>
          {/each}
        </ul>
      </Card.Content>
    </Card.Root>
  </div>
{/snippet}
