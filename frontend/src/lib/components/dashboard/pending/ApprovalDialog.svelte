<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Select from '$lib/components/ui/select';
  import { toast } from 'svelte-sonner';
  import AssessmentPreviewDialog from './AssessmentPreviewDialog.svelte';

  export let startup: any;
  export let showDialog: boolean = false;
  export let toggleDialog: () => void;
  export let mentors: {id: number, email: string, firstName: string, lastName: string, role: string}[] = [];
  export let assessments: {id: number, name: string, fields: {id: number, label: string, fieldType: number}[]}[] = [];
  export let onApprove: (startupId: number, mentorId: any) => Promise<void>;
  export let assignAssessmentsToStartup: (startupId: number, assessmentTypeIds: number[]) => Promise<any>;

  let selectedMentor: string;
  let isLoading = false;

  // Local selection state for assessments
  let selectedAssessments = new Set<number>();
  let previewOpen = false;
  let previewAssessment: { id: number; name: string; fields: { id: number; label: string; fieldType: number }[] } | null = null;

  function toggleAssessment(id: number) {
    const next = new Set(selectedAssessments);
    if (next.has(id)) next.delete(id); else next.add(id);
    selectedAssessments = next;
  }

  function openPreview(asmt: { id: number; name: string; fields: { id: number; label: string; fieldType: number }[] }) {
    previewAssessment = asmt;
    previewOpen = true;
  }

  function closePreview() {
    previewOpen = false;
  }


  async function handleApprove() {
    if (!selectedMentor || selectedAssessments.size === 0) {
      // Not yet added a default SELECTED ASSESSMENT
      toast.error('Please select at least one readiness level assessment and assign a mentor.');
      return;
    }
    isLoading = true;
    try {
      await assignAssessmentsToStartup(startup.id, Array.from(selectedAssessments));
      await onApprove(startup.id, selectedMentor);
      toast.success('Startup has been approved successfully');
      toggleDialog();
    } catch (error) {
      console.error('Error during approval:', error);
      toast.error('An error occurred during approval. Please try again.');
    } finally {
      isLoading = false;
    }
  }
</script>

{#if startup}
  <Dialog.Root open={showDialog} onOpenChange={toggleDialog}>
    <Dialog.Content class="sm:max-w-[500px]">
      <Dialog.Header>
        <Dialog.Title>
          Approve {startup.capsuleProposal?.title || startup.name}
        </Dialog.Title>
      </Dialog.Header>

      <!-- Dialog Content -->
      <div class="space-y-6">
        <!-- Readiness Level Forms Selection -->
        <div>
          <h3 class="text-lg font-medium mb-4">Additional Readiness Level Assessments</h3>
          <p class="text-sm text-muted-foreground mb-4">Select at least one readiness level form for the applicants to fill up</p>
          {#if assessments && assessments.length > 0}
            <div class="space-y-3">
              {#each assessments as asmt (asmt.id)}
                <Card.Root class="border bg-secondary/10">
                  <div class="flex items-center justify-between p-3">
                    <label class="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        class="h-4 w-4 accent-primary"
                        checked={selectedAssessments.has(asmt.id)}
                        on:change={() => toggleAssessment(asmt.id)}
                      />
                      <span class="text-foreground font-medium">{asmt.name}</span>
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onclick={() => openPreview(asmt)}
                      class="shrink-0"
                    >
                      View Details
                    </Button>
                  </div>
                </Card.Root>
              {/each}
            </div>
          {:else}
            <div class="space-y-3">
              <p class="text-sm text-muted-foreground">No forms for startup to answer...</p>
            </div>
          {/if}
        </div>

        <!-- Mentor Selection -->
        <div>
          <h3 class="text-lg font-medium mb-4">Assign a Mentor</h3>
          <Select.Root type="single" bind:value={selectedMentor}>
            <Select.Trigger class="w-full">
              {#if mentors && mentors.length > 0 && selectedMentor}
                {mentors.find(m => m.id === Number(selectedMentor))?.firstName} {mentors.find(m => m.id === Number(selectedMentor))?.lastName}
              {:else}
                Select Mentor
              {/if}
            </Select.Trigger>
            <Select.Content>
              {#each mentors as mentor}
                <Select.Item value={String(mentor.id)}>
                  {mentor.firstName} {mentor.lastName}
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-0">
        <Button 
          variant="outline" 
          class="transition-transform hover:scale-105 duration-200"
          disabled={isLoading}
          onclick={toggleDialog}
        >
          Cancel
        </Button>
        <Button 
          class="transition-transform hover:scale-105 duration-200"
          disabled={!selectedMentor || selectedAssessments.size === 0 || isLoading}
          onclick={handleApprove}
        >
          {isLoading ? 'Approving...' : 'Approve'}
        </Button>
      </div>

      {#if !selectedMentor || selectedAssessments.size === 0}
        <p class="text-red-500 text-sm mt-4">Please select at least one readiness level assessment and assign a mentor.</p>
      {/if}

      <AssessmentPreviewDialog 
        open={previewOpen} 
        onOpenChange={closePreview} 
        assessment={previewAssessment}
      />
    </Dialog.Content>
  </Dialog.Root>
{/if}