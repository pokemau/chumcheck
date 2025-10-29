<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
  } from '$lib/components/ui/card';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import { applicationSchema } from '$lib/validators/application.validator';
  import { type PageData } from './$types';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import StartupDetailsStep from '$lib/components/startup/application/StartupDetailsStep.svelte';
  import IncubationPlanStep from '$lib/components/startup/application/IncubationPlanStep.svelte';
  import TeamMembersStep from '$lib/components/startup/application/TeamMembersStep.svelte';
  import WaitlistedMessage from '$lib/components/startup/application/WaitlistedMessage.svelte';
  import axiosInstance from '$lib/axios';

  let { data }: { data: PageData } = $props();
  
  const startupIdParam = $derived($page.url.searchParams.get('startupId'));
  const isEditMode = $derived(!!startupIdParam);
  
  let startupData: any = $state(null);
  let isLoadingStartup = $state(false);

  const { form, errors, enhance, message, submitting, validate } = superForm(
    data.form,
    {
      dataType: 'json',
      validators: zod(applicationSchema),
      onSubmit: async ({ formData, cancel }) => {
        if (isEditMode && startupIdParam) {
          cancel();
          await handleEditSubmit();
        }
      }
    }
  );

  const stepFields = {
    1: [
      'title',
      'description',
      'problemStatement',
      'targetMarket',
      'solutionDescription',
      'historicalTimeline',
      'competitiveAdvantageAnalysis',
      'intellectualPropertyStatus'
    ],
    2: ['objectives', 'proposalScope', 'methodology'],
    3: ['members', 'curriculumVitae']
  };

  const steps = [
    {
      id: 1,
      title: 'Startup Details',
      description: 'Project info, market analysis, and competitive landscape'
    },
    {
      id: 2,
      title: 'Incubation Plan',
      description: 'Objectives, scope, and methodology'
    },
    {
      id: 3,
      title: 'Team Members',
      description: 'Team composition and leadership information'
    }
  ];

  let currentStep = $state(1);

  async function nextStep() {
    const fieldsToValidate = stepFields[currentStep as keyof typeof stepFields];

    await Promise.all(
      fieldsToValidate.map((field) => validate(field as any, { update: true }))
    );

    const currentErrors = fieldsToValidate.flatMap((field: any) => {
      const fieldError = $errors[field];

      if (typeof fieldError === 'string' || Array.isArray(fieldError)) {
        return fieldError && fieldError.length > 0 ? [[field, fieldError]] : [];
      }

      if (fieldError && typeof fieldError === 'object') {
        const nestedErrors = Object.entries(fieldError).filter(
          ([_, value]) => value && Object.keys(value).length > 0
        );
        return nestedErrors.length > 0 ? [[field, fieldError]] : [];
      }

      return [];
    });

    if (currentErrors.length > 0) {
      toast.error('Please fix the errors before proceeding');
      return;
    }

    if (currentStep < steps.length) {
      currentStep += 1;
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep -= 1;
    }
  }

  async function loadStartupData() {
    if (!startupIdParam) return;

    isLoadingStartup = true;
    try {
      const response = await axiosInstance.get(
        `/startups/${startupIdParam}`,
        {
          headers: { Authorization: `Bearer ${data.access}` }
        }
      );

      startupData = response.data;
      
      // Autofill form with existing data
      if (startupData.capsuleProposal) {
        $form.title = startupData.capsuleProposal.title || '';
        $form.description = startupData.capsuleProposal.description || '';
        $form.problemStatement = startupData.capsuleProposal.problemStatement || '';
        $form.targetMarket = startupData.capsuleProposal.targetMarket || '';
        $form.solutionDescription = startupData.capsuleProposal.solutionDescription || '';
        $form.objectives = startupData.capsuleProposal.objectives || [];
        $form.historicalTimeline = startupData.capsuleProposal.historicalTimeline || [];
        $form.competitiveAdvantageAnalysis = startupData.capsuleProposal.competitiveAdvantageAnalysis || [];
        $form.intellectualPropertyStatus = startupData.capsuleProposal.intellectualPropertyStatus || '';
        $form.proposalScope = startupData.capsuleProposal.scope || '';
        $form.methodology = startupData.capsuleProposal.methodology || '';
        $form.curriculumVitae = startupData.capsuleProposal.curriculumVitae || '';
        $form.members = startupData.capsuleProposal.members || [];
      }

    } catch (error) {
      console.error('Error loading startup data:', error);
      toast.error('Failed to load startup data');
      goto('/startups');
    } finally {
      isLoadingStartup = false;
    }
  }

  async function handleEditSubmit(): Promise<void> {
    try {
      const payload = {
        title: $form.title,
        description: $form.description,
        problemStatement: $form.problemStatement,
        targetMarket: $form.targetMarket,
        solutionDescription: $form.solutionDescription,
        objectives: $form.objectives,
        historicalTimeline: $form.historicalTimeline,
        competitiveAdvantageAnalysis: $form.competitiveAdvantageAnalysis,
        intellectualPropertyStatus: $form.intellectualPropertyStatus,
        proposalScope: $form.proposalScope, 
        methodology: $form.methodology,
        curriculumVitae: $form.curriculumVitae,
        members: $form.members
      };

      console.log('=== FINAL PAYLOAD ===');
      console.log(JSON.stringify(payload, null, 2));

      const response = await axiosInstance.patch(
        `/startups/${startupIdParam}/reapply`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${data.access}`,
            'Content-Type': 'application/json',
          },
        },
      );
      toast.success('Application updated successfully');

      console.log('=== RESPONSE ===');
      console.log(response.data);

      await goto('/startups');
    } catch (error: any) {
      console.error('Error updating startup:', error);
      console.error('Error response:', error.response?.data);
      toast.error(
        error.response?.data?.message || 'Failed to update application',
      );
    }
  }

  onMount(() => {
    if (isEditMode) {
      loadStartupData();
    }
  });

  $effect(() => {
    if ($message && !$submitting && !isEditMode) {
      toast.dismiss();
      toast.success('Application submitted');
      goto('/startups');
    }
  });

  const progress = $derived(() => (currentStep / steps.length) * 100);
  const currentStepData = $derived(() => steps[currentStep - 1]);

  // Add a derived state for the waitlist message
  const waitlistMessage = $derived(() => {
    if (!startupData?.waitlistMessages || startupData.waitlistMessages.length === 0) {
      return 'Your application is currently waitlisted. Please review and resubmit.';
    }
    // Get the most recent message
    const messages = startupData.waitlistMessages;
    const latestMessage = messages[messages.length - 1];
    return latestMessage.message;
  });
</script>

<div class="mx-auto max-w-4xl space-y-6 p-6">
  {#if isEditMode && startupData}
    <WaitlistedMessage message={waitlistMessage()} />
  {/if}
  {#if isLoadingStartup}
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center justify-center py-12">
          <p class="text-muted-foreground">Loading startup data...</p>
        </div>
      </CardContent>
    </Card>
  {:else}
    <!-- Progress Bar -->
    <Card>
      <CardContent class="pt-6">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-foreground">
              {isEditMode ? 'Edit Application' : 'New Application'} - Step {currentStep} of {steps.length}
            </h2>
            <p class="mt-1 text-base font-medium text-primary">
              {currentStepData().title}
            </p>
          </div>
          <div class="text-sm font-medium text-muted-foreground">
            {Math.round(progress())}% Complete
          </div>
        </div>

        <!-- Step indicators -->
        <div class="mt-4 flex justify-between">
          {#each steps as step}
            <div
              class="flex flex-col items-center text-xs font-medium {step.id <=
              currentStep
                ? 'text-primary'
                : 'text-muted-foreground'}"
            >
              <div
                class="mb-1 flex h-8 w-8 items-center justify-center rounded-full font-semibold {step.id <=
                currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'}"
              >
                {step.id}
              </div>
              <span class="max-w-20 text-center">{step.title}</span>
            </div>
          {/each}
        </div>
      </CardContent>
    </Card>

    <!-- Form Step Content -->
    <form method="post" use:enhance>
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl font-bold text-foreground">
            {currentStepData().title}
          </CardTitle>
          <p class="text-base font-medium text-muted-foreground">
            {currentStepData().description}
          </p>
        </CardHeader>

        <CardContent>
          <div class={currentStep === 1 ? '' : 'hidden'}>
            <StartupDetailsStep {form} {errors} />
          </div>
          <div class={currentStep === 2 ? '' : 'hidden'}>
            <IncubationPlanStep {form} {errors} />
          </div>
          <div class={currentStep === 3 ? '' : 'hidden'}>
            <TeamMembersStep {form} {errors} />
          </div>
        </CardContent>
      </Card>

      <!-- Navigation -->
      <div class="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onclick={prevStep}
          disabled={currentStep === 1}
          class="flex items-center gap-2 bg-transparent"
        >
          <ChevronLeft class="h-4 w-4" />
          Previous
        </Button>

        {#if currentStep === steps.length}
          <Button
            type="submit"
            disabled={$submitting || isLoadingStartup}
            class="flex items-center gap-2"
          >
            {$submitting ? (isEditMode ? 'Updating...' : 'Submitting...') : (isEditMode ? 'Update Application' : 'Submit Application')}
          </Button>
        {:else}
          <Button
            type="button"
            onclick={nextStep}
            class="flex items-center gap-2"
          >
            Next
            <ChevronRight class="h-4 w-4" />
          </Button>
        {/if}
      </div>
    </form>
  {/if}
</div>
