<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Textarea } from '$lib/components/ui/textarea';
  import { toast } from 'svelte-sonner';

  export let showDialog: boolean = false;
  export let toggleDialog: () => void;
  export let startupId: number;
  export let waitlistStartup: (startupId: number, data: { message: string }) => Promise<any>;

  let reason: string = '';
  let isLoading = false;

  async function handleSubmit() {
    isLoading = true;
    try {
      await waitlistStartup(startupId, { message: reason });
      reason = '';
      toast.success('Startup has been waitlisted successfully');
    } catch (error) {
      console.error('Error occurred while waitlisting startup:', error);
      toast.error('Error occurred while waitlisting startup. Please try again.');
    } finally {
      isLoading = false;
    }
  }
</script>

  <Dialog.Root open={showDialog} onOpenChange={toggleDialog}>
  <Dialog.Content class="sm:max-w-xl">
    <Dialog.Header>
      <Dialog.Title>Add to Waitlist</Dialog.Title>
    </Dialog.Header>

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
        class="transition-transform hover:scale-105 duration-200"
        disabled={isLoading}
        onclick={toggleDialog}
      >
        Cancel
      </Button>
      <Button 
        class="transition-transform hover:scale-105 duration-200"
        disabled={!reason.trim() || isLoading}
        onclick={handleSubmit}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
    </div>
  </Dialog.Content>
</Dialog.Root>