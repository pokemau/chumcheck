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
  const message =
    role === 'Mentor' || role === 'Manager as Mentor'
      ? 'Manage assigned startups'
      : role === 'Startup'
        ? 'Manage startups'
        : '';

  const isLoading = $derived($queryResult.isLoading);
  const isError = $derived($queryResult.isError);
  const hasStartups = $derived(
    Array.isArray($queryResult.data?.results) &&
      $queryResult.data.results.length > 0
  );
  const listOfStartups = $derived(
    $queryResult.isSuccess && hasStartups ? $queryResult.data.results : []
  );

  let showApplicationForm = $state(false);
  const toggleApplicationForm = () => {
    showApplicationForm = !showApplicationForm;
  };

  $effect(() => {
    const success = $page.url.searchParams.get('success');

    if (success === 'true') {
      console.log('Success is true');
      toast.success('Application successfull.');
      // Remove the 'success' parameter from the URL
      const url = new URL($page.url.href);
      url.searchParams.delete('success');
      history.replaceState(null, '', url);
    }
  });

  const qualifiedStartups = $derived(
    listOfStartups.filter((startup: any) => startup.qualification_status === 3)
  );
  const pendingStartups = $derived(
    listOfStartups.filter(
      (startup: any) =>
        startup.qualification_status === 1 || startup.qualification_status === 2
    )
  );

  $effect(() => {
    if ($queryResult.isSuccess) {
      console.log($queryResult.data);
    }
  });
</script>

<div class="flex items-center justify-between">
  <div>
    <h2 class="text-3xl font-bold">Startups</h2>
    <p class="text-muted-foreground">{message}</p>
  </div>
  <Can role={['Startup']} userRole={role}>
    <div class="flex gap-5">
      <Button
        class="flex items-center justify-center gap-2 rounded-lg"
        onclick={toggleApplicationForm}
      >
        <RocketIcon class="h-4 w-4" /> Apply</Button
      >
    </div>
  </Can>
</div>

{#if isLoading}
  {@render loading()}
{:else if isError}
  {@render error()}
{:else if hasStartups}
  {@render startups()}
{:else}{/if}
<svelte:head>
  <title>ChumCheck - Startups</title>
</svelte:head>
{#snippet loading()}
  <div class="mt-3 grid grid-cols-4 gap-3">
    <div class="rounded-lg bg-background">
      <Skeleton class="h-40 rounded-lg" />
    </div>
    <div class="rounded-lg bg-background">
      <Skeleton class="h-40 rounded-lg" />
    </div>
    <div class="rounded-lg bg-background">
      <Skeleton class="h-40 rounded-lg" />
    </div>
  </div>
{/snippet}

{#snippet error()}
  <div>
    <p>Error fetching data. Contact support</p>
  </div>
{/snippet}

{#snippet startups()}
  {#if role !== 'Startup'}
    <div class="mt-3 grid grid-cols-4 gap-3">
      {#each listOfStartups.filter((startup: any) => startup.qualification_status === 3) as startup}
        <StartupCard {startup} {role} />
      {/each}
    </div>
  {:else}
    <Accordion.Root type="multiple" class="w-full" value={['qualified']}>
      <Accordion.Item value="qualified">
        <Accordion.Trigger>Qualified Startups</Accordion.Trigger>
        <Accordion.Content>
          <div class="mt-3 grid grid-cols-4 gap-3">
            {#each listOfStartups.filter((startup: any) => startup.qualification_status === 3) as startup}
              <StartupCard {startup} {role} />
            {/each}
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="pending" class="w-full">
        <Accordion.Trigger>Pending Startups</Accordion.Trigger>
        <Accordion.Content>
          <div class="mt-3 grid grid-cols-4 gap-3">
            {#each listOfStartups.filter((startup: any) => startup.qualification_status === 1 || startup.qualification_status === 2) as startup}
              <StartupCard {startup} {role} />
            {/each}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  {/if}
{/snippet}

<Dialog.Root open={showApplicationForm} onOpenChange={toggleApplicationForm}>
  <Dialog.Content class="h-4/5 max-w-[700px]">
    <Application access={data.access!} />
  </Dialog.Content>
</Dialog.Root>
