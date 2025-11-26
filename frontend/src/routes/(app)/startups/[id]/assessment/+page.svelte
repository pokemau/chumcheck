<script lang="ts">
  import { useQuery } from '@sveltestack/svelte-query';
  import axiosInstance from '$lib/axios';
  import { toast } from 'svelte-sonner';
  import * as Card from '$lib/components/ui/card/index.js';
  import ReadinessAssessmentCard from '$lib/components/startups/assessment/ReadinessAssessmentCard.svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import ReadinessAssessmentForm from '$lib/components/startups/assessment/ReadinessAssessmentForm.svelte';
  import type { Assessment } from '$lib/types/assessment.types';
  import Loading from '$lib/components/startup/Loading.svelte';

  const { data } = $props();
  const { access, startupId } = data;

  let showAssessmentForm = $state(false);

  function toggleAssessmentForm(): void {
    showAssessmentForm = !showAssessmentForm;
  }

  async function handleAssessmentSubmit(
    event: CustomEvent<{
      assessmentName: string;
      startupId: string;
      formData: Record<string, any>;
    }>
  ): Promise<void> {
    const { assessmentName, startupId, formData } = event.detail;

    try {
      const assessmentType = $assessmentQuery.data?.find(
        (a: Assessment) => a.name === assessmentName
      );

      if (!assessmentType) {
        throw new Error('Assessment type not found');
      }

      // Map formData to responses array
      const responses = assessmentType.assessmentFields.map((field: any) => ({
        assessmentId: field.id,
        answerValue: formData[field.id] || ''
      }));

      const payload = {
        startupId: parseInt(startupId, 10),
        assessmentName,
        responses
      };

      await axiosInstance.post('/assessments/submit', payload, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      });

      // Refetch assessments to update the form with latest data
      await $assessmentQuery.refetch();
    } catch (error: any) {
      console.error('=== SUBMISSION ERROR ===');
      console.error('Error submitting assessment:', error);
      console.error('Error response:', error.response?.data);
      console.error('=== END ERROR ===');
      toast.error('Failed to submit assessment');
    }
  }

  // Query for getting assessments
  const assessmentQuery = useQuery({
    queryKey: ['assessmentData', startupId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/assessments/startup/${startupId}`,
        {
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );
      return response.data;
    }
  });

  const isLoading = $derived($assessmentQuery.isLoading);
  const isError = $derived($assessmentQuery.isError);
  let hasAssessment = $state(false);

  $effect(() => {
    if ($assessmentQuery.data) {
      hasAssessment = $assessmentQuery.data.length > 0;
    }
  });

  let selectedAssessment = $state<Assessment | null>(null);

  function openAssessment(assessment: Assessment): void {
    selectedAssessment = assessment;
    toggleAssessmentForm();
  }

  // Filter assessments based on role
  const displayedAssessments = $derived(() =>
    data.role === 'Mentor'
      ? $assessmentQuery.data?.filter(
          (a: Assessment) => a.assessmentStatus === 'Completed'
        )
      : $assessmentQuery.data
  );
</script>

{#if isLoading}
  {@render loading()}
{:else if hasAssessment}
  {@render hasAssessments()}
{:else if !hasAssessment}
  {@render noAssessments()}
{:else if isError}
  {@render error()}
{/if}

{#snippet hasAssessments()}
  {#if data.role === 'Startup'}
    <h1>
      Your application has been approved. Please complete the following
      readiness assessments
    </h1>
  {:else}
    <h1>
      Here are the current assessments of the startup. Click on "View
      Assessment" to see their progress.
    </h1>
  {/if}
  <h2 class="mt-6 text-xl font-bold">Required Assessments</h2>

  {#each $assessmentQuery.data as assessment}
    <ReadinessAssessmentCard
      name={assessment.name}
      assessmentStatus={assessment.assessmentStatus}
      buttonProps={{ onclick: () => openAssessment(assessment) }}
      isReadOnly={data.role === 'Mentor'}
    />
  {/each}

  <Dialog.Root open={showAssessmentForm} onOpenChange={toggleAssessmentForm}>
    <Dialog.Content class="h-4/5 max-w-[800px]">
      {#if selectedAssessment}
        <ReadinessAssessmentForm
          {access}
          {startupId}
          assessment={selectedAssessment}
          on:close={toggleAssessmentForm}
          on:submit={handleAssessmentSubmit}
          on:statusChanged={() => $assessmentQuery.refetch()}
          isMentor={data.role === 'Mentor'}
        />
      {/if}
    </Dialog.Content>
  </Dialog.Root>
{/snippet}

{#snippet noAssessments()}
  <Card.Root class="h-full">
    <Card.Content
      class="flex h-full flex-col items-center justify-center gap-5"
    >
      <img src="/pending.svg" alt="pending" class="h-[300px] w-[300px]" />
      <h1>
        This startup is currently not assigned with an assessment right now.
      </h1>
    </Card.Content>
  </Card.Root>
{/snippet}

{#snippet loading()}
  <Loading {data}></Loading>
{/snippet}

{#snippet error()}
  ERROR
{/snippet}
