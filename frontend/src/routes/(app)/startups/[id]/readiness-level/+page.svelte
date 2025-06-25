<script lang="ts">
  import { RatedRubric, Stepper } from '$lib/components/startups/readiness';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import { useQueries } from '@sveltestack/svelte-query';
  import { getData, isMentor } from '$lib/utils';
  import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import Rubric from '$lib/components/startups/readiness/rubric.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Chart from '$lib/components/ui/chart/index.js';
  import { Can, RadarChart, RadarChartV2 } from '$lib/components/shared/index.js';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';

  const { data } = $props();
  const { access, startupId, role } = data;

  const readinessLevelQueries = useQueries([
    {
      queryKey: ['startup', startupId],
      queryFn: () => getData(`/startups/${startupId}/`, access!)
    },
    {
      queryKey: ['readinessLevels'],
      queryFn: () => getData(`/readinesslevel/readiness-levels`, access!)
    },
    {
      queryKey: ['haveScores', startupId],
      queryFn: () =>
        getData(
          `/startups/startup-readiness-level?startupId=${startupId}`, access!
        )
    },
    {
      queryKey: ['readinessLevel', startupId],
      queryFn: () => getData(`/startups/startup-readiness-level?startupId=${startupId}`, access!)
    }
  ]);
  const { isLoading, isError } = $derived(useQueriesState($readinessLevelQueries));

  const isRated = $derived(() => {
  const q = $readinessLevelQueries[2];
  return q.isSuccess && q.data?.length > 0;
  });

  let selectedTab = $state('chart');
  let selectedReadinessTab = $state('technology');

  const rubrics = $derived(() => {
    const query = $readinessLevelQueries[1];
    if (!query.isSuccess || !query.data) {
      return {
        technology: [],
        market: [],
        acceptance: [],
        organizational: [],
        regulatory: [],
        investment: []
      };
    }

    return {
      technology: query.data.filter((r: any) => r.readiness_type === 'Technology'),
      market: query.data.filter((r: any) => r.readiness_type === 'Market'),
      acceptance: query.data.filter((r: any) => r.readiness_type === 'Acceptance'),
      organizational: query.data.filter((r: any) => r.readiness_type === 'Organizational'),
      regulatory: query.data.filter((r: any) => r.readiness_type === 'Regulatory'),
      investment: query.data.filter((r: any) => r.readiness_type === 'Investment')
    };
  });

  const scores = $derived(() => {
  const query = $readinessLevelQueries[2];
  if (!query.isSuccess || !query.data) {
    return {
      technology: [],
      market: [],
      acceptance: [],
      organizational: [],
      regulatory: [],
      investment: []
    };
  }

  return {
    technology: query.data.filter((r: any) => r.readiness_type === 'Technology'),
    market: query.data.filter((r: any) => r.readiness_type === 'Market'),
    acceptance: query.data.filter((r: any) => r.readiness_type === 'Acceptance'),
    organizational: query.data.filter((r: any) => r.readiness_type === 'Organizational'),
    regulatory: query.data.filter((r: any) => r.readiness_type === 'Regulatory'),
    investment: query.data.filter((r: any) => r.readiness_type === 'Investment')
  };
  });

  const readiness = $derived(() => {
    const query = $readinessLevelQueries[3];
    const latest = query.data.slice(-6) ?? [];

    if (!query.isSuccess || latest.length === 0) {
      return {
        technology: 0,
        organizational: 0,
        acceptance: 0,
        market: 0,
        regulatory: 0,
        investment: 0
      };
    }

    const getLevel = (type: string) => {
    const match = latest.find(
        (r: any) => r.readinessLevel.readinessType === type
      );
      return match?.readinessLevel.level ?? 0;
    };

    return {
      technology: getLevel('Technology'),
      organizational: getLevel('Organizational'),
      acceptance: getLevel('Acceptance'),
      market: getLevel('Market'),
      regulatory: getLevel('Regulatory'),
      investment: getLevel('Investment')
    };
  });

  let current = $state(0);

  const next = () => {
    if (current < 7) {
      current++;
    }
  };

  const previous = () => {
    if (current > 0) {
      current--;
    }
  };

  const updateTab = (tab: string) => {
    selectedTab = tab;
  };

  const updateReadinessTab = (tab: string) => {
    selectedReadinessTab = tab;
  };

  let form: HTMLFormElement;
</script>

<svelte:head>
  <title
    >{$readinessLevelQueries[0].isSuccess
      ? `${$readinessLevelQueries[0].data.name} - Readiness Levels`
      : 'Loading'}</title
  >
</svelte:head>

