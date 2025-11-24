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
  import { QualificationStatus } from '$lib/enums/qualification-status.enum';
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
  import Waitlisted from './application/Waitlisted.svelte';
  import { PUBLIC_API_URL } from '$env/static/public';
  import { boolean } from 'zod';

  let data: any;
  let doneFetching = false;
  export let access: string;
  export let startup: any = null;

  let steps = [
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
  
  let labels = [
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

  if (startup?.qualificationStatus === QualificationStatus.WAITLISTED) {
    steps = ['waitlisted'];
    labels = ['Your startup is currently waitlisted....'];
  }   

  let currentActive = 0;
  let currentStep = steps[currentActive];
  
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
    currentStep = steps[currentActive];
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

  // Extract waitlist message
  let waitlistMessage: string;
  $: {
    console.log('=== WAITLIST MESSAGE DEBUG ===');
    console.log('startup object:', startup);
    console.log('waitlistMessages:', startup?.waitlistMessages);
    
    if (startup?.waitlistMessages && startup.waitlistMessages.length > 0) {
      const messages = startup.waitlistMessages;
      const latestMessage = messages[messages.length - 1];
      waitlistMessage = latestMessage.message;
      
      console.log('Latest message object:', latestMessage);
      console.log('Message text:', waitlistMessage);
    } else {
      waitlistMessage = "Unable to load waitlisted message";
      console.log('No waitlist messages found');
    }
    console.log('=== END DEBUG ===');
  }
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
  <!-- TO ADD WAITLISTED SCREEN -->
  <Waitlisted
    stepName="waitlisted"
    message={waitlistMessage}
    {currentStep}
  />
  <DataPrivacy
    stepName="data-privacy"
    {currentStep}
    dataPrivacy={formData.dataPrivacy}
    {toggleDataPrivacy}
  />
  <EligibilityAgreement
    stepName="eligibility-agreement"
    {currentStep}
    {toggleEligibility}
    eligibility={formData.eligibility}
  />
  <ProjectDetails stepName="project-details" {currentStep} {access} {startup} />
  <GroupInformation stepName="group-information" {currentStep} {access} {startup} />
  {#if doneFetching && data}
    <Technology stepName="technology" {currentStep} question={data.technologyQuestions} {startup} />
    <Market stepName="market" {currentStep} question={data.marketQuestions} {startup} />
    <Regulatory stepName="regulatory" {currentStep} question={data.regulatoryQuestions} {startup} />
    <Acceptance stepName="acceptance" {currentStep} question={data.acceptanceQuestions} {startup} />
    <Organizational
      stepName="organizational" {currentStep}
      question={data.organizationalQuestions}
      {startup}
    />
    <Investment stepName="investment" {currentStep} question={data.investmentQuestions} {startup} />
    <TechnologyCalculator
      stepName="calculator" 
      {currentStep}
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
      {#if startup?.qualificationStatus === QualificationStatus.WAITLISTED}
        <div class="flex justify-end gap-3">
          <a href="/apply?startupId={startup.id}">
            <Button>
              Edit application
            </Button>
          </a>
        </div>
      {:else}
        <Button class="w-24" type="submit" disabled={submitting}>Submit</Button>
      {/if}
    {/if}
  </div>
</form>
