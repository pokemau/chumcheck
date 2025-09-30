<script lang="ts">
  import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
  import { useQueries, useQuery } from '@sveltestack/svelte-query';
  import axiosInstance from '$lib/axios';
  import { toast } from 'svelte-sonner';
  import * as Card from '$lib/components/ui/card/index.js';
  import ReadinessAssessmentCard from '$lib/components/startups/assessment/ReadinessAssessmentCard.svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import ReadinessAssessmentForm from '$lib/components/startups/assessment/ReadinessAssessmentForm.svelte';
  import type { Assessment } from '$lib/types/assessment.types';
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import Loading from '$lib/components/startup/Loading.svelte';

  const { data } = $props();
  const { access, startupId } = data;

  // TODO:
  // 1. need nga mahuman na ang manager assign RL
  // 2. need nga mahuman ang admin CRUD

  let showAssessmentForm = $state(false);
  const toggleAssessmentForm = () => {
    showAssessmentForm = !showAssessmentForm;
  };

  const handleAssessmentSubmit = async (event: CustomEvent<{ formData: Record<string, any> }>) => {
    try {
      const { formData } = event.detail;
      
      // Only include answers that have values
      const answers = Object.entries(formData)
        .filter(([id, value]) => {
          const field = selectedAssessment?.assessmentFields.find(f => f.id === id);
          // Include if:
          // 1. Not a file type and has value
          // 2. Is a file type and has actual file value (not example.com)
          return value && (
            field?.type !== 'File' || 
            (field?.type === 'File' && value !== 'example.com')
          );
        })
        .map(([id, value]) => ({
          assessmentId: id,
          answer: value
        }));

      const submitData = {
        startupId: parseInt(startupId),
        assessmentType: selectedAssessment?.name,
        answers
      };

      console.log('Submitting assessment data:', submitData);

      await axiosInstance.post('/assessments/submit', submitData, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      });

      $assessmentQuery.refetch();
      toast.success('Assessment submitted successfully');
      toggleAssessmentForm();
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast.error('Failed to submit assessment');
    }
  };

  // Separate query for getting assessments
  const assessmentQuery = useQuery({
    queryKey: ['assessmentData', startupId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/assessments/startup/${startupId}`, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      });
      return response.data;
    }
  });
  const isLoading  = $derived($assessmentQuery.isLoading);
  const isError = $derived($assessmentQuery.isError);
  let hasAssessment = $state(false);

  $effect(() => {
    console.log($assessmentQuery.data);
    if($assessmentQuery.data){
      hasAssessment = $assessmentQuery.data.length > 0;
    }
  });

  // Example assessments data (later from API)
  // const assessments: Assessment[] = [
  //   {
  //     name: "Technology Readiness Assessment",
  //     assessmentStatus: "Pending",
  //     assessmentFields: [
  //       {
  //         id: "tech-signed-letter",
  //         description: "Signed Letter",
  //         type: "File"
  //       },
  //       {
  //         id: "tech-dean-response",
  //         description: "Dean's Response",
  //         type: "ShortAnswer"
  //       }
  //     ]
  //   },
  //   {
  //     name: "Market Readiness Assessment",
  //     assessmentStatus: "Pending",
  //     assessmentFields: [
  //       {
  //         id: "market-signed-letter",
  //         description: "Market Analysis",
  //         type: "File"
  //       },
  //       {
  //         id: "market-report",
  //         description: "Market Report",
  //         type: "LongAnswer"
  //       }
  //     ]
  //   },
  //   {
  //     name: "Investment Readiness Assessment",
  //     assessmentStatus: "Completed",
  //     assessmentFields: [
  //       {
  //         id: "tech-signed-letter",
  //         description: "Signed Letter",
  //         type: "File",
  //         fileUrl: "/api/files/tech-signed-letter.pdf" // example URL
  //       },
  //       {
  //         id: "tech-dean-response",
  //         description: "Dean's Response",
  //         type: "ShortAnswer",
  //         answer: "I have agreed upon as the Dean"
  //       }
  //     ]
  //   }
  // ];

  let selectedAssessment = $state<Assessment | null>(null);
  
  function openAssessment(assessment: Assessment) {
    selectedAssessment = assessment;
    toggleAssessmentForm();
  }

  // Filter assessments based on role
  const displayedAssessments = $derived(() =>
    data.role === 'Mentor'
      ? $assessmentQuery.data.filter((a: { assessmentStatus: string; }) => a.assessmentStatus === 'Completed')
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
  <h1>Your application has been approved. Please complete the following readiness assessments</h1>
  {:else}
  <h1>Here are the current assessments of the startup. Click on "View Assessment" to see their progress.</h1>
  {/if}
  <h2 class="text-xl font-bold mt-6">Required Assessments</h2>
  
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
          isReadOnly={data.role === 'Mentor'}
        />
      {/if}
    </Dialog.Content>
  </Dialog.Root>
{/snippet}


{#snippet noAssessments()}
<Card.Root class="h-full">
  <Card.Content class="flex h-full flex-col items-center justify-center gap-5">
    <img src="/pending.svg" alt="pending" class="h-[300px] w-[300px]" />
    <h1>
      This startup is currently not assigned with an assessment right now.
    </h1>
  </Card.Content>
</Card.Root>
{/snippet}

{#snippet loading()}
<Loading data={data}></Loading>
{/snippet}

{#snippet error()}
  ERROR
{/snippet}
