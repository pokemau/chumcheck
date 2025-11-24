<script lang="ts">
  import { Label } from '$lib/components/ui/label';
  export let stepName: string;
  export let currentStep: string;
  export let message:string;
</script>

<div class="flex-1 overflow-auto px-1" class:hidden={currentStep !== stepName}>
  <div class="flex h-0 flex-col gap-5">
    <Label class="text-base font-semibold">
      Reason for waitlisting given by manager
    </Label>
    
    <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-800 dark:bg-gray-900">
      {message}
    </div>

    <div class="text-sm text-muted-foreground">
      Your startup application has been waitlisted. Please review the reason provided above and make the necessary improvements. Once you have addressed these concerns, you can proceed with the rest of the application process. We encourage you to thoroughly review each section and ensure all requirements are met before continuing.
    </div>
  </div>
</div>