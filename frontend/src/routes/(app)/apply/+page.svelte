<script lang="ts">
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

  let { data }: { data: PageData } = $props();
  const { form, errors, enhance, message, submitting, validate } = superForm(
    data.form,
    {
      dataType: 'json',
      validators: zod(applicationSchema)
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

  $effect(() => {
    if ($message && !$submitting) {
      toast.dismiss();
      toast.success('Application submitted');
      goto('/startups');
    }
  });

  const progress = $derived(() => (currentStep / steps.length) * 100);
  const currentStepData = $derived(() => steps[currentStep - 1]);
</script>

<div class="mx-auto max-w-4xl space-y-6 p-6">
  <WaitlistedMessage message="PUT WAITLISTED MESSAGE HERE" />
  <!-- Progress Bar -->
  <Card>
    <CardContent class="pt-6">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-foreground">
            Step {currentStep} of {steps.length}
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
          disabled={$submitting}
          class="flex items-center gap-2"
        >
          {$submitting ? 'Submitting...' : 'Submit Application'}
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
</div>
