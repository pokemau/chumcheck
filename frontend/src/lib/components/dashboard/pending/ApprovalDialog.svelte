<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Select from '$lib/components/ui/select';
  import { ReadinessType } from '$lib/utils';
  import { toast } from 'svelte-sonner';

  export let startup: any;
  export let showDialog: boolean = false;
  export let toggleDialog: () => void;
  export let mentors: any[] = [];
  export let onApprove: (startupId: number, mentorId: any) => Promise<void>;

  let selectedMentor: any = null;
  let isLoading = false;

  async function handleApprove() {
    if (!selectedMentor) {
      alert('Please select a mentor first');
      return;
    }
    isLoading = true;
    try {
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
          <div class="space-y-3">
            <p>No forms for startup to answer...</p>
          </div>
        </div>

        <!-- Mentor Selection -->
        <div>
          <h3 class="text-lg font-medium mb-4">Assign a Mentor</h3>
          <Select.Root type="single" bind:value={selectedMentor}>
            <Select.Trigger class="w-full">
              {#if mentors && mentors.length > 0 && selectedMentor}
                {mentors.find(m => m.id === selectedMentor)?.firstName} {mentors.find(m => m.id === selectedMentor)?.lastName}
              {:else}
                Select Mentor
              {/if}
            </Select.Trigger>
            <Select.Content>
              {#each mentors as mentor}
                <Select.Item value={mentor.id}>
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
          disabled={!selectedMentor || isLoading}
          onclick={handleApprove}
        >
          {isLoading ? 'Approving...' : 'Approve'}
        </Button>
      </div>
    </Dialog.Content>
  </Dialog.Root>
{/if}