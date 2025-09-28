<script lang="ts">
    export let message: string;
</script>

<div class="rounded-2xl border bg-card p-6 shadow-sm ">
    <div class="flex flex-col items-center space-y-4">
      <!-- Icon -->
      <!-- <div class="w-16 h-16 rounded-full border-2 border-orange-500 flex items-center justify-center"> -->
        <img src="/clock.svg" alt="Tasks" class="w-16 h-16" />
      <!-- </div> -->
      
      <!-- Title -->
      <h2 class="text-xl font-semibold text-foreground text-center">
        Application Waitlisted
      </h2>
      
      <!-- Description -->
      <p class="text-muted-foreground text-center text-sm leading-relaxed">
        Your application has been waitlisted and requires additional information or modifications.
      </p>
      
      <!-- Feedback Card -->
      <div class="w-full rounded-lg bg-orange-50 border border-orange-200 p-4 dark:bg-orange-950/20 dark:border-orange-900/30">
        <div class="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-2">
          Feedback from the manager:
        </div>
        <div class="text-sm text-orange-700 dark:text-orange-400">
          {message}
        </div>
      </div>
      
      <!-- Footer text -->
      <p class="text-xs text-muted-foreground text-center">
        Please address the feedback above and resubmit your application when ready.
      </p>
    </div>
</div>