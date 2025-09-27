<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import ReadinessAssessmentCard from '$lib/components/startups/assessment/ReadinessAssessmentCard.svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import ReadinessAssessmentForm from '$lib/components/startups/assessment/ReadinessAssessmentForm.svelte';
  import type { Assessment } from '$lib/types/assessment.types';

  const { data } = $props();
  const { access, startupId } = data;

  // TODO:
  // 1. need nga mahuman na ang manager assign RL
  // 2. need nga mahuman ang admin CRUD

  let showAssessmentForm = $state(false);
  const toggleAssessmentForm = () => {
    showAssessmentForm = !showAssessmentForm;
  };

  // Example assessments data (later from API)
  const assessments: Assessment[] = [
    {
      name: "Technology Readiness Assessment",
      assessmentStatus: "Pending",
      assessmentFields: [
        {
          id: "tech-signed-letter",
          description: "Signed Letter",
          type: "File"
        },
        {
          id: "tech-dean-response",
          description: "Dean's Response",
          type: "ShortAnswer"
        }
      ]
    },
    {
      name: "Market Readiness Assessment",
      assessmentStatus: "Pending",
      assessmentFields: [
        {
          id: "market-signed-letter",
          description: "Market Analysis",
          type: "File"
        },
        {
          id: "market-report",
          description: "Market Report",
          type: "LongAnswer"
        }
      ]
    },
    {
      name: "Investment Readiness Assessment",
      assessmentStatus: "Completed",
      assessmentFields: [
        {
          id: "tech-signed-letter",
          description: "Signed Letter",
          type: "File",
          fileUrl: "/api/files/tech-signed-letter.pdf" // example URL
        },
        {
          id: "tech-dean-response",
          description: "Dean's Response",
          type: "ShortAnswer",
          answer: "I have agreed upon as the Dean"
        }
      ]
    }
  ];

  // on:submit={handleAssessmentSubmit}

  let selectedAssessment = $state<Assessment | null>(null);
  
  function openAssessment(assessment: Assessment) {
    selectedAssessment = assessment;
    toggleAssessmentForm();
  }

  // Filter assessments based on role
  const displayedAssessments = $derived(() =>
    data.role === 'Mentor'
      ? assessments.filter(a => a.assessmentStatus === 'Completed')
      : assessments
  );

</script>

<!-- {#if data.role === 'Startup'} -->
  {#if true}
    {@render hasAssessments()}
  {:else}
    {@render noAssessments()}
  {/if}
  
  
<!-- {/if} -->

{#snippet hasAssessments()}
  {#if data.role === 'Startup'}
  <h1>Your application has been approved. Please complete the following readiness assessments</h1>
  {:else}
  <h1>Here are the current assessments of the startup. Click on "View Assessment" to see their progress.</h1>
  {/if}
  <h2 class="text-xl font-bold mt-6">Required Assessments</h2>
  
  {#each assessments as assessment}
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
