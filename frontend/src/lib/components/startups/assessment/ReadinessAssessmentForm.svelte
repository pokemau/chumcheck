<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import ShortAnswerField from './AssessmentTypes/ShortAnswerField.svelte';
  import LongAnswerField from './AssessmentTypes/LongAnswerField.svelte';
  import AssessmentLabel from './AssessmentTypes/AssessmentLabel.svelte';
  import FileUploadField from './AssessmentTypes/FileUploadField.svelte';
  import type { Assessment } from '$lib/types/assessment.types';
  import { createEventDispatcher } from 'svelte';

  export let access: string;
  export let startupId: string;
  export let assessment: Assessment;
  export let isReadOnly = false; // New prop for Mentor view

  const dispatch = createEventDispatcher<{
    close: void;
    submit: { assessmentName: string; startupId: string; formData: Record<string, any> };
  }>();

  let formData: Record<string, any> = {};
  let isSubmitting = false;
  let isInitialized = false;
  
  // Initialize formData with existing answers only once
  $: {
    if (!isInitialized && assessment?.assessmentFields) {
      assessment.assessmentFields.forEach(field => {
        if (field.type !== 'File') {
          formData[field.id] = field.answer || '';
        }
      });
      isInitialized = true;
      console.log('Initial formData:', formData);
    }
  }

  async function handleSubmit() {
    try {
      isSubmitting = true;
      console.log("ping - starting submission");
      
      // Simulate API call
      console.log("Form Data to be submitted:", {
        assessmentName: assessment.name,
        startupId,
        formData
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("ping - submission successful");
      dispatch('submit', { 
        assessmentName: assessment.name, 
        startupId, 
        formData 
      });
      dispatch('close');
    } catch (error) {
      console.error("ping - submission failed:", error);
    } finally {
      isSubmitting = false;
    }
  }

  function handleClose() {
    dispatch('close');
  }
</script>

<Card.Root class="flex h-[680px] flex-col border-0">
  <Card.Header>
    <Card.Title class="text-2xl font-semibold">{assessment.name}</Card.Title>
    {#if isReadOnly}
      <Card.Description>View Mode - Assessment Status: {assessment.assessmentStatus}</Card.Description>
    {/if}
  </Card.Header>

  <Card.Content class="flex-1 overflow-y-auto">
    <div class="flex flex-col gap-6">
      {#each assessment.assessmentFields as field}
        {#if field.type === 'ShortAnswer'}
          <ShortAnswerField
            description={field.description}
            bind:value={formData[field.id]}
            {isReadOnly}
          />
        {:else if field.type === 'LongAnswer'}
          <LongAnswerField
            description={field.description}
            bind:value={formData[field.id]}
            {isReadOnly}
          />
        {:else if field.type === 'File'}
          <FileUploadField
            description={field.description}
            bind:files={formData[field.id]}
            fileUrl={field.answer}
            {isReadOnly}
          />
        {/if}
      {/each}
    </div>
  </Card.Content>

  <Card.Footer class="flex justify-end gap-3 border-t p-4">
    <Button variant="outline" onclick={() => dispatch('close')}>
      {isReadOnly ? 'Close' : 'Cancel'}
    </Button>
    {#if !isReadOnly}
      <Button 
        variant="default"
        disabled={isSubmitting}
        onclick={handleSubmit}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
      </Button>
    {/if}
  </Card.Footer>
</Card.Root>
