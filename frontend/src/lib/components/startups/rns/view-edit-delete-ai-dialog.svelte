<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Textarea } from '$lib/components/ui/textareav2';
  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { getReadinessLevels, getReadinessTypes } from '$lib/utils';
  import * as Select from '$lib/components/ui/select/index.js';
  import { Card } from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { Check, Trash, Copy } from 'lucide-svelte';
  import type { ReadinessType } from '$lib/utils';
  import { TextEditor } from '$lib/components/shared';
  import { tick } from 'svelte';
  import { Input } from '$lib/components/ui/input';

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
    rns,
    deleteRns,
    members,
    closeDialog,
    addToRns,
    index,
    isEdit = false
  } = $props();

  let rnsCopy = $state({ ...rns });
  const levels = $derived(getReadinessLevels(rnsCopy.readinessType));
  let isLoadingHistory = $state(false);

  function handleDialogStateChange(newOpen: boolean) {
    onOpenChange(newOpen);
    if (!newOpen) {
      closeDialog();
    }
  }

  async function loadChatHistory() {
    isLoadingHistory = true;
    try {
      const response = await fetch(
        `http://localhost:3000/chat-history/rns/${rns.id}`
      );
      if (!response.ok) throw new Error('Failed to load chat history');
      const history = await response.json();
      chatHistory = history;
      tick().then(() => {
        if (chatHistoryContainer) {
          chatHistoryContainer.scrollTop = chatHistoryContainer.scrollHeight;
        }
      });
    } catch (error) {
      console.error('Error loading chat history:', error);
      chatHistory = [
        {
          role: 'Ai',
          content:
            'Failed to load previous chat history. But we can continue our conversation.'
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
      rnsCopy = { ...rns };
      userInput = '';
    }
  });

  let editDescription = $state(false);
  let deleteDialogOpen = $state(false);

  const deleteDialogOnOpenChange = () => {
    deleteDialogOpen = !deleteDialogOpen;
  };

  const getLevel = (id: any) => {
    if (!id || id === 0 || !levels || levels.length === 0) return '';
    const matchingLevels = levels.filter(
      (level: any) => Number(level.id) === Number(id)
    );
    return matchingLevels.length > 0 ? matchingLevels[0].level : '';
  };

  const getLevelId = (targetLevel: any, levels: any) => {
    if (targetLevel === 0) return '';
    const matchingLevels = levels.filter(
      (level: any) => Number(level.level) === Number(targetLevel)
    );
    return matchingLevels.length > 0 ? matchingLevels[0].id : '';
  };

  let chatHistory = $state<ChatMessage[]>([]);
  let userInput = $state('');
  let isLoading = $state(false);
  let chatHistoryContainer: HTMLDivElement;

  async function handleSendMessage() {
    if (!userInput.trim()) return;

    const currentInput = userInput;
    chatHistory = [...chatHistory, { role: 'User', content: currentInput }];
    userInput = '';
    isLoading = true;

    try {
      const response = await fetch(
        `http://localhost:3000/rns/${rns.id}/refine`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            chatHistory,
            latestPrompt: currentInput
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      // Reload chat history after successful message
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

<Dialog.Root bind:open onOpenChange={handleDialogStateChange}>
  <Dialog.Content class="h-[90vh] max-w-[1200px]">
    <div class="flex h-[80vh] gap-0">
      <!-- AI Chat Section (left) -->
      <div class="flex w-1/2 flex-col border-r border-border p-6">
        <h1 class="mb-4 text-2xl font-semibold">Suggested RNS</h1>
        <div
          bind:this={chatHistoryContainer}
          class="flex-1 space-y-4 overflow-y-auto py-4"
        >
          {#if isLoadingHistory}
            <div class="flex h-full items-center justify-center">
              <div class="text-gray-400">Loading chat history...</div>
            </div>
          {:else}
            <div class="flex justify-start">
              <div class="rounded-lg bg-[#1e293b] p-4 text-white">
                I can help you refine this {rns.readinessType} Recommended Next Step.
                How would you like to modify the description or other fields?
              </div>
            </div>
            {#each chatHistory as message}
              <div
                class="flex {message.role === 'User'
                  ? 'justify-end'
                  : 'justify-start'}"
              >
                <div
                  class="flex flex-col {message.role === 'User'
                    ? 'items-end'
                    : 'items-start'} max-w-[80%]"
                >
                  {#if message.role === 'User'}
                    <div class="rounded-lg bg-primary p-4 text-white">
                      {message.content}
                    </div>
                  {:else}
                    <div class="rounded-lg bg-[#1e293b] p-4 text-white">
                      <!-- {@html message.content} -->
                      Here's my suggestion for improving your {rns.readinessType}
                      RNS description:
                      {#if message.refinedDescription}
                        <div
                          class="group relative my-2 rounded-lg bg-[#0a1729] p-4 pb-8"
                        >
                          {@html message.refinedDescription}
                          <button
                            class="absolute bottom-2 right-2 flex items-center gap-1 text-sm text-gray-400 opacity-50 transition-opacity hover:text-white hover:opacity-100"
                            onclick={(e) => {
                              const button =
                                e.currentTarget as HTMLButtonElement;
                              const text =
                                button.parentElement?.textContent
                                  ?.replace('Copy', '')
                                  .trim() || '';
                              navigator.clipboard.writeText(text);
                            }}
                          >
                            <svg
                              class="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                              />
                            </svg>
                            Copy
                          </button>
                        </div>
                        {@html message.content}
                      {:else}
                        {@html message.content}
                      {/if}
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          {/if}
        </div>
        <div class="mt-auto flex gap-2">
          <Input
            type="text"
            placeholder="Ask how you would like to refine the description..."
            required
            bind:value={userInput}
            onkeydown={(e) =>
              e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
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

      <!-- RNS Details -->
      <div class="flex w-1/2 flex-col p-6">
        <div class="flex justify-between">
          <h2 class="mb-4 text-2xl font-semibold">RNS Details</h2>
            <Button size="sm" variant="destructive" onclick={() => (deleteDialogOpen = true)}
              ><Trash class="h-4 w-4" /> Delete</Button
            >
        </div>
        <div class="mb-4">
          <Label>Readiness Type</Label>
          <Select.Root
            type="single"
            bind:value={rnsCopy.readinessType}
            onValueChange={(newType) => {
              if (!newType) {
                newType = 'Technology';
              }
              const newLevels = getReadinessLevels(newType as ReadinessType);
              const newTargetLevel = getLevelId(
                rnsCopy.targetLevelScore,
                newLevels
              );
              rnsCopy.readinessType = newType;
              rnsCopy.targetLevelId = newTargetLevel;
            }}
          >
            <Select.Trigger class="w-[180px]">
              {rnsCopy.readinessType}
            </Select.Trigger>
            <Select.Content>
              {#each getReadinessTypes() as type}
                <Select.Item value={`${type.name}`}>
                  {type.name}
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>

        <div class="mb-4">
          <Label>Description</Label>
          <!-- <Textarea
            rows={8}
            class="w-full rounded bg-background border border-border text-white p-3"
            bind:value={rnsCopy.description}
          /> -->
          <TextEditor
            bind:value={rnsCopy.description}
            placeholder="Enter RNS description"
            classNames="w-full rounded bg-background border border-border text-white p-3"
          />
        </div>

        <Card class="mb-4">
          <div class="p-4">
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <Label>Target Level</Label>
                <Select.Root type="single" bind:value={rnsCopy.targetLevelId}>
                  <Select.Trigger class="w-[180px]">
                    {getLevel(rnsCopy.targetLevelId)}
                  </Select.Trigger>
                  <Select.Content>
                    {#each levels as item}
                      <Select.Item value={`${item.id}`}>
                        {item.level}
                      </Select.Item>
                    {/each}
                  </Select.Content>
                </Select.Root>
              </div>

              <div class="flex items-center justify-between">
                <Label>Assignee</Label>
                <Select.Root type="single" bind:value={rnsCopy.assignee.id}>
                  <Select.Trigger class="w-[180px]">
                    {rnsCopy.assignee.id
                      ? `${members.filter((member: any) => member.userId === rnsCopy.assignee.id)[0]?.firstName || ''} ${members.filter((member: any) => member.userId === rnsCopy.assignee.id)[0]?.lastName || ''}`
                      : 'Select Type'}
                  </Select.Trigger>
                  <Select.Content>
                    {#each members as member}
                      <Select.Item value={member.userId}>
                        {member.firstName}
                        {member.lastName}
                      </Select.Item>
                    {/each}
                  </Select.Content>
                </Select.Root>
              </div>

              <div class="flex items-center justify-between">
                <Label>Term</Label>
                <Select.Root type="single" value="short">
                  <Select.Trigger class="w-[180px]">Short Term</Select.Trigger>
                  <Select.Content>
                    <Select.Item value="short">Short Term</Select.Item>
                    <Select.Item value="long">Long Term</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
          </div>
        </Card>

        <div class="mt-auto flex justify-end gap-2">
          <Button variant="outline" onclick={() => closeDialog()}>Cancel</Button
          >
          <Button
            onclick={() => {
              addToRns(rnsCopy.id, {
                description: rnsCopy.description,
                readinessType: rnsCopy.readinessType,
                targetLevelId: rnsCopy.targetLevelId,
                assigneeId: rnsCopy.assignee.id,
                isAiGenerated: false
              });
              closeDialog();
            }}>{isEdit ? 'Update' : 'Add to RNS'}</Button
          >
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
        This action cannot be undone. This will permanently delete this RNS.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action
        class="bg-red-500 hover:bg-red-600"
        onclick={async () => {
          await deleteRns(rns.id, index);
          deleteDialogOpen = false;
          closeDialog();
        }}>Continue</AlertDialog.Action
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
