<script lang="ts">
  import Spinner from 'lucide-svelte/icons/loader-circle';
  import AssessmentLabel from './AssessmentLabel.svelte';
  
  export let description: string;
  export let files: FileList | null = null;
  export let fileUrl: string | undefined = undefined;
  export let processing = false;
  export let isReadOnly = false;

  // Ensure URL is absolute
  $: absoluteFileUrl = fileUrl?.startsWith('http') 
    ? fileUrl 
    : `https://${fileUrl}`;
</script>

<div class="grid gap-2">
  <AssessmentLabel description={description} />
  
  {#if isReadOnly}
    {#if fileUrl}
      <a
        href={absoluteFileUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-blue-500 hover:underline cursor-pointer"
      >
        <span>Download File</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      </a>
    {:else}
      <div class="text-sm text-muted-foreground">No file uploaded</div>
    {/if}
  {:else}
    <label
      for="fileUpload"
      class="flex h-32 cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-400 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
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
            <p class="text-xs text-gray-500">Click to change file</p>
          </div>
        {/if}
      {:else}
        <div class="text-center">
          <p>Drop files here or click to upload</p>
          <p class="text-xs text-gray-500">Supported file types: PDF, DOC, DOCX, etc.</p>
        </div>
      {/if}
    </label>
    <input
      id="fileUpload"
      type="file"
      class="hidden"
      bind:files
    />
  {/if}
</div>