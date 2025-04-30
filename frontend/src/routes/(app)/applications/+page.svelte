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
  import PendingDialog from '$lib/components/dashboard/PendingDialog.svelte';
  import RatedDialog from '$lib/components/dashboard/RatedDialog.svelte';
  import QualifiedDialog from '$lib/components/dashboard/QualifiedDialog.svelte';
  import axiosInstance from '$lib/axios';
  import { useQueries } from '@sveltestack/svelte-query';

  export let data: PageData;

  let access = data.access;

  let selectedTab = 'pending';
  let applicants: any = [];

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
          method: 'get',
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      const calculator_data = await calculator.json();
      if (urat_questions.ok && urat_answers.ok && calculator.ok) {
        inf = data;
        que = questions_data;
        ans = answers_data;
        calc = calculator_data;
        toggleDialog();
      }
    }
  }

  async function saveRating(startupId: string) {
    const response = await fetch(
      `${PUBLIC_API_URL}/startups/${startupId}/rate-applicant/`,
      {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${access}`
        }
      }
    );

    const data = await response.json();

    if (response.ok) {
      window.location.href = '/applications';
    }
  }
  // rated
  let trl = 0,
    orl = 0,
    mrl = 0,
    rrl = 0,
    arl = 0,
    irl = 0;
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
        `${PUBLIC_API_URL}/readinesslevel/urat-question-answers?startupId=${startupId}`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      const answers_data = await urat_answers.json();

      const calculator = await fetch(
        `${PUBLIC_API_URL}/startups/${startupId}/calculator-final-scores/`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      const calculator_data = await calculator.json();

      if (urat_questions.ok && urat_answers.ok && calculator.ok) {
        inf = data;
        que = questions_data;
        ans = answers_data;
        calc = calculator_data;
        trl = ans
          .filter((d) => d.readinessType === 'Technology')
          .reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue.score;
          }, 0);
        orl = ans
          .filter((d) => d.readinessType === 'Organizational')
          .reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue.score;
          }, 0);
        mrl = ans
          .filter((d) => d.readinessType === 'Market')
          .reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue.score;
          }, 0);
        rrl = ans
          .filter((d) => d.readinessType === 'Regulatory')
          .reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue.score;
          }, 0);
        arl = ans
          .filter((d) => d.readinessType === 'Acceptance')
          .reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue.score;
          }, 0);
        irl = ans
          .filter((d) => d.readinessType === 'Investment')
          .reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue.score;
          }, 0);
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
        const filtered = applicants.filter((d) => d.id !== startupId);
        applicants = filtered;
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
      return {
        message: 'email has been sent to the applicant'
      };
    }
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
        // return {
        // 	info: data,
        // 	questions: questions_data.results,
        // 	answers: answers_data.results,
        // 	access: access,
        // 	calculator: calculator_data
        // };
        toggleDialog();
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
          await axiosInstance.get(`/users?userRole=Mentor`, {
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
{#if $queries[0].isLoading || $queries[1].isLoading || $queries[2].isLoading}
  <div>Fetching...</div>
{:else}
  {@const mentors = $queries[1].data}
  <div class="flex flex-col gap-3">
    <div class="flex justify-between rounded-lg bg-background">
      <Tabs.Root value="pending">
        <Tabs.List class="border bg-flutter-gray/20">
          <Tabs.Trigger
            value="pending"
            onclick={() => {
              selectedTab = 'pending';
            }}>Pending</Tabs.Trigger
          >
          <Tabs.Trigger
            value="rated"
            onclick={() => {
              selectedTab = 'rated';
            }}>Rated</Tabs.Trigger
          >
          <Tabs.Trigger
            value="qualified"
            onclick={() => {
              selectedTab = 'qualified';
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
                onclick={() => {
                  if (selectedTab === 'pending') {
                    getPendingStartupInformation(applicant.id);
                  } else if (selectedTab === 'rated') {
                    getRatedStartupInformation(applicant.id);
                  } else {
                    getQualifiedStartupInformation(applicant.id);
                  }
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

  <!-- pending dialog -->
  {#if selectedTab === 'pending'}
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
  {:else if selectedTab === 'rated'}
    <RatedDialog
      {inf}
      {que}
      {ans}
      {calc}
      {trl}
      {orl}
      {mrl}
      {rrl}
      {arl}
      {irl}
      {approveStartup}
      {rejectStartup}
      {mentors}
      {showDialog}
      {toggleDialog}
    />
  {:else}
    <QualifiedDialog {inf} {lev} {showDialog} {toggleDialog} />
  {/if}
{/if}
