<script lang="ts">
  import Spinner from 'lucide-svelte/icons/loader-circle';
  import AssessmentLabel from './AssessmentLabel.svelte';
  
  export let description: string;
  export let files: FileList | null = null;
  export let processing = false;
  export let isReadOnly = false;
</script>

<div class="grid gap-2">
  <AssessmentLabel description={description} />
  <label
    for={isReadOnly ? undefined : "fileUpload"}
    class="flex h-32 items-center justify-center rounded-lg border border-dashed
           border-gray-400 text-sm transition-colors
           {isReadOnly ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800'}"
  >
    {#if files}
      {#if processing}
        <div class="flex flex-col items-center justify-center gap-3">
          <Spinner class="mr-2 h-6 w-6 animate-spin" />
          <span class="text-sm">Processing file...</span>
        </div>
      {:else}
        <div class="text-center">
          <p>{files[0].name}</p>
          <p class="text-xs text-gray-500">
            {isReadOnly ? 'File uploaded' : 'Click to change file'}
          </p>
        </div>
      {/if}
    {:else}
      <div class="text-center">
        {#if isReadOnly}
          <p class="text-gray-500">No file uploaded yet</p>
        {:else}
          <p></p>
          <p class="text-gray-500">Drop files here or click to upload</p>
        {/if}
      </div>
    {/if}
  </label>
  {#if !isReadOnly}
    <input
      id="fileUpload"
      type="file"
      accept=".pdf,.doc,.docx"
      class="hidden"
      bind:files
      disabled={isReadOnly}
    />
  {/if}
</div>