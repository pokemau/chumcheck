<script lang="ts" context="module">
  export async function getData() {
    const uratQuestions = await fetch(
      `${PUBLIC_API_URL}/readinesslevel/urat-questions/`
    );

    const data = await uratQuestions.json();
    if (uratQuestions.ok) {

      const calculatorQuestions = await fetch(
        `${PUBLIC_API_URL}/readinesslevel/calculator-questions/`
      );

      const data2 = await calculatorQuestions.json();


      if (calculatorQuestions.ok) {
        return {
          technologyQuestions: data.filter(
            (d: any) => d.readinessType === 'Technology'
          ),
          marketQuestions: data.filter(
            (d: any) => d.readinessType === 'Market'
          ),
          acceptanceQuestions: data.filter(
            (d: any) => d.readinessType === 'Acceptance'
          ),
          organizationalQuestions: data.filter(
            (d: any) => d.readinessType === 'Organizational'
          ),
          regulatoryQuestions: data.filter(
            (d: any) => d.readinessType === 'Regulatory'
          ),
          investmentQuestions: data.filter(
            (d: any) => d.readinessType === 'Investment'
          ),
          calculator: data2
        };
      }
    }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  import Button from '../ui/button/button.svelte';
  import DataPrivacy from './application/DataPrivacy.svelte';
  import EligibilityAgreement from './application/EligibilityAgreement.svelte';
  import ProjectDetails from './application/ProjectDetails.svelte';
  import GroupInformation from './application/GroupInformation.svelte';
  import Technology from './application/Technology.svelte';
  import Acceptance from './application/Acceptance.svelte';
  import Market from './application/Market.svelte';
  import Regulatory from './application/Regulatory.svelte';
  import Investment from './application/Investment.svelte';
  import Organizational from './application/Organizational.svelte';
  import TechnologyCalculator from './application/Calculator.svelte';
  import { PUBLIC_API_URL } from '$env/static/public';
  import { boolean } from 'zod';

  let data: any;
  let doneFetching = false;
  export let access: string;
  export let startup: any = null;

  const steps = [
    'data-privacy',
    'eligibility-agreement',
    'project-details',
    'group-information',
    'technology',
    'market',
    'regulatory',
    'acceptance',
    'organizational',
    'investment',
    'calculator'
  ];
  const labels = [
    'Data Privacy and Consent',
    'Eligibility and Agreement',
    'Project Details',
    'Group Information',
    'Technology Readiness Level',
    'Market Readiness Level',
    'Regulatory Readiness Level',
    'Acceptance Readiness Level',
    'Organizational Readiness Level',
    'Investment Readiness Level',
    'Technology and Commercialization Readiness Level Calculator'
  ];

  let currentActive = 0;
  let formData = {
    dataPrivacy: startup?.dataPrivacy ?? false,
    eligibility: startup?.eligibility ?? false
  };

  const toggleDataPrivacy = (value: boolean) => {
    formData.dataPrivacy = value;
  };

  const toggleEligibility = (value: boolean) => {
    formData.eligibility = value;
  };
  function handleStep(stepIncrement: number) {
    currentActive += stepIncrement;
  }

  onMount(() => {
    async function test() {
      const d = await getData();
      data = d;
      doneFetching = true;
    }
    test();
  });

  let submitting = false;
</script>

<form
  method="post"
  class="flex flex-col gap-5 p-3"
  enctype="multipart/form-data"
>
  {#if startup?.id}
    <input type="hidden" name="startupId" value={startup.id} />
  {/if}
  <h1 class="px-1 text-2xl font-semibold">{labels[currentActive]}</h1>
  <DataPrivacy
    dataPrivacy={formData.dataPrivacy}
    {toggleDataPrivacy}
    {currentActive}
    {startup}
  />
  <EligibilityAgreement
    {currentActive}
    {toggleEligibility}
    eligibility={formData.eligibility}
    {startup}
  />
  <ProjectDetails {currentActive} {access} {startup} />
  <GroupInformation {currentActive} {access} {startup} />
  {#if doneFetching && data}
    <Technology {currentActive} question={data.technologyQuestions} {startup} />
    <Market {currentActive} question={data.marketQuestions} {startup} />
    <Regulatory {currentActive} question={data.regulatoryQuestions} {startup} />
    <Acceptance {currentActive} question={data.acceptanceQuestions} {startup} />
    <Organizational {currentActive} question={data.organizationalQuestions} {startup} />
    <Investment {currentActive} question={data.investmentQuestions} {startup} />
    <TechnologyCalculator
      {currentActive}
      calculatorQuestions={data.calculator}
      {startup}
    />
  {/if}
  <div class="flex justify-end gap-3">
    {#if currentActive != 0}
      <Button variant="outline" class="w-24" onclick={() => handleStep(-1)}
        >Previous</Button
      >
    {/if}

    {#if currentActive < steps.length - 1}
      <Button
        variant="secondary"
        class="w-24"
        onclick={() => handleStep(1)}
        disabled={currentActive == 0 && !formData.dataPrivacy
          ? true
          : currentActive == 1 && !formData.eligibility
            ? true
            : false}>Next</Button
      >
    {:else}
      <Button class="w-24" type="submit" disabled={submitting}>Submit</Button>
    {/if}
  </div>
</form>
