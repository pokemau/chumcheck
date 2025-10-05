<script lang="ts">
  import { Skeleton } from '$lib/components/ui/skeleton';
  import Button from '$lib/components/ui/button/button.svelte';
  import { RocketIcon } from 'lucide-svelte';
  import { StartupCard } from '$lib/components/startups';
  import StartupStatusCard from '$lib/components/startups/base/StartupStatusCard.svelte';
  import StartupFilterButton from '$lib/components/startups/base/StartupFilterButton.svelte';
  import { QualificationStatus } from '$lib/enums/qualification-status.enum';
  import { Can } from '$lib/components/shared';
  import { useQuery } from '@sveltestack/svelte-query';
  import { getData } from '$lib/utils.js';
  import * as Dialog from '$lib/components/ui/dialog';
  import Application from '$lib/components/startup/Application.svelte';
  import { page } from '$app/state';
  import { toast } from 'svelte-sonner';
  import axiosInstance from '$lib/axios';

  let { data, form } = $props();

  const queryResult = useQuery(
    ['startups', 'list'],
    () => getData(`/startups/startups`, data.access),
    {
      initialData: data.startups,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false
    }
  );

  const role = data.role;

  const isLoading = $derived($queryResult.isLoading);
  const isError = $derived($queryResult.isError);
  const hasStartups = $derived(
    Array.isArray($queryResult.data) && $queryResult.data.length > 0
  );
  const listOfStartups = $derived(() => {
    if ($queryResult.isSuccess && hasStartups) {
      if (role === 'Mentor') {
        return $queryResult.data.filter(
          (startup: any) =>
            startup.qualificationStatus !== QualificationStatus.PENDING
        );
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
    listOfStartups().filter(
      (startup: any) =>
        startup.qualificationStatus === QualificationStatus.PENDING
    )
  );
  const waitlistedStartups = $derived(
    listOfStartups().filter(
      (startup: any) =>
        startup.qualificationStatus === QualificationStatus.WAITLISTED
    )
  );
  const qualifiedStartups = $derived(
    listOfStartups().filter(
      (startup: any) =>
        startup.qualificationStatus === QualificationStatus.QUALIFIED
    )
  );
  const completedStartups = $derived(
    listOfStartups().filter(
      (startup: any) =>
        startup.qualificationStatus === QualificationStatus.COMPLETED
    )
  );

  const filteredStartups = $derived(() => {
    let base;
    if (filter === 'All Startups')
      base = pendingStartups
        .concat(waitlistedStartups)
        .concat(qualifiedStartups)
        .concat(completedStartups);
    else if (filter === 'Pending') base = pendingStartups;
    else if (filter === 'Waitlisted') base = waitlistedStartups;
    else if (filter === 'Qualified') base = qualifiedStartups;
    else if (filter === 'Completed') base = completedStartups;
    else
      base = pendingStartups
        .concat(waitlistedStartups)
        .concat(qualifiedStartups)
        .concat(completedStartups);

    if (role === 'Mentor') {
      base = base.filter(
        (startup: any) =>
          startup.qualificationStatus !== QualificationStatus.PENDING
      );
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
  let selectedStartup = $state(null);
  const toggleApplicationForm = () => {
    showApplicationForm = !showApplicationForm;
    if (!showApplicationForm) {
      selectedStartup = null;
    }
  };

  $effect(() => {
    const handleOpenApplication = (event: CustomEvent) => {
      selectedStartup = event.detail.startup;
      showApplicationForm = true;
    };

    window.addEventListener(
      'openApplication',
      handleOpenApplication as EventListener
    );
    return () => {
      window.removeEventListener(
        'openApplication',
        handleOpenApplication as EventListener
      );
    };
  });

  $effect(() => {
    const success = page.url.searchParams.get('success');

    if (form?.error) {
      let formError =
        form.error.length > 60
          ? form.error.substring(0, 60) + '...'
          : form.error;
      toast.error(formError);
    }

    if (success === 'true') {
      toast.success('Application successfull.');
      // Remove the 'success' parameter from the URL
      const url = new URL(page.url.href);
      url.searchParams.delete('success');
      history.replaceState(null, '', url);
    }
  });

  $effect(() => {
    async function fetchInitiatives() {
      if ($queryResult.isSuccess && listOfStartups().length > 0) {
        const allInitiativesFetched = await getAllInitiativesForStartups(
          listOfStartups(),
          data.access!
        );
        allInitiatives = allInitiativesFetched;
        completedInitiativesPercentage =
          (allInitiatives.filter((initiative) => initiative.status === 4)
            .length /
            allInitiatives.length) *
          100;
      }
    }
    fetchInitiatives();
  });
</script>

<svelte:head>
  <title>ChumCheck - Startups</title>
</svelte:head>

<div class="mb-8 flex items-center justify-between">
  <div>
    <h2 class="text-3xl font-bold">Startups</h2>
    <p>Manage assigned startups</p>
  </div>
  <Can role={['Startup']} userRole={role}>
    <div class="flex gap-5">
      <a href="/apply">
        <Button class="flex items-center justify-center gap-2 rounded-lg">
          <RocketIcon class="h-4 w-4" /> Apply
        </Button>
      </a>
    </div>
  </Can>
</div>

<!-- Statistics Cards -->
<div class="mb-8 grid grid-cols-3 gap-5">
  <div
    class="border-border bg-background flex flex-col gap-1 rounded-lg border p-5"
  >
    <span class="text-2xl font-bold">{listOfStartups().length}</span>
    <span class="mb-2 text-sm">Total Startups</span>
    <div class="mt-2 flex flex-wrap justify-start gap-3">
      {#if role === 'Startup'}
        <StartupStatusCard
          count={pendingStartups.length}
          label="Pending"
          borderColor="border-secondary"
          bgColor="bg-secondary"
        />
        <StartupStatusCard
          count={waitlistedStartups.length}
          label="Waitlisted"
          borderColor="border-accent"
          bgColor="bg-accent"
        />
        <StartupStatusCard
          count={qualifiedStartups.length}
          label="Qualified"
          borderColor="border-primary"
          bgColor="bg-card"
        />
      {:else if role === 'Mentor'}
        <StartupStatusCard
          count={qualifiedStartups.length}
          label="Active"
          borderColor="border-primary"
          bgColor="bg-card"
        />
      {/if}
      <StartupStatusCard
        count={completedStartups.length}
        label="Completed"
        borderColor="border-primary"
        bgColor="bg-card"
      />
    </div>
  </div>

  <div
    class="border-border bg-background flex flex-col gap-2 rounded-lg border p-5"
  >
    <div class="text-sm">Initiatives Progress</div>
    <div class="flex items-center gap-2">
      <span class="text-2xl font-bold"
        >{allInitiatives?.filter((initiative) => initiative?.status === 4)
          ?.length || 0} / {allInitiatives?.length || 0}</span
      >
      <span class="ml-auto text-sm"
        >{completedInitiativesPercentage.toFixed(0)}%</span
      >
    </div>
    <div class="bg-accent h-2 w-full rounded">
      <div
        class="bg-primary h-2 rounded"
        style="width:{completedInitiativesPercentage.toFixed(0)}%"
      ></div>
    </div>
  </div>

  <div
    class="border-border bg-background flex flex-col gap-2 rounded-lg border p-5"
  >
    <div class="text-sm">Completion Rate</div>
    <div class="flex items-center gap-2">
      <span class="text-2xl font-bold"
        >{listOfStartups().length > 0
          ? (completedStartups.length / listOfStartups().length) * 100
          : 0}%</span
      >
    </div>
    <div class="text-sm">
      {completedStartups.length} of {listOfStartups().length} startups completed
    </div>
  </div>
</div>

<!-- Search and Filters -->
<div class="mb-5">
  <div class="mb-2 flex w-[400px] items-center gap-2">
    <div class="relative flex-1">
      <input
        class="border-border bg-background placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border px-4 py-2 pr-12 text-sm focus:outline-none focus:ring-2"
        type="text"
        placeholder="Search startups..."
        bind:value={search}
      />
      <button
        class="bg-primary hover:bg-primary/90 absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 transition-colors"
        tabindex="-1"
        type="button"
      >
        <img src="/magnifying_glass.png" alt="Search" class="h-4 w-4" />
      </button>
    </div>
  </div>
  <div class="border-border flex w-fit gap-0.5 rounded-xl border">
    <StartupFilterButton
      label="All Startups"
      active={filter === 'All Startups'}
      onclick={() => (filter = 'All Startups')}
      rounded="left"
    />

    {#if role === 'Startup'}
      <StartupFilterButton
        label="Pending"
        active={filter === 'Pending'}
        onclick={() => (filter = 'Pending')}
      />
      <StartupFilterButton
        label="Waitlisted"
        active={filter === 'Waitlisted'}
        onclick={() => (filter = 'Waitlisted')}
      />
      <StartupFilterButton
        label="Qualified"
        active={filter === 'Qualified'}
        onclick={() => (filter = 'Qualified')}
      />
    {:else if role === 'Mentor'}
      <StartupFilterButton
        label="Active"
        active={filter === 'Qualified'}
        onclick={() => (filter = 'Qualified')}
      />
    {/if}
    <StartupFilterButton
      label="Completed"
      active={filter === 'Completed'}
      onclick={() => (filter = 'Completed')}
      rounded="right"
    />
  </div>
</div>

<!-- Startup Cards Grid -->
{#if isLoading}
  <div class="mt-3 grid grid-cols-4 gap-3 pb-10">
    <div class="bg-background rounded-lg">
      <Skeleton class="h-40 rounded-lg" />
    </div>
    <div class="bg-background rounded-lg">
      <Skeleton class="h-40 rounded-lg" />
    </div>
    <div class="bg-background rounded-lg">
      <Skeleton class="h-40 rounded-lg" />
    </div>
  </div>
{:else if isError}
  <div>
    <p>Error fetching data. Contact support</p>
  </div>
{:else if hasStartups}
  <div class="mt-3 grid grid-cols-4 gap-5 pb-10">
    {#each filteredStartups() as startup}
      <StartupCard
        {startup}
        {role}
        initiatives={allInitiatives.filter(
          (initiative) => initiative.startup === startup.id
        )}
      />
    {/each}
  </div>
{:else}
  <div class="mt-3 text-center">No startups found.</div>
{/if}

<Dialog.Root open={true} onOpenChange={toggleApplicationForm}>
  <Dialog.Content class="h-4/5 max-w-[800px]">
    <Application access={data.access!} startup={selectedStartup} />
  </Dialog.Content>
</Dialog.Root>
