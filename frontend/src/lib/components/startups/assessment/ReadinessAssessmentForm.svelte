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
  
  // Initialize formData with existing answers if any
  $: {
    assessment.assessmentFields.forEach(field => {
      if (!formData[field.id]) {
        formData[field.id] = field.answer || (field.type === 'File' ? null : '');
      }
    });
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
          {#if isReadOnly && field.fileUrl}
            <div class="grid gap-2">
              <AssessmentLabel description={field.description} />
              <a
                href={field.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-blue-500 hover:underline"
              >
                <span>Download File</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
            </div>
          {:else}
            <FileUploadField
              description={field.description}
              bind:files={formData[field.id]}
              {isReadOnly}
            />
          {/if}
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
