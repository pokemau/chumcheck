<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import AssessmentLabel from './AssessmentLabel.svelte';
  
  export let description: string;
  export let value: string;
  export let isReadOnly = false;
</script>

<div class="grid gap-2">
  <AssessmentLabel description={description} />
  <Input
    type="text"
    placeholder={isReadOnly ? "No answer provided yet" : "Enter your answer"}
    bind:value
    disabled={isReadOnly}
    class={isReadOnly ? "bg-gray-50 dark:bg-gray-800" : ""}
  />
</div>