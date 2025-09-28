<script lang="ts">
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Button } from '$lib/components/ui/button';
  import { Plus, Trash2 } from 'lucide-svelte';

  export let form: any;
  export let errors: any;

  function addObjective() {
    $form.objectives = [...($form.objectives ?? []), ''];
  }
  function removeObjective(index: number) {
    $form = {
      ...$form,
      objectives: ($form.objectives ?? []).filter((_, i) => i !== index)
    };
  }
</script>

<div class="space-y-6">
  <!-- Objectives -->
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <Label>Objectives</Label>
      <Button type="button" variant="outline" size="sm" onclick={addObjective}>
        <Plus class="mr-2 h-4 w-4" />
        Add Objective
      </Button>
    </div>
    {#each $form.objectives ?? [] as _, index}
      <div class="flex gap-4">
        <div class="flex-1 space-y-2">
          <Label for="objective-{index}">Objective {index + 1}</Label>
          <Input
            id="objective-{index}"
            name={`objectives[${index}]`}
            placeholder="Enter your objective..."
            bind:value={$form.objectives[index]}
          />
        </div>
        <div class="flex items-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onclick={() => removeObjective(index)}
            class="text-red-500 hover:text-red-700"
          >
            <Trash2 class="h-4 w-4" />
          </Button>
        </div>
      </div>
    {/each}
    {#if $errors.objectives}
      <p class="text-sm text-red-500">{$errors.objectives}</p>
    {/if}
  </div>

  <!-- Proposal Scope -->
  <div class="space-y-2">
    <Label for="proposalScope">Proposal Scope *</Label>
    <Textarea
      id="proposalScope"
      name="proposalScope"
      placeholder="Define the scope of your proposal..."
      required
      bind:value={$form.proposalScope}
      class={$errors.proposalScope ? 'border-red-500' : ''}
      rows={4}
    />
    {#if $errors.proposalScope}
      <p class="text-sm text-red-500">{$errors.proposalScope}</p>
    {/if}
  </div>

  <!-- Methodology -->
  <div class="space-y-2">
    <Label for="methodology">Methodology *</Label>
    <Textarea
      id="methodology"
      name="methodology"
      placeholder="Describe your methodology and approach..."
      required
      bind:value={$form.methodology}
      class={$errors.methodology ? 'border-red-500' : ''}
      rows={4}
    />
    {#if $errors.methodology}
      <p class="text-sm text-red-500">{$errors.methodology}</p>
    {/if}
  </div>
</div>
