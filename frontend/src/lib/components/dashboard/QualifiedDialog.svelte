<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Select from '$lib/components/ui/select';
  import ConfirmCompleteDialog from './sub/ConfirmCompleteDialog.svelte';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { X } from 'lucide-svelte';
  import * as Table from '$lib/components/ui/table/index.js';
  import { getBadgeColorObject } from '$lib/utils';

  export let startup: any;
  export let showDialog: boolean = false;
  export let toggleDialog: () => void;
  export let mentors: any[] = [];
  export let onMarkComplete: (startupId: number) => Promise<void>;
  export let onChangeMentor: (startupId: number, mentorId: number) => Promise<void>;
  export let startupAssessments: Array<{ name: string; assessmentStatus: string; assessmentFields?: any[] }> = [];

  let showConfirmCompleteModal = false;
  let selectedMentorId: string;

  $: statusColors = getBadgeColorObject('Qualified');
  
  // Update selectedMentorId whenever startup changes
  $: {
    if (startup?.mentors?.[0]?.id) {
      selectedMentorId = String(startup.mentors[0].id);
    }
  }
  
  $: showSaveMentorButton = selectedMentorId && selectedMentorId !== String(startup?.mentors?.[0]?.id);

  async function handleMarkAsComplete() { 
    try {
      await onMarkComplete(startup.id);
      toggleDialog();
    } catch (error) {
      console.error('Error marking startup as complete:', error);
    }
  }

  async function handleChangeMentor() {
    if (selectedMentorId) {
      try {
        await onChangeMentor(startup.id, Number(selectedMentorId));
      } catch (error) {
        console.error('Error changing mentor:', error);
      }
    }
  }

  function getMemberCount(applicant: any) {
    if (applicant.members && Array.isArray(applicant.members)) {
      return applicant.members.length + 1;
    }
    return 1;
  }

  console.log("Startup data in QualifiedDialog:", startup);
</script>

