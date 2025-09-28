<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { X } from 'lucide-svelte';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Select from '$lib/components/ui/select';
  import { ReadinessType } from '$lib/utils';
  import { toast } from 'svelte-sonner';

  export let startup: any;
  export let isOpen: boolean = false;
  export let onClose: () => void;
  export let mentors: any[] = [];
  export let onApprove: (startupId: number, mentorId: any) => Promise<void>;

  let selectedMentor: any = null;

  async function handleApprove() {
    if (!selectedMentor) {
      alert('Please select a mentor first');
      return;
    }
    try {
      await onApprove(startup.id, selectedMentor);
      toast.success('Startup has been approved successfully');
      onClose();
      // Close parent dialog and refresh page
      window.location.reload();
    } catch (error) {
      console.error('Error during approval:', error);
      toast.error('An error occurred during approval. Please try again.');
      return;
    }
  }
</script>

{#if isOpen && startup}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="flex flex-col bg-background rounded-lg shadow-xl w-[500px] mx-4 gap-4 p-6">
      <!-- Dialog Header -->
      <div class="flex justify-between items-center pb-4 border-b">
        <h2 class="text-xl font-semibold text-foreground">
          Approve {startup.capsuleProposal?.title || startup.name}
        </h2>
        <button 
          onclick={onClose}
          class="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

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
          onclick={onClose}
        >
          Cancel
        </Button>
        <Button 
          variant="default"
          onclick={handleApprove}
        >
          Approve
        </Button>
      </div>
    </div>
  </div>
{/if}