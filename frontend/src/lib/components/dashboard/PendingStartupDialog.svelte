<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { X } from 'lucide-svelte';
  import WaitlistDialog from './pending/WaitlistDialog.svelte';
  import ApprovalDialog from './pending/ApprovalDialog.svelte';
  import * as Table from '$lib/components/ui/table/index.js';

  export let startup: any;
  export let isOpen: boolean = false;
  export let onClose: () => void;
  export let waitlistStartup: (startupId: number, data: { message: string }) => Promise<any>;
  export let mentors: any[] = [];
  export let approveStartup: (startupId: number, mentorId: any) => Promise<void>;

  let showWaitlistDialog = false;
  let showApprovalDialog = false;

  async function handleWaitlistSubmit(reason: string) {
    showWaitlistDialog = false;
    // Close the parent dialog after successful waitlisting
    onClose();
  }

  function getMemberCount(applicant: any) {
    // Use actual members array length if available, otherwise default to 1 (just the founder)
    if (applicant.members && Array.isArray(applicant.members)) {
      return applicant.members.length + 1; // +1 for the founder (user)
    }
    return 1; // Default to 1 (just the founder)
  }
</script>

{#if isOpen && startup}
  {@const startupData = startup}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-background rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Dialog Header -->
      <div class="flex justify-between items-center p-6 border-b">
        <h2 class="text-2xl font-bold text-foreground">
          {startup.capsuleProposal?.title || startup.name}
        </h2>
        <button 
          onclick={onClose}
          class="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- Dialog Content -->
      <div class="p-6">
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
          <div class="border-t pt-4 space-y-14">
            <!-- Row: Description and Target Market -->
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
            variant="outline"
            class="hover:bg-secondary/20"
            onclick={() => showWaitlistDialog = true}
          >
            Waitlist
          </Button>
          <Button 
            variant="default"
            onclick={() => showApprovalDialog = true}
          >
            Approve
          </Button>
        </div>
      </div>
    </div>
  </div>

  <WaitlistDialog
    isOpen={showWaitlistDialog}
    onClose={() => showWaitlistDialog = false}
    onSubmit={handleWaitlistSubmit}
    startupId={startup?.id}
    {waitlistStartup}
  />

  <ApprovalDialog
    {startup}
    isOpen={showApprovalDialog}
    onClose={() => showApprovalDialog = false}
    {mentors}
    onApprove={approveStartup}
  />
{/if}