{#if startup}
  <Dialog.Root open={showDialog} onOpenChange={toggleDialog}>
    <Dialog.Content class="max-w-4xl max-h-[90vh] overflow-y-auto">
      <!-- Dialog Header -->
      <Dialog.Header class="p-6 border-b">
        <Dialog.Title class="text-2xl font-bold text-foreground">
          {startup.capsuleProposal?.title || startup.name}
        </Dialog.Title>
      </Dialog.Header>

      <!-- Dialog Content -->
      <div class="p-6 pt-2 overflow-y-auto">
        <!-- Status Message -->
        <div class="mb-6 p-4 rounded-lg border {statusColors.bg} {statusColors.border}">
          <h3 class="font-bold mb-1 {statusColors.text}">Status: Qualified</h3>
          <p class="text-sm {statusColors.text}">This startup has been approved and assigned readiness level assessments.</p>
        </div>

        <!-- Assessments and Mentor Section -->
        <div class="mb-8">
          <!-- Assigned Assessments -->
          <div class="mb-6">
            <h3 class="text-lg font-medium mb-2">Assigned Assessments</h3>
            {#if startupAssessments.length === 0}
              <p class="text-sm text-muted-foreground">No assessments assigned.</p>
            {:else}
              <div class="flex flex-wrap gap-2">
                {#each startupAssessments as a}
                  <span class="px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 border border-border text-foreground">
                    {a.name}
                  </span>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Assigned Mentor Section -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Assigned Mentor</h3>
            <div class="flex flex-col gap-3">
              <div class="flex-1">
                <Select.Root type="single" bind:value={selectedMentorId}>
                  <Select.Trigger class="w-full">
                    {#if startup?.mentors?.[0]}
                      <div class="flex flex-wrap items-center gap-2 w-full">
                        <span>
                          {mentors.find(m => String(m.id) === (selectedMentorId ?? String(startup.mentors[0].id)))?.firstName}
                          {" "}
                          {mentors.find(m => String(m.id) === (selectedMentorId ?? String(startup.mentors[0].id)))?.lastName}
                        </span>
                        {#if mentors.find(m => String(m.id) === (selectedMentorId ?? String(startup.mentors[0].id)))?.email}
                          <span class="mr-2 ml-auto text-sm text-muted-foreground whitespace-nowrap">
                            {mentors.find(m => String(m.id) === (selectedMentorId ?? String(startup.mentors[0].id)))?.email}
                          </span>
                        {/if}
                      </div>
                    {:else}
                      Select Mentor
                    {/if}
                  </Select.Trigger>
                  <Select.Content>
                    {#each mentors as mentor}
                      <Select.Item value={String(mentor.id)}>
                        <div class="flex items-center gap-2 w-full">
                          <span>{mentor.firstName} {mentor.lastName}</span>
                          {#if mentor.email}
                            <span class="ml-auto text-sm text-muted-foreground whitespace-nowrap">{mentor.email}</span>
                          {/if}
                        </div>
                      </Select.Item>
                    {/each}
                  </Select.Content>
                </Select.Root>
              </div>
              {#if showSaveMentorButton}
                <Button 
                  onclick={handleChangeMentor}
                  class="transition-transform hover:scale-105 duration-200 self-end"
                >
                  Save Mentor
                </Button>
              {/if}
            </div>
          </div>
        </div>

        <!-- AI Analysis Summary Section -->
        {#if startup.capsuleProposal?.aiAnalysisSummary}
          <div class="border border-border bg-primary/10 rounded-lg p-4 mb-6">
            <h3 class="text-lg font-semibold text-foreground mb-3">AI Analysis Summary</h3>
            <p class="text-foreground leading-relaxed">
              {startup.capsuleProposal.aiAnalysisSummary}
            </p>
          </div>
        {/if}

        <!-- Detailed Application Information -->
        <div>
          <h3 class="text-xl font-bold text-foreground mb-4">Detailed Application Information</h3>
          <div class="border-t pt-4 space-y-6">
            <!-- Standard information sections -->
            <div class="flex flex-col gap-6">
              <div>
                <h4 class="font-semibold text-foreground mb-2">Startup Description</h4>
                <div class="border border-foreground/50 bg-secondary/10 rounded-lg p-3 h-full">
                  <p class="text-muted-foreground text-sm">
                    {startup.capsuleProposal?.description || 'No description available'}
                  </p>
                </div>
              </div>
              
              {#if startup.capsuleProposal?.targetMarket}
                <div>
                  <h4 class="font-semibold text-foreground mb-2">Target Market</h4>
                  <div class="border border-foreground/50 bg-secondary/10 rounded-lg p-3 h-full">
                    <p class="text-muted-foreground text-sm">
                      {startup.capsuleProposal.targetMarket}
                    </p>
                  </div>
                </div>
              {/if}

              {#if startup.capsuleProposal?.problemStatement}
                <div>
                  <h4 class="font-semibold text-foreground mb-2">Problem Statement</h4>
                  <div class="border border-foreground/50 bg-secondary/10 rounded-lg p-3 h-full">
                    <p class="text-muted-foreground text-sm">
                      {startup.capsuleProposal.problemStatement}
                    </p>
                  </div>
                </div>
              {/if}

              {#if startup.capsuleProposal?.solutionDescription}
                <div>
                  <h4 class="font-semibold text-foreground mb-2">Solution Description</h4>
                  <div class="border border-foreground/50 bg-secondary/10 rounded-lg p-3 h-full">
                    <p class="text-muted-foreground text-sm">
                      {startup.capsuleProposal.solutionDescription}
                    </p>
                  </div>
                </div>
              {/if}

              <div>
                <h4 class="font-semibold text-foreground mb-2">Team Size</h4>
                <div class="border border-foreground/50 bg-secondary/10 rounded-lg p-3 h-full">
                  <p class="text-muted-foreground text-sm">
                    {getMemberCount(startup)} members
                  </p>
                </div>
              </div>

              {#if startup.capsuleProposal?.intellectualPropertyStatus}
                <div>
                  <h4 class="font-semibold text-foreground mb-2">Intellectual Property</h4>
                  <div class="border border-foreground/50 bg-secondary/10 rounded-lg p-3 h-full">
                    <p class="text-muted-foreground text-sm">
                      {startup.capsuleProposal.intellectualPropertyStatus}
                    </p>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Historical Timeline -->
            {#if startup.capsuleProposal?.historicalTimeline && startup.capsuleProposal.historicalTimeline.length > 0}
              <div class="mt-6">
                <h4 class="font-semibold text-foreground mb-3">Historical Timeline</h4>
                <div class="border border-border bg-secondary/10 rounded-lg p-2">
                  <Table.Root>
                    <Table.Header>
                      <Table.Row>
                        <Table.Head class="font-bold text-foreground">Date</Table.Head>
                        <Table.Head class="font-bold text-foreground">Description</Table.Head>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {#each startup.capsuleProposal.historicalTimeline as timeline}
                        <Table.Row>
                          <Table.Cell class="text-muted-foreground">{timeline.monthYear}</Table.Cell>
                          <Table.Cell class="text-muted-foreground">{timeline.description}</Table.Cell>
                        </Table.Row>
                      {/each}
                    </Table.Body>
                  </Table.Root>
                </div>
              </div>
            {/if}

            <!-- Competitive Analysis -->
            {#if startup.capsuleProposal?.competitiveAdvantageAnalysis && startup.capsuleProposal.competitiveAdvantageAnalysis.length > 0}
              <div class="mt-6">
                <h4 class="font-semibold text-foreground mb-3">Competitive Analysis</h4>
                <div class="border border-border bg-secondary/10 rounded-lg p-2">
                  <Table.Root>
                    <Table.Header>
                      <Table.Row>
                        <Table.Head class="font-bold text-foreground">Competitor</Table.Head>
                        <Table.Head class="font-bold text-foreground">Offering</Table.Head>
                        <Table.Head class="font-bold text-foreground">Pricing Strategy</Table.Head>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {#each startup.capsuleProposal.competitiveAdvantageAnalysis as competitor}
                        <Table.Row>
                          <Table.Cell class="text-muted-foreground">{competitor.competitorName}</Table.Cell>
                          <Table.Cell class="text-muted-foreground">{competitor.offer}</Table.Cell>
                          <Table.Cell class="text-muted-foreground">{competitor.pricingStrategy}</Table.Cell>
                        </Table.Row>
                      {/each}
                    </Table.Body>
                  </Table.Root>
                </div>
              </div>
            {/if}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-3 mt-8">
          <Button
            onclick={() => showConfirmCompleteModal = true}
            class="transition-transform hover:scale-105 duration-200"
          >
            Mark as Complete
          </Button>
        </div>

        <ConfirmCompleteDialog
          showDialog={showConfirmCompleteModal}
          toggleDialog={() => showConfirmCompleteModal = !showConfirmCompleteModal}
          onConfirm={handleMarkAsComplete}
        />
      </div>
    </Dialog.Content>
  </Dialog.Root>
{/if}
