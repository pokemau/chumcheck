<script lang="ts">
  import { Skeleton } from '$lib/components/ui/skeleton';
  import Button from '$lib/components/ui/button/button.svelte';
  import { RocketIcon } from 'lucide-svelte';
  import { StartupCard } from '$lib/components/startups';
  import { Can } from '$lib/components/shared';
  import { useQuery } from '@sveltestack/svelte-query';
  import { getData } from '$lib/utils.js';
  import * as Dialog from '$lib/components/ui/dialog';
  import Application from '$lib/components/startup/Application.svelte';
  import { page } from '$app/stores';
  import { toast } from 'svelte-sonner';
  import * as Accordion from '$lib/components/ui/accordion/index.js';

  let { data } = $props();

  const queryResult = useQuery('startupData', () =>
    getData(`/startups/startups`, data.access!)
  );

  const role: any = data.role;

  const isLoading = $derived($queryResult.isLoading);
  const isError = $derived($queryResult.isError);
  const hasStartups = $derived(
    Array.isArray($queryResult.data) && $queryResult.data.length > 0
  );
  const listOfStartups = $derived(
    $queryResult.isSuccess && hasStartups ? $queryResult.data : []
  );

  let showApplicationForm = $state(false);
  const toggleApplicationForm = () => {
    showApplicationForm = !showApplicationForm;
  };

  $effect(() => {
    const success = $page.url.searchParams.get('success');
    if (success === 'true') {
      toast.success('Application successfull.');
      const url = new URL($page.url.href);
      url.searchParams.delete('success');
      history.replaceState(null, '', url);
    }
  });

  // For search/filter UI (not functional for now)
  let search = '';
  let filter = 'All Startups';
</script>

<svelte:head>
  <title>ChumCheck - Startups</title>
</svelte:head>

<div class="flex items-center justify-between mb-8">
  <div>
    <h2 class="text-3xl font-bold">Startups</h2>
    <p class="text-muted-foreground">Manage assigned startups</p>
  </div>
  <Can role={['Startup']} userRole={role}>
    <div class="flex gap-5">
      <Button
        class="flex items-center justify-center gap-2 rounded-lg"
        onclick={toggleApplicationForm}
      >
        <RocketIcon class="h-4 w-4" /> Apply
      </Button>
    </div>
  </Can>
</div>

<!-- Statistics Cards -->
<div class="grid grid-cols-4 gap-5 mb-8">
  
  <div class="rounded-lg bg-background p-5 flex flex-col gap-2 border border-border">
    <div class="text-muted-foreground text-sm">Total Startups</div>
    <div class="flex items-center gap-2">
      <span class="text-2xl font-bold">{listOfStartups.length}</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="flex flex-col items-center p-2 rounded-xl text-xs font-semibold border border-green-400 text-green-400 bg-green-950">
        <span>{listOfStartups.length}</span>
        <span>Active</span>
      </div>
      <div class="flex flex-col items-center p-2 rounded-xl text-xs font-semibold border border-blue-500 text-blue-500 bg-slate-900">
        <span>0</span>
        <span>Completed</span>
      </div>
      <div class="flex flex-col items-center p-2 rounded-xl text-xs font-semibold border border-yellow-400 text-yellow-400 bg-yellow-900">
        <span>0</span>
        <span>Paused</span>
      </div>
    </div>
  </div>

  <div class="rounded-lg bg-background p-5 flex flex-col gap-2 border border-border">
    <div class="text-muted-foreground text-sm">Initiatives Progress</div>
    <div class="flex items-center gap-2">
      <span class="text-2xl font-bold">51/93</span>
      <span class="ml-auto text-sm">53%</span>
    </div>
    <div class="w-full h-2 bg-gray-200 rounded">
      <div class="h-2 bg-blue-500 rounded" style="width:53%"></div>
    </div>
  </div>
  
  <div class="rounded-lg bg-background p-5 flex flex-col gap-2 border border-border">
    <div class="text-muted-foreground text-sm">Pending Consultations</div>
    <div class="flex items-center gap-2">
      <span class="text-2xl font-bold">4</span>
    </div>
    <div class="text-muted-foreground text-sm">Across 3 startups</div>
  </div>
  
  <div class="rounded-lg bg-background p-5 flex flex-col gap-2 border border-border">
    <div class="text-muted-foreground text-sm">Completion Rate</div>
    <div class="flex items-center gap-2">
      <span class="text-2xl font-bold">13%</span>
    </div>
    <div class="text-muted-foreground text-sm">1 of 7 startups completed</div>
  </div>
</div>

<!-- Search and Filters -->
<div class="mb-5">
  <div class="flex items-center gap-2 mb-2 w-[400px]">
    <div class="relative flex-1">
      <input
        class="w-full rounded-lg border border-[#2a3550] bg-background px-4 py-2 pr-12 text-sm text-white placeholder-[#b3bed7] focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Search startups..."  
        bind:value={search}
      />
      <button
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2563eb] hover:bg-[#1d4ed8] rounded-lg p-2 transition-colors"
        tabindex="-1"
        type="button"
      >
        <img src="/magnifying_glass.png" alt="Search" class="h-4 w-4" />
      </button>
    </div>
  </div>
  <div class="flex gap-0.5 border border-border rounded w-fit">
    <button class="px-4 py-1.5 rounded-tl-lg rounded-bl-lg text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 {filter === 'All Startups' ? 'bg-[#2563eb] text-white font-bold' : ''}">
      All Startups
    </button>
    <button class="px-4 py-1.5 text-[#b3bed7] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 {filter === 'Active' ? 'bg-[#2563eb] text-white font-bold' : ''}">
      Active
    </button>
    <button class="px-4 py-1.5 text-[#b3bed7] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 {filter === 'Completed' ? 'bg-[#2563eb] text-white font-bold' : ''}">
      Completed
    </button>
    <button class="px-4 py-1.5 rounded-tr-lg rounded-br-lg text-[#b3bed7] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 {filter === 'Paused' ? 'bg-[#2563eb] text-white font-bold' : ''}">
      Paused
    </button>
  </div>
</div>


<!-- Startup Cards Grid -->
{#if isLoading}
  <div class="mt-3 grid grid-cols-4 gap-3">
    <div class="rounded-lg bg-background"><Skeleton class="h-40 rounded-lg" /></div>
    <div class="rounded-lg bg-background"><Skeleton class="h-40 rounded-lg" /></div>
    <div class="rounded-lg bg-background"><Skeleton class="h-40 rounded-lg" /></div>
  </div>
{:else if isError}
  <div>
    <p>Error fetching data. Contact support</p>
  </div>
{:else if hasStartups}
  <div class="mt-3 grid grid-cols-4 gap-5">
    {#each listOfStartups as startup}
      <StartupCard {startup} />
    {/each}
  </div>
{:else}
  <div class="mt-3 text-center text-muted-foreground">No startups found.</div>
{/if}

<Dialog.Root open={showApplicationForm} onOpenChange={toggleApplicationForm}>
  <Dialog.Content class="h-4/5 max-w-[700px]">
    <Application access={data.access!} />
  </Dialog.Content>
</Dialog.Root>