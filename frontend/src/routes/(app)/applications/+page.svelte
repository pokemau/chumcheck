<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as Table from '$lib/components/ui/table';
  import { goto } from '$app/navigation';
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { PUBLIC_API_URL } from '$env/static/public';
  import type { PageData } from './$types';
  import { page } from '$app/state';
  import PendingDialog from '$lib/components/dashboard/PendingDialog.svelte';
  import RatedDialog from '$lib/components/dashboard/RatedDialog.svelte';
  import QualifiedDialog from '$lib/components/dashboard/QualifiedDialog.svelte';
  import axiosInstance from '$lib/axios';
  import { useQueries } from '@sveltestack/svelte-query';
  import { ReadinessType } from '$lib/utils';

  export let data: PageData;

  let access = data.access;

  $: selectedTab = page.url.searchParams.get('tab') || 'pending';
  let applicants: any = [];

  let dialogReady = false;
  let dialogLoading = false;
  let showDialog = false;

  function toggleDialog() {
    showDialog = !showDialog;
  }

  // pending
  let inf: any, que: any, ans: any, calc: any;

  async function getPendingStartupInformation(startupId: number) {
    const response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      const urat_questions = await fetch(
        `${PUBLIC_API_URL}/readinesslevel/urat-questions/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      const questions_data = await urat_questions.json();

      const urat_answers = await fetch(
        `${PUBLIC_API_URL}/readinesslevel/urat-question-answers?startupId=${startupId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      const answers_data = await urat_answers.json();

      const calculator = await fetch(
        `${PUBLIC_API_URL}/startups/${startupId}/calculator-final-scores/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      let calculator_data;
      try {
        calculator_data = await calculator.json();
      } catch (error) {
        console.error('Error parsing calculator JSON:', error);
      }
      if (urat_questions.ok && urat_answers.ok && calculator.ok && calculator_data) {
        inf = data;
        que = questions_data;
        ans = answers_data;
        calc = calculator_data;
        dialogReady = true;
        toggleDialog();
      }
    }
  }

  async function saveRating(startupId: string, scores: Record<number, number>) {
    const response = await fetch(
      `${PUBLIC_API_URL}/startups/${startupId}/rate-applicant/`,
      {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${access}`
        },
        body: JSON.stringify({
          scores
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      window.location.href = '/applications';
    }
  }
  // rated
  const uratReadinessScores: Record<ReadinessType, number> = {
        [ReadinessType.Technology]: 0,
        [ReadinessType.Organizational]: 0,
        [ReadinessType.Market]: 0,
        [ReadinessType.Regulatory]: 0,
        [ReadinessType.Acceptance]: 0,
        [ReadinessType.Investment]: 0,
      };
  async function getRatedStartupInformation(startupId: number) {
    const response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}/`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`
      }
    });

    const data = await response.json();
    if (response.ok) {
      const urat_questions = await fetch(
        `${PUBLIC_API_URL}/readinesslevel/urat-questions/`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      const questions_data = await urat_questions.json();

      const urat_answers = await fetch(
        `${PUBLIC_API_URL}/readinesslevel/urat-question-answers/?startupId=${startupId}`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      const answers_data = await urat_answers.json();
      console.log('answers_data:', answers_data);

      const calculator = await fetch(
        `${PUBLIC_API_URL}/startups/${startupId}/calculator-final-scores/`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      let calculator_data;
      try {
        calculator_data = await calculator.json();
      } catch (error) {
        console.error('Error parsing calculator JSON:', error);
      }

      if (urat_questions.ok && urat_answers.ok && calculator.ok && calculator_data) {
        inf = data; 
        que = questions_data.results || [];
        ans = answers_data.results || [];
        calc = calculator_data;
        answers_data.forEach((answer: any) => {
          const readinessType = answer.readinessType as ReadinessType;
          if (uratReadinessScores[readinessType] !== undefined) {
            uratReadinessScores[readinessType] += answer.score;
          } else {
            console.warn(`Unknown readiness type: ${readinessType}`, answer);
          }
        });
        dialogReady = true;
        toggleDialog();
      }
    }
  }

  async function approveStartup(startupId: number, selectedMentor: any) {
    const response = await fetch(
      `${PUBLIC_API_URL}/startups/${startupId}/approve-applicant/`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`
        }
      }
    );

    if (response.ok) {
      const assignmentor = await fetch(
        // `${PUBLIC_API_URL}/startups/${selectedMentor}/appoint-mentors/`,
        `${PUBLIC_API_URL}/startups/${startupId}/appoint-mentors/`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access}`
          },
          body: JSON.stringify({
            mentor_ids: [selectedMentor],
            cohort_id: 1
          })
        }
      );

      if (assignmentor.ok) {
        // const filtered = applicants.filter((d) => d.id !== startupId);
        // applicants = filtered;
        // const startup = $queries[0].data.find((applicant: any) => applicant.id === startupId);
        // if (startup) {
        //   startup.qualificationStatus = 3;
        // }
        window.location.href = '/applications?tab=rated';
      }
      toggleDialog();
    }
  }

  async function rejectStartup(startupId: number) {
    const response = await fetch(
      `${PUBLIC_API_URL}/startups/${startupId}/reject-applicant/`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`
        }
      }
    );

    if (response.ok) {
      // const filtered = applicants.filter((d) => d.id !== startupId);
      // applicants = filtered;
      // const startup = $queries[0].data.find((applicant: any) => applicant.id === startupId);
      // if (startup) {
      //   startup.qualificationStatus = 4;
      // }
      window.location.href = '/applications?tab=rated';
    }
    toggleDialog();
  }

  // qualified
  let lev: any;
  async function getQualifiedStartupInformation(startupId: number) {
    const response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}/`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`
      }
    });

    const data = await response.json();
    if (response.ok) {
      const level = await fetch(
        `${PUBLIC_API_URL}/startup-readiness-levels/?startupId=${data.id}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access}`
          }
        }
      );
      const levels = await level.json();
      if (level.ok) {
        inf = data;
        lev = levels.results;
        dialogReady = true;
        toggleDialog();
        return {
        	info: data,
        	questions: questions_data.results,
        	answers: answers_data.results,
        	access: access,
        	calculator: calculator_data
        };
      }
    }
  }

  const queries = useQueries([
    {
      queryKey: ['pendingRatedRanking'],
      queryFn: async () =>
        (
          await axiosInstance.get(`/startups/ranking-by-urat/`, {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          })
        ).data,
      cacheTime: 0,
      staleTime: 0
    },
    {
      queryKey: ['mentors'],
      queryFn: async () =>
        (
          await axiosInstance.get(`/users/?userRole=Mentor`, {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          })
        ).data,
      cacheTime: 0,
      staleTime: 0
    },
    {
      queryKey: ['qualifiedRanking'],
      queryFn: async () =>
        (
          await axiosInstance.get(`/startups/ranking-by-rubrics/`, {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          })
        ).data,
      cacheTime: 0,
      staleTime: 0
    }
  ]);

  $: if ($queries[0].isSuccess) {
    if ($queries[0].data.length > 0) {
      if (selectedTab === 'pending') {
        applicants = $queries[0].data.filter(
          (applicant: any) => applicant.qualificationStatus === 1
        );
      } else if (selectedTab === 'rated') {
        applicants = $queries[0].data.filter(
          (applicant: any) => applicant.qualificationStatus === 2
        );
      } else {
        applicants = $queries[0].data.filter(
          (applicant: any) => applicant.qualificationStatus === 3
        );
      }
    } else {
      applicants = []; // Handle case when there are no applicants
    }
  }

  $: if ($queries[2].isSuccess) {
    if (selectedTab === 'qualified') {
      if ($queries[2].data.length > 0) {
        applicants = $queries[2].data;
      } else {
        applicants = [];
      }
    }
  }
</script>

<svelte:head>
  <title>ChumCheck - Applications</title>
</svelte:head>

<style>
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

{#if $queries[0].isLoading || $queries[1].isLoading || $queries[2].isLoading}
  <div>Fetching...</div>
{:else}
  {@const mentors = $queries[1].data}
  <div class="flex flex-col gap-3">
    <div class="flex justify-between rounded-lg bg-background">
      <Tabs.Root value={selectedTab}>
        <Tabs.List class="border bg-flutter-gray/20">
          <Tabs.Trigger
            value="pending"
            onclick={() => {
              selectedTab = 'pending';
              goto('/applications?tab=pending');
            }}>Pending</Tabs.Trigger
          >
          <Tabs.Trigger
            value="rated"
            onclick={() => {
              selectedTab = 'rated';
              goto('/applications?tab=rated');
            }}>Rated</Tabs.Trigger
          >
          <Tabs.Trigger
            value="qualified"
            onclick={() => {
              selectedTab = 'qualified';
              goto('/applications?tab=qualified');
            }}>Qualified</Tabs.Trigger
          >
        </Tabs.List>
      </Tabs.Root>
    </div>
    <div class="rounded-md border">
      <Table.Root class="rounded-lg bg-background">
        <Table.Header>
          <Table.Row class="text-centery h-12">
            <Table.Head class="pl-5">Startup</Table.Head>
            <Table.Head class="">Group</Table.Head>
            <Table.Head class="">Leader</Table.Head>
            {#if selectedTab === 'qualified'}
              <Table.Head>Mentor</Table.Head>
            {/if}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#if applicants.length > 0}
            {#each applicants as applicant}
              <Table.Row
                class="h-14 cursor-pointer"
                onclick={async () => {
                  dialogLoading = true;
                  if (selectedTab === 'pending') {
                    await getPendingStartupInformation(applicant.id);
                  } else if (selectedTab === 'rated') {
                    await getRatedStartupInformation(applicant.id);
                  } else {
                    await getQualifiedStartupInformation(applicant.id);
                  }
                  dialogLoading = false;
                }}
              >
                <Table.Cell class="pl-5">{applicant.name}</Table.Cell>
                <Table.Cell>{applicant.groupName}</Table.Cell>
                <Table.Cell class=""
                  >{applicant.leader_first_name}
                  {applicant.leader_last_name}</Table.Cell
                >
                {#if selectedTab === 'qualified'}
                  <Table.Cell
                    >{applicant?.mentors[0]?.firstName}
                    {applicant?.mentors[0]?.lastName}</Table.Cell
                  >
                {/if}
              </Table.Row>
            {/each}
          {:else}
            <div class="flex items-center justify-center">No data found</div>
          {/if}
        </Table.Body>
      </Table.Root>
    </div>
  </div>

  {#if dialogLoading}
    <div class="fixed inset-0 flex items-center justify-center bg-background bg-opacity-90 z-50">
      <div class="p-5 rounded-lg shadow-lg flex items-center gap-3">
        <div class="loader"></div>
        <span>Loading...</span>
      </div>
    </div>
  {/if}

  <!-- pending dialog -->
  {#if dialogReady}
    {#if selectedTab === 'pending'}
      <!-- {#if calc} -->
        <PendingDialog
          {inf}
          {que}
          {ans}
          {calc}
          {saveRating}
          {showDialog}
          {toggleDialog}
          {access}
        />
      <!-- {/if} -->
    {:else if selectedTab === 'rated'}
      {#if calc}
        <RatedDialog
          {inf}
          {que}
          {ans}
          {calc}
          {uratReadinessScores}
          {approveStartup}
          {rejectStartup}
          {mentors}
          {showDialog}
          {toggleDialog}
        />
      {/if}
    {:else}
      <QualifiedDialog {inf} {lev} {showDialog} {toggleDialog} />
    {/if}
  {/if}
{/if}
