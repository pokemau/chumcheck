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
  import axiosInstance from '$lib/axios';

  let { data, form } = $props();
  console.log("Form: ", form);

  const queryResult = useQuery('startupData', () =>
    getData(`/startups/startups`, data.access!)
  );

  const role: any = data.role;

  const isLoading = $derived($queryResult.isLoading);
  const isError = $derived($queryResult.isError);
  const hasStartups = $derived(
    Array.isArray($queryResult.data) && $queryResult.data.length > 0
  );
  const listOfStartups = $derived(() => {
    if ($queryResult.isSuccess && hasStartups) {
      if (role === 'Mentor') {
        return $queryResult.data.filter((startup: any) => startup.qualificationStatus !== 1 && startup.qualificationStatus !== 2);
      }
      return $queryResult.data;
    }
    return [];
  });

  let search = $state('');
  let filter = $state('All Startups');
  let allInitiatives: any[] = $state([]);
  let completedInitiativesPercentage = $state(0);

  const pendingStartups = $derived(
    listOfStartups().filter((startup: any) =>
      startup.qualificationStatus === 1 || startup.qualificationStatus === 2
    )
  );
  const qualifiedStartups = $derived(
    listOfStartups().filter((startup: any) => startup.qualificationStatus === 3)
  );
  const rejectedStartups = $derived(
    listOfStartups().filter((startup: any) => startup.qualificationStatus === 4)
  );
  const pausedStartups = $derived(
    listOfStartups().filter((startup: any) => startup.qualificationStatus === 5)
  );
  const completedStartups = $derived(
    listOfStartups().filter((startup: any) => startup.qualificationStatus === 6)
  );

  const filteredStartups = $derived(() => {
    let base;
    if (filter === 'All Startups') base = listOfStartups();
    else if (filter === 'Qualified') base = qualifiedStartups;
    else if (filter === 'Pending') base = pendingStartups;
    else if (filter === 'Rejected') base = rejectedStartups;
    else if (filter === 'Paused') base = pausedStartups;
    else if (filter === 'Completed') base = completedStartups;
    else base = listOfStartups();

    if (role === 'Mentor') {
      base = base.filter((startup: any) => startup.qualificationStatus !== 1 && startup.qualificationStatus !== 2);
    }

    if (!search) return base;
    return base.filter((startup: any) =>
      startup.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Utility function to get initiatives for a single startup
  async function getInitiativesForStartup(startupId: number, access: string) {
    const res = await axiosInstance.get(`/initiatives?startupId=${startupId}`, {
      headers: { Authorization: `Bearer ${access}` }
    });
    return res.data;
  }

  // Fetch all initiatives for all startups
  async function getAllInitiativesForStartups(startups: any[], access: string) {
    const results = await Promise.all(
      startups.map((startup) => getInitiativesForStartup(startup.id, access))
    );
    // Flatten the array if each result is an array of initiatives
    return results.flat();
  }

  let showApplicationForm = $state(false);
  const toggleApplicationForm = () => {
    showApplicationForm = !showApplicationForm;
  };

  $effect(() => {
    const success = $page.url.searchParams.get('success');

    if (form?.error) {
      console.log('Error in form');
      let formError = form.error.length > 60
      ? form.error.substring(0, 60) + '...'
      : form.error;
    toast.error(formError);
    }

    if (success === 'true') {
      //console.log('Success is true');
      toast.success('Application successfull.');
      // Remove the 'success' parameter from the URL
      const url = new URL($page.url.href);
      url.searchParams.delete('success');
      history.replaceState(null, '', url);
    }
  });

  $effect(() => {
    async function fetchInitiatives() {
      if ($queryResult.isSuccess && listOfStartups().length > 0) {
        const allInitiativesFetched = await getAllInitiativesForStartups(listOfStartups(), data.access!);
        console.log('All initiatives:', allInitiativesFetched);
        allInitiatives = allInitiativesFetched;
        completedInitiativesPercentage = (allInitiatives.filter(initiative => initiative.status === 4).length / allInitiatives.length * 100);
      }
    }
    fetchInitiatives();
  });
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
<div class="grid grid-cols-3 gap-5 mb-8">
  
  <div class="rounded-lg bg-background p-5 flex flex-col gap-1 border border-border">
    <span class="text-2xl font-bold">{listOfStartups().length}</span>
    <span class="text-muted-foreground text-sm mb-2">Total Startups</span>
    <div class="flex flex-wrap gap-3 mt-2 justify-start">
      {#if role === 'Startup'}
        <div class="flex flex-col items-center w-[74px] p-2 rounded-xl text-xs font-semibold border border-blue-500 text-blue-500 bg-slate-900">
          <span class="text-base">{qualifiedStartups.length}</span>
          <span>Qualified</span>
        </div>
        <div class="flex flex-col items-center w-[74px] p-2 rounded-xl text-xs font-semibold border border-yellow-400 text-yellow-400 bg-yellow-900">
          <span class="text-base">{pendingStartups.length}</span>
          <span>Pending</span>
        </div>
      {:else if role === 'Mentor'}
        <div class="flex flex-col items-center w-[74px] p-2 rounded-xl text-xs font-semibold border border-blue-500 text-blue-500 bg-slate-900">
          <span class="text-base">{qualifiedStartups.length}</span>
          <span>Active</span>
        </div>
      {/if}
      <div class="flex flex-col items-center w-[74px] p-2 rounded-xl text-xs font-semibold border border-red-400 text-red-400 bg-red-900">
        <span class="text-base">{rejectedStartups.length}</span>
        <span>Rejected</span>
      </div>
      <div class="flex flex-col items-center w-[74px] p-2 rounded-xl text-xs font-semibold border border-gray-400 text-gray-400 bg-gray-900">
        <span class="text-base">{pausedStartups.length}</span>
        <span>Paused</span>
      </div>
      <div class="flex flex-col items-center w-[74px] p-2 rounded-xl text-xs font-semibold border border-green-500 text-green-500 bg-green-900">
        <span class="text-base">{completedStartups.length}</span>
        <span>Completed</span>
      </div>
    </div>
  </div>

  <div class="rounded-lg bg-background p-5 flex flex-col gap-2 border border-border">
    <div class="text-muted-foreground text-sm">Initiatives Progress</div>
    <div class="flex items-center gap-2">
      <span class="text-2xl font-bold">{allInitiatives.filter(initiative => initiative.status === 4).length} / {allInitiatives.length}</span>
      <span class="ml-auto text-sm">{completedInitiativesPercentage.toFixed(0)}%</span>
    </div>
    <div class="w-full h-2 bg-gray-800 rounded">
      <div class="h-2 bg-white rounded" style="width:{completedInitiativesPercentage.toFixed(0)}%"></div>
    </div>
  </div>
  
  <div class="rounded-lg bg-background p-5 flex flex-col gap-2 border border-border">
    <div class="text-muted-foreground text-sm">Completion Rate</div>
    <div class="flex items-center gap-2">
      <span class="text-2xl font-bold">{completedStartups.length / listOfStartups().length * 100}%</span>
    </div>
    <div class="text-muted-foreground text-sm">{completedStartups.length} of {listOfStartups().length} startups completed</div>
  </div>
</div>

<!-- Search and Filters -->
<div class="mb-5">
  <div class="flex items-center gap-2 mb-2 w-[400px]">
    <div class="relative flex-1">
      <input
        class="w-full rounded-lg border border-gray-800 bg-background px-4 py-2 pr-12 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Search startups..."  
        bind:value={search}
      />
      <button
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-lg p-2 transition-colors"
        tabindex="-1"
        type="button"
      >
        <img src="/magnifying_glass.png" alt="Search" class="h-4 w-4" />
      </button>
    </div>
  </div>
  <div class="flex gap-0.5 border border-border rounded-xl w-fit">
    <button 
      class="px-4 py-1.5 rounded-tl-lg rounded-bl-lg text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700 {filter === 'All Startups' ? 'bg-blue-600 text-white font-bold' : ''}"
      onclick={() => filter = 'All Startups'}
    >
      All Startups
    </button>

    {#if role === 'Startup'}
      <button 
        class="px-4 py-1.5 text-gray-400 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700 {filter === 'Qualified' ? 'bg-blue-600 text-white font-bold' : ''}"
        onclick={() => filter = 'Qualified'}
      >
        Qualified
      </button>
      <button 
        class="px-4 py-1.5 text-gray-400 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700 {filter === 'Pending' ? 'bg-blue-600 text-white font-bold' : ''}"
        onclick={() => filter = 'Pending'}
      >
        Pending
      </button>
    {:else if role === 'Mentor'}
      <button 
        class="px-4 py-1.5 text-gray-400 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700 {filter === 'Qualified' ? 'bg-blue-600 text-white font-bold' : ''}"
        onclick={() => filter = 'Qualified'}
      >
        Active
      </button>
    {/if}
    <button 
      class="px-4 py-1.5 text-gray-400 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700 {filter === 'Rejected' ? 'bg-blue-600 text-white font-bold' : ''}"
      onclick={() => filter = 'Rejected'}
    >
      Rejected
    </button>
    <button 
      class="px-4 py-1.5 text-gray-400 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700 {filter === 'Paused' ? 'bg-blue-600 text-white font-bold' : ''}"
      onclick={() => filter = 'Paused'}
    >
      Paused
    </button>
    <button 
      class="px-4 py-1.5 rounded-tr-lg rounded-br-lg text-gray-400 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700 {filter === 'Completed' ? 'bg-blue-600 text-white font-bold' : ''}"
      onclick={() => filter = 'Completed'}
    >
      Completed
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
    {#each filteredStartups() as startup}
      <StartupCard 
        {startup}
        role={role}
        initiatives={allInitiatives.filter(initiative => initiative.startup === startup.id)}
      />
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