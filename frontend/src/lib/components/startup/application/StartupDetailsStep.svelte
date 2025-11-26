<script lang="ts">
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Button } from '$lib/components/ui/button';
  import { Plus, Trash2 } from 'lucide-svelte';
  import Application from '$lib/components/startup/Application.svelte';
  import type { SuperValidated } from 'sveltekit-superforms';
  import type { Writable } from 'svelte/store';

  export let form: any;
  export let errors: any;

  function removeTimelineItem(index: number) {
    $form = {
      ...$form,
      historicalTimeline: ($form.historicalTimeline ?? []).filter(
        (_: any, i: any) => i !== index
      )
    };
  }

  function addTimelineItem() {
    const newItem = { monthYear: '', description: '' };
    $form.historicalTimeline = [...($form.historicalTimeline ?? []), newItem];
  }

  function addCompetitor() {
    const newItem = { competitorName: '', offer: '', pricingStrategy: '' };
    $form.competitiveAdvantageAnalysis = [
      ...($form.competitiveAdvantageAnalysis ?? []),
      newItem
    ];
  }

  function removeCompetitor(index: number) {
    $form = {
      ...$form,
      competitiveAdvantageAnalysis: (
        $form.competitiveAdvantageAnalysis ?? []
      ).filter((_: any, i: any) => i !== index)
    };
  }
</script>

