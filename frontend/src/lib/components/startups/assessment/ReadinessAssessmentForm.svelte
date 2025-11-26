<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import ShortAnswerField from './AssessmentTypes/ShortAnswerField.svelte';
  import LongAnswerField from './AssessmentTypes/LongAnswerField.svelte';
  import FileUploadField from './AssessmentTypes/FileUploadField.svelte';
  import type { Assessment } from '$lib/types/assessment.types';
  import { createEventDispatcher } from 'svelte';
  import axiosInstance from '$lib/axios';
  import { toast } from 'svelte-sonner';

  export let access: string;
  export let startupId: string;
  export let assessment: Assessment;
  export let isMentor = false;

  const dispatch = createEventDispatcher<{
    close: void;
    submit: {
      assessmentName: string;
      startupId: string;
      formData: Record<string, any>;
    };
    statusChanged: void;
  }>();

  let formData: Record<string, any> = {};
  let isSubmitting = false;
  let isInitialized = false;
  let isChangingStatus = false;
  let fileUploadComponents: Record<string, FileUploadField> = {};

  $: {
    if (!isInitialized && assessment?.assessmentFields) {
      assessment.assessmentFields.forEach((field) => {
        formData[field.id] = field.answer || '';
      });
      isInitialized = true;
    }
  }

  $: isAnyFileUploading = Object.values(fileUploadComponents).some(
    (component) => component?.processing
  );

  async function handleSubmit(): Promise<void> {
    if (isAnyFileUploading) {
      toast.error('Please wait for file uploads to complete');
      return;
    }

    try {
      isSubmitting = true;
      console.log('Starting submission');

      // Upload all pending files
      const fileUploadPromises = Object.entries(fileUploadComponents).map(
        async ([fieldId, component]) => {
          if (component && typeof component.uploadPendingFiles === 'function') {
            await component.uploadPendingFiles();
          }
        }
      );

      await Promise.all(fileUploadPromises);

      // Prepare submission data
      const submissionData: Record<string, any> = {};

      assessment.assessmentFields.forEach((field) => {
        submissionData[field.id] = formData[field.id] || '';
      });

      assessment.assessmentFields.forEach((field) => {
        if (field.type === 'File') {
        }
      });
      dispatch('submit', {
        assessmentName: assessment.name,
        startupId,
        formData: submissionData
      });

      toast.success('Assessment submitted successfully');
      // Don't close the form, let it refresh with updated data
    } catch (error) {
      console.error('Submission failed:', error);
      toast.error('Failed to upload files or submit assessment');
    } finally {
      isSubmitting = false;
    }
  }

  async function handleStatusChange(
    newStatus: 'complete' | 'pending'
  ): Promise<void> {
    try {
      isChangingStatus = true;

      const endpoint = `/assessments/startup/${startupId}/assessment/${encodeURIComponent(assessment.name)}/${newStatus}`;

      await axiosInstance.patch(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      toast.success(
        `Assessment marked as ${newStatus === 'complete' ? 'completed' : 'pending'}`
      );
      dispatch('statusChanged');
      dispatch('close');
    } catch (error) {
      console.error('Error changing assessment status:', error);
      toast.error(
        `Failed to mark assessment as ${newStatus === 'complete' ? 'completed' : 'pending'}`
      );
    } finally {
      isChangingStatus = false;
    }
  }
</script>

<form class="flex flex-col gap-5 p-3" enctype="multipart/form-data">
  <Dialog.Header>
    <Dialog.Title class="text-2xl font-semibold">{assessment.name}</Dialog.Title
    >
    {#if isMentor}
      <Dialog.Description>
        Mentor View - Assessment Status: {assessment.assessmentStatus}
      </Dialog.Description>
    {/if}
  </Dialog.Header>

  <div class="flex-1 overflow-y-auto px-1">
    <div class="flex h-0 flex-col gap-5">
      {#each assessment.assessmentFields as field}
        {#if field.type === 'ShortAnswer'}
          <ShortAnswerField
            description={field.description}
            bind:value={formData[field.id]}
            isReadOnly={isMentor}
          />
        {:else if field.type === 'LongAnswer'}
          <LongAnswerField
            description={field.description}
            bind:value={formData[field.id]}
            isReadOnly={isMentor}
          />
        {:else if field.type === 'File'}
          <FileUploadField
            bind:this={fileUploadComponents[field.id]}
            description={field.description}
            fileUrl={field.answer}
            bind:value={formData[field.id]}
            isReadOnly={isMentor}
            {access}
            {startupId}
            assessmentId={field.id}
            assessmentName={assessment.name}
            on:fileRemoved={() => dispatch('statusChanged')}
          />
        {/if}
      {/each}
    </div>
  </div>

  <div class="flex justify-end gap-3">
    <Button variant="outline" onclick={() => dispatch('close')}>Close</Button>

    {#if isMentor}
      {#if assessment.assessmentStatus === 'Completed'}
        <Button
          variant="destructive"
          disabled={isChangingStatus}
          onclick={() => handleStatusChange('pending')}
        >
          {isChangingStatus ? 'Updating...' : 'Mark as Pending'}
        </Button>
      {:else if assessment.assessmentStatus === 'Pending'}
        <Button
          variant="default"
          disabled={isChangingStatus}
          onclick={() => handleStatusChange('complete')}
        >
          {isChangingStatus ? 'Updating...' : 'Mark as Completed'}
        </Button>
      {/if}
    {:else}
      <Button
        variant="default"
        disabled={isSubmitting || isAnyFileUploading}
        onclick={handleSubmit}
      >
        {#if isAnyFileUploading}
          Uploading files...
        {:else if isSubmitting}
          Submitting...
        {:else}
          Submit Assessment
        {/if}
      </Button>
    {/if}
  </div>
</form>
