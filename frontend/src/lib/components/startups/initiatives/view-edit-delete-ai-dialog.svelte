<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Textarea } from '$lib/components/ui/textareav2';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import { Card } from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { Check, Trash } from 'lucide-svelte';
  import { TextEditor } from '$lib/components/shared';

  type ChatMessage = {
    id?: number;
    role: 'User' | 'Ai';
    content: string;
    createdAt?: Date;
    refinedDescription?: string;
    refinedMeasures?: string;
    refinedTargets?: string;
    refinedRemarks?: string;
  };

  let {
    open,
    onOpenChange,
    initiative,
    deleteInitiative,
    members,
    closeDialog,
    addToInitiative,
    index,
    tasks
  } = $props();

  let initiativeCopy = $state({ ...initiative });
  let isLoadingHistory = $state(false);

  async function loadChatHistory() {
    isLoadingHistory = true;
    try {
      const response = await fetch(`http://localhost:3000/chat-history/initiatives/${initiative.id}`);
      if (!response.ok) throw new Error('Failed to load chat history');
      const history = await response.json();
      chatHistory = history;
    } catch (error) {
      console.error('Error loading chat history:', error);
      chatHistory = [
        {
          role: 'Ai',
          content: 'Failed to load previous chat history. But we can continue our conversation.'
        }
      ];
    } finally {
      isLoadingHistory = false;
    }
  }

  $effect(() => {
    if (open) {
      loadChatHistory();
    } else {
      initiativeCopy = { ...initiative };
      userInput = '';
    }
  });

  let deleteDialogOpen = $state(false);

  const deleteDialogOnOpenChange = () => {
    deleteDialogOpen = !deleteDialogOpen;
  };

  let chatHistory = $state<ChatMessage[]>([]);
  let userInput = $state('');
  let isLoading = $state(false);

  async function handleSendMessage() {
    if (!userInput.trim()) return;

    const currentInput = userInput;
    chatHistory = [...chatHistory, { role: 'User', content: currentInput }];
    userInput = '';
    isLoading = true;

    try {
      const response = await fetch(`http://localhost:3000/initiatives/${initiative.id}/refine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          chatHistory,
          latestPrompt: currentInput
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      await loadChatHistory();

    } catch (error) {
      console.error('Error details:', error);
      const errorMessage: ChatMessage = { 
        role: 'Ai', 
        content: `Sorry, I encountered an error while processing your request: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
      chatHistory = [...chatHistory, errorMessage];
    } finally {
      isLoading = false;
    }
  }
</script>

<Dialog.Root bind:open={open} {onOpenChange}>
  <Dialog.Content class="h-[90vh] max-w-[1200px] overflow-scroll">
    <div class="flex gap-0 h-[80vh]">
      <!-- AI Chat Section (left) -->
      <div class="flex flex-col w-1/2 border-r border-border p-6">
        <h1 class="text-2xl font-semibold mb-4">Refine Initiative</h1>
        <div class="flex-1 overflow-y-auto space-y-4 py-4">
          {#if isLoadingHistory}
            <div class="flex justify-center items-center h-full">
              <div class="text-gray-400">Loading chat history...</div>
            </div>
          {:else}
            <div class="flex justify-start">
                <div class="bg-[#1e293b] text-white p-4 rounded-lg">
                I can help you refine this Initiative. How would you like to modify the description or other fields?
                </div>
            </div>
            {#each chatHistory as message}
              <div class="flex {message.role === 'User' ? 'justify-end' : 'justify-start'}">
                <div class="flex flex-col {message.role === 'User' ? 'items-end' : 'items-start'} max-w-[80%]">
                  {#if message.role === 'User'}
                    <div class="bg-primary text-white p-4 rounded-lg">
                      {message.content}
                    </div>
                  {:else}
                    <div class="bg-[#1e293b] text-white p-4 rounded-lg">
                      Here's my suggestion for improving your Initiative:
                      {#if message.refinedDescription}
                        <div class="bg-[#0a1729] my-2 p-4 pb-8 rounded-lg relative group">
                          <strong>Description:</strong>
                          <div>{message.refinedDescription}</div>
                          <button 
                            class="absolute bottom-2 right-2 flex items-center gap-1 text-sm text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" 
                            onclick={(e) => {
                              const button = e.currentTarget as HTMLButtonElement;
                              const text = message.refinedDescription ?? '';
                              navigator.clipboard.writeText(text);
                            }}
                          >
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copy
                          </button>
                        </div>
                      {/if}
                      {#if message.refinedMeasures}
                        <div class="bg-[#0a1729] my-2 p-4 pb-8 rounded-lg relative group">
                          <strong>Measures:</strong>
                          <div>{message.refinedMeasures}</div>
                          <button 
                            class="absolute bottom-2 right-2 flex items-center gap-1 text-sm text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" 
                            onclick={(e) => {
                              const button = e.currentTarget as HTMLButtonElement;
                              const text = message.refinedMeasures ?? '';
                              navigator.clipboard.writeText(text);
                            }}
                          >
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copy
                          </button>
                        </div>
                      {/if}
                      {#if message.refinedTargets}
                        <div class="bg-[#0a1729] my-2 p-4 pb-8 rounded-lg relative group">
                          <strong>Targets:</strong>
                          <div>{message.refinedTargets}</div>
                          <button 
                            class="absolute bottom-2 right-2 flex items-center gap-1 text-sm text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" 
                            onclick={(e) => {
                              const button = e.currentTarget as HTMLButtonElement;
                              const text = message.refinedTargets ?? '';
                              navigator.clipboard.writeText(text);
                            }}
                          >
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copy
                          </button>
                        </div>
                      {/if}
                      {#if message.refinedRemarks}
                        <div class="bg-[#0a1729] my-2 p-4 pb-8 rounded-lg relative group">
                          <strong>Remarks:</strong>
                          <div>{message.refinedRemarks}</div>
                          <button 
                            class="absolute bottom-2 right-2 flex items-center gap-1 text-sm text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" 
                            onclick={(e) => {
                              const button = e.currentTarget as HTMLButtonElement;
                              const text = message.refinedRemarks ?? '';
                              navigator.clipboard.writeText(text);
                            }}
                          >
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copy
                          </button>
                        </div>
                      {/if}
                      {message.content}
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          {/if}
        </div>
        <div class="mt-auto flex gap-2">
          <input
            class="flex-1 rounded bg-background border border-border px-3 py-2 text-white"
            placeholder="Ask how you would like to refine the initiative..."
            bind:value={userInput}
            onkeydown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            disabled={isLoadingHistory}
          />
          <Button 
            disabled={isLoading || !userInput.trim() || isLoadingHistory} 
            onclick={handleSendMessage}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </div>

      <!-- Initiative Details -->
      <div class="flex flex-col w-1/2 p-6">
        <h2 class="text-2xl font-semibold mb-4">Initiative Details</h2>
        <div class="flex flex-col gap-4 overflow-y-auto">
          <div class="mb-4">
            <Label>Description</Label>
            <!-- <Textarea
              rows={4}
              class="w-full rounded bg-background border border-border text-white p-3"
              bind:value={initiativeCopy.description}
            /> -->
            <TextEditor
              bind:value={initiativeCopy.description}
              rows={4}
              placeholder="Enter initiative description..."
              classNames="w-full rounded bg-background border border-border text-white p-3"
            />
          </div>

          <div class="mb-4">
            <Label>Measures</Label>
            <!-- <Textarea
              rows={4}
              class="w-full rounded bg-background border border-border text-white p-3"
              bind:value={initiativeCopy.measures}
            /> -->
            <TextEditor
              bind:value={initiativeCopy.measures}
              rows={4}
              placeholder="Enter measures..."
              classNames="w-full rounded bg-background border border-border text-white p-3"
            />
          </div>

          <div class="mb-4">
            <Label>Targets</Label>
            <!-- <Textarea
              rows={4}
              class="w-full rounded bg-background border border-border text-white p-3"
              bind:value={initiativeCopy.targets}
            /> -->
            <TextEditor
              bind:value={initiativeCopy.targets}
              rows={4}
              placeholder="Enter targets..."
              classNames="w-full rounded bg-background border border-border text-white p-3"
            />
          </div>

          <div class="mb-4">
            <Label>Remarks</Label>
            <!-- <Textarea
              rows={4}
              class="w-full rounded bg-background border border-border text-white p-3"
              bind:value={initiativeCopy.remarks}
            /> -->
            <TextEditor
              bind:value={initiativeCopy.remarks}
              rows={4}
              placeholder="Enter remarks..."
              classNames="w-full rounded bg-background border border-border text-white p-3"
            />
          </div>

          <Card class="mb-4">
            <div class="p-4">
              <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between">
                  <Label>Assignee</Label>
                  <Select.Root
                    type="single"
                    bind:value={initiativeCopy.assignee}
                  >
                    <Select.Trigger class="w-[180px]">
                      {initiativeCopy.assignee
                        ? `${members.filter((member: any) => member.userId === initiativeCopy.assignee)[0]?.firstName || ''} ${members.filter((member: any) => member.userId === initiativeCopy.assignee)[0]?.lastName || ''}`
                        : 'Select Assignee'}
                    </Select.Trigger>
                    <Select.Content>
                      {#each members as member}
                        <Select.Item value={member.userId}>
                          {member.firstName} {member.lastName}
                        </Select.Item>
                      {/each}
                    </Select.Content>
                  </Select.Root>
                </div>

                <div class="flex items-center justify-between">
                  <Label>Related RNS</Label>
                  <div class="w-[180px] px-3 py-2 text-sm">
                    {#if tasks.filter((task: any) => task.id === initiativeCopy.rns)[0]}
                      #{tasks.filter((task: any) => task.id === initiativeCopy.rns)[0].priorityNumber}
                    {:else}
                      None
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div class="flex justify-end gap-2 mt-auto">
            <Button variant="outline" onclick={() => closeDialog()}>Cancel</Button>
            <Button onclick={() => {
              addToInitiative(initiativeCopy.id, {
                description: initiativeCopy.description,
                measures: initiativeCopy.measures,
                targets: initiativeCopy.targets,
                remarks: initiativeCopy.remarks,
                assignee: initiativeCopy.assignee,
              });
              open = false;
            }}>Add to Initiatives</Button>
          </div>
        </div>
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>

<AlertDialog.Root
  bind:open={deleteDialogOpen}
  onOpenChange={deleteDialogOnOpenChange}
>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete this Initiative.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action
        class="bg-red-500 hover:bg-red-600"
        onclick={async () => {
          await deleteInitiative(initiative.id, index);
          deleteDialogOpen = false;
          closeDialog();
        }}>Continue</AlertDialog.Action
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root> 