<div class="flex h-full flex-col">
  {#if isLoading}
    {@render loading()}
  {:else if isError}
    {@render error()}
  {:else if isRated()}
    {@render rated()}
  {:else if isMentor(role)}
    {@render mentor()}
  {:else}
    <div>
      <p>Looks like you haven't been rated yet</p>
    </div>
  {/if}
</div>

{#snippet loading()}
  <div class="flex h-full flex-col gap-3">
    {#if role !== 'Startup'}
      <div class="bg-background">
        <Skeleton class="h-9 w-[147px]" />
      </div>
    {/if}
    <div class="h-full w-full bg-background">
      <Skeleton class="h-full w-full" />
    </div>
  </div>
{/snippet}

{#snippet error()}
  ERROR
{/snippet}

{#snippet rated()}
  <div class="flex h-full flex-col gap-3">
    <Can role={['Mentor', 'Manager as Mentor']} userRole={role}>
      <div class="flex justify-between">
        <div class="flex h-fit justify-between rounded-lg bg-background">
          <!-- <Tabs.Root value={selectedTab}> -->
          <!--   <Tabs.List class="border bg-flutter-gray/20"> -->
          <!--     <Tabs.Trigger value="chart" class="capitalize" onclick={() => updateTab('chart')} -->
          <!--       >Chart</Tabs.Trigger -->
          <!--     > -->
          <!--     <Tabs.Trigger -->
          <!--       value="detailed" -->
          <!--       class="capitalize" -->
          <!--       onclick={() => updateTab('detailed')}>Detailed</Tabs.Trigger -->
          <!--     > -->
          <!--   </Tabs.List> -->
          <!-- </Tabs.Root> -->
        </div>
        {#if selectedTab === 'detailed'}
          <div class="flex h-fit justify-between rounded-lg bg-background">
            <Tabs.Root value={selectedReadinessTab}>
              <Tabs.List class="border bg-flutter-gray/20">
                <Tabs.Trigger
                  value="technology"
                  class="capitalize"
                  onclick={() => updateReadinessTab('technology')}>Technology</Tabs.Trigger
                >
                <Tabs.Trigger
                  value="acceptance"
                  class="capitalize"
                  onclick={() => updateReadinessTab('acceptance')}>Acceptance</Tabs.Trigger
                >
                <Tabs.Trigger
                  value="market"
                  class="capitalize"
                  onclick={() => updateReadinessTab('market')}>Market</Tabs.Trigger
                >
                <Tabs.Trigger
                  value="organizational"
                  class="capitalize"
                  onclick={() => updateReadinessTab('organizational')}>Organizational</Tabs.Trigger
                >
                <Tabs.Trigger
                  value="regulatory"
                  class="capitalize"
                  onclick={() => updateReadinessTab('regulatory')}>Regulatory</Tabs.Trigger
                >
                <Tabs.Trigger
                  value="investment"
                  class="capitalize"
                  onclick={() => updateReadinessTab('investment')}>Investment</Tabs.Trigger
                >
              </Tabs.List>
            </Tabs.Root>
          </div>
        {/if}
      </div>
    </Can>
    {#if selectedTab === 'chart'}
      <Card.Root class="h-full">
        <Card.Header class="items-center">
          <Card.Title>Readiness Level - Radar Chart</Card.Title>
        </Card.Header>
        <Card.Content class="flex items-center justify-center">
          <RadarChartV2
            id={Number(startupId)}
            min={1}
            max={9}
            data={[
              readiness().technology,
              readiness().market,
              readiness().acceptance,
              readiness().regulatory,
              readiness().organizational,
              readiness().investment
            ]}
            labels={[
              'Technology',
              'Market',
              'Acceptance',
              'Regulatory',
              'Organizational',
              'Investment'
            ]}
          />
          <!-- <RadarChart trl={readiness.technology} mrl={readiness.market} irl={readiness.investment} arl={readiness.acceptance} orl={readiness.organizational} rrl={readiness.regulatory}/> -->
        </Card.Content>
        <!-- <Card.Footer class="flex-col gap-2 text-sm">
					<div class="flex items-center gap-2 font-medium leading-none">
						Trending up by 5.2% this month
						<TrendingUp class="size-4" />
					</div>
					<div class="text-muted-foreground flex items-center gap-2 leading-none">
						January - June 2024
					</div>
				</Card.Footer> -->
      </Card.Root>
    {:else}
      <div class="flex h-full flex-col gap-3">
        <div class="flex h-full flex-col overflow-scroll">
          <div class="flex h-0 flex-col">
            <RatedRubric
              questionnaires={rubrics().technology}
              type={'technology'}
              current={selectedReadinessTab}
              scores={scores().technology}
            />
            <RatedRubric
              questionnaires={rubrics().acceptance}
              type={'acceptance'}
              current={selectedReadinessTab}
              scores={scores().acceptance}
            />
            <RatedRubric
              questionnaires={rubrics().market}
              type={'market'}
              current={selectedReadinessTab}
              scores={scores().market}
            />
            <RatedRubric
              questionnaires={rubrics().regulatory}
              type={'regulatory'}
              current={selectedReadinessTab}
              scores={scores().regulatory}
            />
            <RatedRubric
              questionnaires={rubrics().organizational}
              type={'organizational'}
              current={selectedReadinessTab}
              scores={scores().organizational}
            />
            <RatedRubric
              questionnaires={rubrics().investment}
              type={'investment'}
              current={selectedReadinessTab}
              scores={scores().investment}
            />
          </div>
        </div>
      </div>
    {/if}
  </div>
{/snippet}

{#snippet mentor()}
  <div class="flex h-full flex-col gap-3">
    <Stepper {current} />    
    <div class="flex h-full flex-col overflow-scroll">
      <form method="post" bind:this={form} class="flex h-0 flex-col">
        <Rubric questionnaires={rubrics().technology} step={1} {current} type={'technology'} />
        <Rubric questionnaires={rubrics().acceptance} step={2} {current} type={'acceptance'} />
        <Rubric questionnaires={rubrics().market} step={3} {current} type={'market'} />
        <Rubric questionnaires={rubrics().regulatory} step={4} {current} type={'regulatory'} />
        <Rubric
          questionnaires={rubrics().organizational}
          step={5}
          {current}
          type={'organizational'}
        />
        <Rubric questionnaires={rubrics().investment} step={6} {current} type={'investment'} />
      </form>
    </div>
    <div class="ml-auto flex gap-2">
      <Button variant="secondary" onclick={previous} disabled={current === 0}>Previous</Button>
      {#if current === 5}
        <Button onclick={() => form.submit()}>Submit</Button>
      {:else}
        <Button onclick={next}>Next</Button>
      {/if}
    </div>
  </div>
{/snippet}
