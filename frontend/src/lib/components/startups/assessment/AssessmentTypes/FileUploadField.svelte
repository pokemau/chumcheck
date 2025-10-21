<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Spinner from 'lucide-svelte/icons/loader-circle';
  import X from 'lucide-svelte/icons/x';
  import AssessmentLabel from './AssessmentLabel.svelte';
  import axiosInstance from '$lib/axios';
  import { toast } from 'svelte-sonner';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  
  export let description: string;
  export let files: FileList | null = null;
  export let fileUrl: string | undefined = undefined;
  export let isReadOnly = false;
  export let value: string = '';
  export let access: string;
  export let startupId: string;
  export let assessmentId: string;
  export let assessmentName: string;

  const dispatch = createEventDispatcher<{ fileRemoved: void }>();
  const UPLOAD_FOLDER = 'assessments';

  let processing = false;
  let pendingFiles: File[] = [];
  let uploadedFiles: Array<{ url: string; fileName: string }> = [];
  let showDeleteConfirm = false;
  let fileToDeleteIndex: number | null = null;

  // Initialize uploaded files from existing JSON data
  $: {
    if (fileUrl && uploadedFiles.length === 0) {
      try {
        const parsed = JSON.parse(fileUrl);
        if (parsed.files && Array.isArray(parsed.files)) {
          uploadedFiles = parsed.files;
          updateValue();
        }
      } catch {
        // Not JSON, ignore
      }
    }
  }

  // Update value whenever uploadedFiles changes
  function updateValue(): void {
    if (uploadedFiles.length > 0) {
      value = JSON.stringify({ files: uploadedFiles });
      console.log(`Updated value for ${description}:`, value);
    } else {
      value = '';
    }
  }

  function makeAbsoluteUrl(url: string): string {
    return url?.startsWith('http') ? url : `https://${url}`;
  }

  function handleFileSelection(selectedFiles: FileList | null): void {
    if (!selectedFiles) return;
    
    const newFiles = Array.from(selectedFiles);
    pendingFiles = [...pendingFiles, ...newFiles];
    
    files = null;
  }

  function removePendingFile(index: number): void {
    pendingFiles = pendingFiles.filter((_, i) => i !== index);
  }

  function confirmRemoveUploadedFile(index: number): void {
    fileToDeleteIndex = index;
    showDeleteConfirm = true;
  }

  async function removeUploadedFile(): Promise<void> {
    if (isReadOnly || fileToDeleteIndex === null) return;

    const index = fileToDeleteIndex;
    const fileToRemove = uploadedFiles[index];
    
    try {
      // Optimistically remove from UI
      const newUploadedFiles = uploadedFiles.filter((_, i) => i !== index);
      uploadedFiles = newUploadedFiles;
      
      // Update value
      const newValue = newUploadedFiles.length > 0 
        ? JSON.stringify({ files: newUploadedFiles })
        : '';
      
      value = newValue;

      // Immediately submit to database
      const payload = {
        startupId: parseInt(startupId, 10),
        assessmentName,
        responses: [
          {
            assessmentId,
            answerValue: newValue
          }
        ]
      };

      console.log('=== REMOVING FILE - SUBMITTING TO DB ===');
      console.log('Payload:', JSON.stringify(payload, null, 2));

      await axiosInstance.post(
        '/assessments/submit',
        payload,
        {
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      console.log('File removed from database successfully');
      toast.success('File removed successfully');
      
      // Dispatch event to parent to trigger refetch
      dispatch('fileRemoved');
    } catch (error) {
      console.error('Failed to remove file from database:', error);
      // Rollback on error
      uploadedFiles = [
        ...uploadedFiles.slice(0, index), 
        fileToRemove, 
        ...uploadedFiles.slice(index)
      ];
      updateValue();
      toast.error('Failed to remove file');
    } finally {
      showDeleteConfirm = false;
      fileToDeleteIndex = null;
    }
  }

  function cancelRemove(): void {
    showDeleteConfirm = false;
    fileToDeleteIndex = null;
  }

  export async function uploadPendingFiles(): Promise<void> {
    if (pendingFiles.length === 0) {
      console.log(`No pending files to upload for field: ${description}`);
      return;
    }
    
    console.log(
      `Starting upload for field: ${description}, ${pendingFiles.length} file(s)`
    );
    processing = true;
    
    try {
      if (pendingFiles.length === 1) {
        const formData = new FormData();
        formData.append('file', pendingFiles[0]);
        
        const response = await axiosInstance.post(
          `/upload/single?folder=${UPLOAD_FOLDER}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        
        console.log(
          `Single file upload response for ${description}:`, 
          response.data
        );
        
        uploadedFiles = [
          ...uploadedFiles,
          { url: response.data.url, fileName: response.data.originalName }
        ];
      } else {
        const formData = new FormData();
        pendingFiles.forEach((file) => {
          formData.append('files', file);
        });
        
        const response = await axiosInstance.post(
          `/upload/multiple?folder=${UPLOAD_FOLDER}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        
        console.log(
          `Multiple file upload response for ${description}:`, 
          response.data
        );
        
        const newUploadedFiles = response.data.files.map((file: any) => ({
          url: file.url,
          fileName: file.originalName
        }));
        
        uploadedFiles = [...uploadedFiles, ...newUploadedFiles];
      }
      
      updateValue();
      pendingFiles = [];
      
      console.log(`Files uploaded successfully for ${description}:`, {
        uploadedFiles,
        totalFiles: uploadedFiles.length,
        jsonValue: value
      });
    } catch (error) {
      console.error(`File upload failed for ${description}:`, error);
      throw error;
    } finally {
      processing = false;
    }
  }

  $: if (files) {
    handleFileSelection(files);
  }

  function handleDrop(event: DragEvent): void {
    event.preventDefault();
    const droppedFiles = event.dataTransfer?.files || null;
    handleFileSelection(droppedFiles);
  }

  function handleDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  export { processing };
</script>

<div class="grid gap-2">
  <AssessmentLabel {description} />
  
  {#if uploadedFiles.length > 0}
    <div class="space-y-2">
      <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
        Uploaded Files ({uploadedFiles.length}):
      </div>
      {#each uploadedFiles as file, index}
        <div
          class="flex w-fit justify-between items-center bg-gray-50 dark:bg-gray-800 rounded p-1"
        >
          <a
            href={makeAbsoluteUrl(file.url)}
            download={file.fileName}
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline cursor-pointer flex-1 truncate"
          >
            {file.fileName}
          </a>
          {#if !isReadOnly}
            <button
              type="button"
              onclick={() => confirmRemoveUploadedFile(index)}
              class="ml-2 text-red-500 hover:text-red-700 p-1 flex-shrink-0"
            >
              <X size={16} />
            </button>
          {/if}
        </div>
      {/each}
    </div>
  {/if}

  {#if pendingFiles.length > 0 && !isReadOnly}
    <div class="space-y-2">
      <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
        Pending Upload ({pendingFiles.length}):
      </div>
      {#each pendingFiles as file, index}
        <div
          class="flex items-center justify-between bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded"
        >
          <span class="flex-1 text-gray-700 dark:text-gray-300 truncate">
            {file.name}
          </span>
          <button
            type="button"
            onclick={() => removePendingFile(index)}
            class="ml-2 text-red-500 hover:text-red-700 p-1 flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      {/each}
    </div>
  {/if}

  {#if !isReadOnly}
    <label
      for="fileUpload-{description}"
      class="flex h-32 cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-400 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
      ondrop={handleDrop}
      ondragover={handleDragOver}
    >
      {#if processing}
        <div class="flex flex-col items-center justify-center gap-3">
          <Spinner class="mr-2 h-6 w-6 animate-spin" />
          <span class="text-sm">Uploading files...</span>
        </div>
      {:else}
        <div class="text-center">
          <p>Drop multiple files here or click to upload</p>
          <p class="text-xs text-gray-500 mt-1">
            You can upload multiple files at once
          </p>
        </div>
      {/if}
    </label>
    <input
      id="fileUpload-{description}"
      type="file"
      class="hidden"
      multiple
      bind:files
    />
  {:else if uploadedFiles.length === 0 && !fileUrl}
    <div class="text-sm text-muted-foreground">No file uploaded</div>
  {/if}
</div>

<!-- Confirmation Dialog -->
<AlertDialog.Root open={showDeleteConfirm}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Remove File</AlertDialog.Title>
      <AlertDialog.Description>
        Are you sure you want to remove 
        <span class="font-semibold">
          {fileToDeleteIndex !== null ? uploadedFiles[fileToDeleteIndex]?.fileName : ''}
        </span>? 
        This action cannot be undone.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel onclick={cancelRemove}>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action
        onclick={removeUploadedFile}
        class="bg-red-600 hover:bg-red-700"
      >
        Remove
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>