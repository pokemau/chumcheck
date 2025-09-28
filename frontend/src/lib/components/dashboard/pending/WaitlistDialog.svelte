<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { X } from 'lucide-svelte';
  import { Textarea } from '$lib/components/ui/textarea';
  import { toast } from 'svelte-sonner';

  export let isOpen: boolean = false;
  export let onClose: () => void;
  export let onSubmit: (reason: string) => void;
  export let startupId: number;
  export let waitlistStartup: (startupId: number, data: { message: string }) => Promise<any>;

  let reason: string = '';
  let isLoading = false;

  async function handleSubmit() {
    isLoading = true;
    try {
      await waitlistStartup(startupId, { message: reason });
      onSubmit(reason);
      reason = '';
      toast.success('Startup has been waitlisted successfully');
      onClose();
      // Refresh page after successful waitlist
      window.location.reload();
    } catch (error) {
      console.error('Error occurred while waitlisting startup:', error);
      toast.error('Error occurred while waitlisting startup. Please try again.');
    } finally {
      isLoading = false;
    }
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div class="flex flex-col bg-background rounded-lg shadow-lg w-full max-w-xl mx-4 border border-border gap-4 p-6">
        <!-- Dialog Header -->
        <div class="flex justify-between items-center border-b pb-4">
            <h2 class="text-xl font-semibold text-foreground">Add to Waitlist</h2>
            <button 
            onclick={onClose}
            class="text-muted-foreground hover:text-foreground transition-colors"
            >
            <X class="w-5 h-5" />
            </button>
        </div>

        <!-- Dialog Content -->
        <div class="space-y-3">
            <label class="text-sm font-medium text-foreground" for="reason">
            Reason for waitlisting *
            </label>
            <Textarea
            id="reason"
            bind:value={reason}
            placeholder="Explain why this application is being waitlisted (missing requirements, details that need to be changed, etc.)"
            class="min-h-[120px] resize-none"
            />
        </div>

        <!-- Dialog Footer -->
        <div class="flex justify-end gap-3 p-2">
            <Button 
            variant="outline" 
            class="hover:bg-secondary/20"
            disabled={isLoading}
            onclick={onClose}
            >
            Cancel
            </Button>
            <Button 
            disabled={!reason.trim() || isLoading}
            onclick={handleSubmit}
            >
            {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
        </div>
    </div>
  </div>
{/if}