<div class="space-y-6">
  <!-- Title -->
  <div class="space-y-2">
    <Label for="title">Startup Title *</Label>
    <Input
      id="title"
      name="title"
      placeholder="Enter your startup title..."
      required
      bind:value={$form.title}
      class={$errors.title ? 'border-red-500' : ''}
    />
    {#if $errors.title}
      <p class="text-sm text-red-500">{$errors.title}</p>
    {/if}
  </div>

  <!-- Description -->
  <div class="space-y-2">
    <Label for="description">Startup Description *</Label>
    <Textarea
      id="description"
      name="description"
      placeholder="Provide a detailed description of your startup..."
      required
      bind:value={$form.description}
      class={$errors.description ? 'border-red-500' : ''}
      rows={4}
    />
    {#if $errors.description}
      <p class="text-sm text-red-500">{$errors.description}</p>
    {/if}
  </div>

  <!-- Problem Statement -->
  <div class="space-y-2">
    <Label for="problemStatement">Problem Statement *</Label>
    <Textarea
      id="problemStatement"
      name="problemStatement"
      placeholder="What problem does your startup solve?"
      required
      bind:value={$form.problemStatement}
      class={$errors.problemStatement ? 'border-red-500' : ''}
      rows={3}
    />
    {#if $errors.problemStatement}
      <p class="text-sm text-red-500">{$errors.problemStatement}</p>
    {/if}
  </div>

  <!-- Target Market -->
  <div class="space-y-2">
    <Label for="targetMarket">Target Market *</Label>
    <Textarea
      id="targetMarket"
      name="targetMarket"
      placeholder="Describe your target market and customer segments..."
      required
      bind:value={$form.targetMarket}
      class={$errors.targetMarket ? 'border-red-500' : ''}
      rows={3}
    />
    {#if $errors.targetMarket}
      <p class="text-sm text-red-500">{$errors.targetMarket}</p>
    {/if}
  </div>

  <!-- Solution Description -->
  <div class="space-y-2">
    <Label for="solutionDescription">Solution Description *</Label>
    <Textarea
      id="solutionDescription"
      name="solutionDescription"
      placeholder="Describe your solution and how it addresses the problem..."
      required
      bind:value={$form.solutionDescription}
      class={$errors.solutionDescription ? 'border-red-500' : ''}
      rows={4}
    />
    {#if $errors.solutionDescription}
      <p class="text-sm text-red-500">{$errors.solutionDescription}</p>
    {/if}
  </div>

  <!-- Historical Timeline -->
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <Label>Historical Timeline</Label>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onclick={addTimelineItem}
      >
        <Plus class="mr-2 h-4 w-4" />
        Add Timeline Item
      </Button>
    </div>
    {#if ($form.historicalTimeline ?? []).length === 0}
      <div
        class="rounded-lg border border-dashed p-8 text-center text-muted-foreground"
      >
        <p class="text-sm">
          No historical timeline items added yet. Click "Add Timeline Item" to
          get started.
        </p>
      </div>
    {:else}
      {#each $form.historicalTimeline ?? [] as _, index}
        <div
          class="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-3"
        >
          <div class="space-y-2">
            <Label for="monthYear-{index}">Month-Year *</Label>
            <Input
              id="monthYear-{index}"
              placeholder="e.g., Jan 2024"
              bind:value={$form.historicalTimeline[index].monthYear}
              class={$errors.historicalTimeline?.[index]?.monthYear
                ? 'border-red-500'
                : ''}
            />
            {#if $errors.historicalTimeline?.[index]?.monthYear}
              <p class="text-sm text-red-500">
                {$errors.historicalTimeline[index].monthYear}
              </p>
            {/if}
          </div>
          <div class="space-y-2">
            <Label for="timeline-description-{index}">Description *</Label>
            <Input
              id="timeline-description-{index}"
              placeholder="Milestone description"
              bind:value={$form.historicalTimeline[index].description}
              class={$errors.historicalTimeline?.[index]?.description
                ? 'border-red-500'
                : ''}
            />
            {#if $errors.historicalTimeline?.[index]?.description}
              <p class="text-sm text-red-500">
                {$errors.historicalTimeline[index].description}
              </p>
            {/if}
          </div>
          <div class="flex items-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onclick={() => removeTimelineItem(index)}
              class="text-red-500 hover:text-red-700"
            >
              <Trash2 class="h-4 w-4" />
            </Button>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Competitive Advantage Analysis -->
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <Label>Competitive Advantage Analysis</Label>
      <Button type="button" variant="outline" size="sm" onclick={addCompetitor}>
        <Plus class="mr-2 h-4 w-4" />
        Add Competitor
      </Button>
    </div>

    {#if ($form.competitiveAdvantageAnalysis ?? []).length === 0}
      <div
        class="rounded-lg border border-dashed p-8 text-center text-muted-foreground"
      >
        <p class="text-sm">
          No competitors added yet. Click "Add Competitor" to get started.
        </p>
      </div>
    {:else}
      {#each $form.competitiveAdvantageAnalysis ?? [] as _, index}
        <div
          class="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-4"
        >
          <div class="space-y-2">
            <Label for="competitorName-{index}">Competitor Name *</Label>
            <Input
              id="competitorName-{index}"
              placeholder="Competitor name"
              bind:value={
                $form.competitiveAdvantageAnalysis[index].competitorName
              }
              class={$errors.competitiveAdvantageAnalysis?.[index]
                ?.competitorName
                ? 'border-red-500'
                : ''}
            />
            {#if $errors.competitiveAdvantageAnalysis?.[index]?.competitorName}
              <p class="text-sm text-red-500">
                {$errors.competitiveAdvantageAnalysis[index].competitorName}
              </p>
            {/if}
          </div>
          <div class="space-y-2">
            <Label for="offer-{index}">Product/Service Offer *</Label>
            <Input
              id="offer-{index}"
              placeholder="What they offer"
              bind:value={$form.competitiveAdvantageAnalysis[index].offer}
              class={$errors.competitiveAdvantageAnalysis?.[index]?.offer
                ? 'border-red-500'
                : ''}
            />
            {#if $errors.competitiveAdvantageAnalysis?.[index]?.offer}
              <p class="text-sm text-red-500">
                {$errors.competitiveAdvantageAnalysis[index].offer}
              </p>
            {/if}
          </div>
          <div class="space-y-2">
            <Label for="pricingStrategy-{index}">Pricing Strategy *</Label>
            <Input
              id="pricingStrategy-{index}"
              placeholder="Their pricing model"
              bind:value={
                $form.competitiveAdvantageAnalysis[index].pricingStrategy
              }
              class={$errors.competitiveAdvantageAnalysis?.[index]
                ?.pricingStrategy
                ? 'border-red-500'
                : ''}
            />
            {#if $errors.competitiveAdvantageAnalysis?.[index]?.pricingStrategy}
              <p class="text-sm text-red-500">
                {$errors.competitiveAdvantageAnalysis[index].pricingStrategy}
              </p>
            {/if}
          </div>
          <div class="flex items-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onclick={() => removeCompetitor(index)}
              class="text-red-500 hover:text-red-700"
            >
              <Trash2 class="h-4 w-4" />
            </Button>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Intellectual Property Status -->
  <div class="space-y-2">
    <Label for="intellectualPropertyStatus"
      >Intellectual Property Status *</Label
    >
    <Textarea
      id="intellectualPropertyStatus"
      name="intellectualPropertyStatus"
      placeholder="Describe your intellectual property status, patents, trademarks, etc."
      required
      bind:value={$form.intellectualPropertyStatus}
      class={$errors.intellectualPropertyStatus ? 'border-red-500' : ''}
      rows={3}
    />
    {#if $errors.intellectualPropertyStatus}
      <p class="text-sm text-red-500">{$errors.intellectualPropertyStatus}</p>
    {/if}
  </div>
</div>
