<script lang="ts">
  import Spinner from 'lucide-svelte/icons/loader-circle';
  import AssessmentLabel from './AssessmentLabel.svelte';
  
  export let description: string;
  export let files: FileList | null = null;
  export let fileUrl: string | undefined = undefined;
  export let isReadOnly = false;
  export let value: string = '';

  let processing = false;
  let uploadComplete = false;

  // Ensure URL is absolute
  $: absoluteFileUrl = fileUrl?.startsWith('http') 
    ? fileUrl 
    : `https://${fileUrl}`;

  // Simulate file upload API
  async function handleFileUpload(selectedFiles: FileList | null): Promise<void> {
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    processing = true;
    uploadComplete = false;
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate API response with example.com
      const uploadedFileUrl = 'example.com';
      
      // Update the value which will be submitted
      value = uploadedFileUrl;
      uploadComplete = true;
      
      console.log(`File "${selectedFiles[0].name}" uploaded, URL: ${uploadedFileUrl}`);
    } catch (error) {
      console.error('File upload failed:', error);
      uploadComplete = false;
    } finally {
      processing = false;
    }
  }

  // Watch for file changes and trigger upload
  $: if (files && files.length > 0 && !processing) {
    handleFileUpload(files);
  }

  // Export processing state for parent component
  export { processing };
</script>

<div class="grid gap-2">
  <AssessmentLabel {description} />
  
  {#if isReadOnly}
    {#if fileUrl}
      <a
        href={absoluteFileUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-blue-500 hover:underline cursor-pointer"
      >
        <span>Download File</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </a>
    {:else}
      <div class="text-sm text-muted-foreground">No file uploaded</div>
    {/if}
  {:else}
    <!-- Show existing file download link if there's a fileUrl or uploaded value -->
    {#if (fileUrl || (value && uploadComplete)) && !processing}
      <div class="mb-2">
        <a
          href={fileUrl ? absoluteFileUrl : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-blue-500 hover:underline cursor-pointer"
        >
          <span>Download File</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </a>
      </div>
    {/if}
    
    <label
      for="fileUpload-{description}"
      class="flex h-32 cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-400 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      {#if processing}
        <div class="flex flex-col items-center justify-center gap-3">
          <Spinner class="mr-2 h-6 w-6 animate-spin" />
          <span class="text-sm">Processing file...</span>
        </div>
      {:else if uploadComplete && files && files.length > 0}
        <div class="text-center">
          <p>✅ {files[0].name} uploaded successfully</p>
          <p class="text-xs text-gray-500">Click to change file</p>
        </div>
      {:else}
        <div class="text-center">
          {#if fileUrl || (value && uploadComplete)}
            <p>Replace uploaded file here by dragging file or click to upload</p>
          {:else}
            <p>Drop files here or click to upload</p>
          {/if}
          <p class="text-xs text-gray-500">Supported file types: PDF, DOC, DOCX, etc.</p>
        </div>
      {/if}
    </label>
    <input
      id="fileUpload-{description}"
      type="file"
      class="hidden"
      bind:files
    />
  {/if}
</div>