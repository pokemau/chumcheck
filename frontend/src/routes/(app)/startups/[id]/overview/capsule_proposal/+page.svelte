<script lang="ts">
  import { Label } from '$lib/components/ui/label/index.js';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textareav2';
  import axiosInstance from '$lib/axios';
  import { useQuery } from '@sveltestack/svelte-query';
  import type { PageData } from './$types';
  export let data: PageData;

  const queryResult = useQuery(
    'startupData',
    async () =>
      (
        await axiosInstance.get(`/startups/${data.startupId}`, {
          headers: {
            Authorization: `Bearer ${data.access}`
          }
        })
      ).data,
    {
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false
    }
  );

  $: if ($queryResult.isSuccess) {
    console.log($queryResult.data.capsuleProposal);
  }
</script>

<svelte:head>
  <title>Settings - Capsule Proposal</title>
</svelte:head>

<div class="flex h-[90vh] flex-col gap-5 overflow-y-auto">
  <h1 class="text-xl font-semibold">Capsule Proposal</h1>
  <div class="grid w-2/3 grid-cols-1 gap-5">
    <div class="grid gap-2">
      <Label for="firstName">Title</Label>
      {#if $queryResult.isLoading}
        <Skeleton class="h-10" />
      {:else}
        <Input
          name="firstName"
          id="firstName"
          type="firstName"
          required
          readonly
          value={$queryResult.data.capsuleProposal.title}
        />
      {/if}
    </div>

    <div class="grid gap-2">
      <Label for="lastName">Description</Label>
      {#if $queryResult.isLoading}
        <Skeleton class="h-10" />
      {:else}
        <Textarea
          rows={8}
          bind:value={$queryResult.data.capsuleProposal.description}
          class="text-justify text-base"
        />
      {/if}
    </div>

    <div class="grid gap-2">
      <Label for="lastName">Problem Statement</Label>
      {#if $queryResult.isLoading}
        <Skeleton class="h-10" />
      {:else}
        <Textarea
          rows={8}
          bind:value={$queryResult.data.capsuleProposal.problemStatement}
          class="text-justify text-base"
        />
      {/if}
    </div>

    <div class="grid gap-2">
      <Label for="lastName">Target Market</Label>
      {#if $queryResult.isLoading}
        <Skeleton class="h-10" />
      {:else}
        <Textarea
          rows={8}
          bind:value={$queryResult.data.capsuleProposal.targetMarket}
          class="text-justify text-base"
        />
      {/if}
    </div>

    <div class="grid gap-2">
      <Label for="lastName">Solution</Label>
      {#if $queryResult.isLoading}
        <Skeleton class="h-10" />
      {:else}
        <Textarea
          rows={8}
          bind:value={$queryResult.data.capsuleProposal.solution}
          class="text-justify text-base"
        />
      {/if}
    </div>

    <div class="grid gap-2">
      <Label for="lastName">Objectives</Label>
      {#if $queryResult.isLoading}
        <Skeleton class="h-10" />
      {:else}
        <Textarea
          rows={8}
          bind:value={$queryResult.data.capsuleProposal.objectives}
          class="text-justify text-base"
        />
      {/if}
    </div>

    <div class="grid gap-2">
      <Label for="lastName">Scope</Label>
      {#if $queryResult.isLoading}
        <Skeleton class="h-10" />
      {:else}
        <Textarea
          rows={8}
          bind:value={$queryResult.data.capsuleProposal.scope}
          class="text-justify text-base"
        />
      {/if}
    </div>

    <div class="grid gap-2">
      <Label for="lastName">Methodology</Label>
      {#if $queryResult.isLoading}
        <Skeleton class="h-10" />
      {:else}
        <Textarea
          rows={8}
          bind:value={$queryResult.data.capsuleProposal.methodology}
          class="text-justify text-base"
        />
      {/if}
    </div>
  </div>
</div>
