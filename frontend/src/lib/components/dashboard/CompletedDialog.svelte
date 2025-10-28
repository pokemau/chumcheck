<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import * as Table from '$lib/components/ui/table/index.js';
  import { getBadgeColorObject, getStartupMemberCount } from '$lib/utils';

  export let startup: any;
  export let showDialog: boolean = false;
  export let toggleDialog: () => void;
  export let startupAssessments: Array<{
    name: string;
    assessmentStatus: string;
    assessmentFields?: any[];
  }> = [];

  const memberCount = getStartupMemberCount(startup);

  $: statusColors = getBadgeColorObject('Completed');
</script>

{#if startup}
  <Dialog.Root open={showDialog} onOpenChange={toggleDialog}>
    <Dialog.Content class="max-h-[90vh] max-w-4xl overflow-y-auto">
      <!-- Dialog Header -->
      <Dialog.Header class="border-b p-6">
        <Dialog.Title class="text-2xl font-bold text-foreground">
          {startup.capsuleProposal?.title || startup.name}
        </Dialog.Title>
      </Dialog.Header>

      <!-- Dialog Content -->
      <div class="overflow-y-auto p-6 pt-2">
        <!-- Status Message -->
        <div
          class="mb-6 rounded-lg p-4 {statusColors.bg} border {statusColors.border}"
        >
          <h3 class="mb-1 font-bold {statusColors.text}">Status: Completed</h3>
          <p class="text-sm {statusColors.text}">
            This startup has completed its journey in the program.
          </p>
        </div>

        <!-- Assessments and Mentor Section -->
        <div class="mb-8">
          <!-- Assigned Assessments -->
          <div class="mb-6">
            <h3 class="mb-2 text-lg font-medium">Assigned Assessments</h3>
            {#if startupAssessments.length === 0}
              <p class="text-sm text-muted-foreground">
                No assessments assigned.
              </p>
            {:else}
              <div class="flex flex-wrap gap-2">
                {#each startupAssessments as a}
                  <span
                    class="bg-secondary/10 rounded-full border border-border px-3 py-1 text-sm font-medium text-foreground"
                  >
                    {a.name}
                  </span>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Assigned Mentor Section (Read-only) -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium">Assigned Mentor</h3>
            <div class="bg-secondary/10 rounded-lg border border-border p-3">
              {#if startup?.mentors?.[0]}
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-medium text-foreground">
                    {startup.mentors[0].firstName}
                    {startup.mentors[0].lastName}
                  </span>
                  {#if startup.mentors[0].email}
                    <span
                      class="ml-auto whitespace-nowrap text-sm text-muted-foreground"
                      >{startup.mentors[0].email}</span
                    >
                  {/if}
                </div>
              {:else}
                <p class="text-sm text-muted-foreground">No mentor assigned</p>
              {/if}
            </div>
          </div>
        </div>

        <!-- AI Analysis Summary Section -->
        {#if startup.capsuleProposal?.aiAnalysisSummary}
          <div class="bg-primary/10 mb-6 rounded-lg border border-border p-4">
            <h3 class="mb-3 text-lg font-semibold text-foreground">
              AI Analysis Summary
            </h3>
            <p class="leading-relaxed text-foreground">
              {startup.capsuleProposal.aiAnalysisSummary}
            </p>
          </div>
        {/if}

        <!-- Detailed Application Information -->
        <div>
          <h3 class="mb-4 text-xl font-bold text-foreground">
            Detailed Application Information
          </h3>
          <div class="space-y-14 border-t pt-4">
            <div class="flex flex-col gap-6">
              <div>
                <h4 class="mb-2 font-semibold text-foreground">
                  Startup Description
                </h4>
                <div
                  class="border-foreground/50 bg-secondary/10 h-full rounded-lg border p-3"
                >
                  <p class="text-sm text-muted-foreground">
                    {startup.capsuleProposal?.description ||
                      'No description available'}
                  </p>
                </div>
              </div>

              {#if startup.capsuleProposal?.targetMarket}
                <div>
                  <h4 class="mb-2 font-semibold text-foreground">
                    Target Market
                  </h4>
                  <div
                    class="border-foreground/50 bg-secondary/10 h-full rounded-lg border p-3"
                  >
                    <p class="text-sm text-muted-foreground">
                      {startup.capsuleProposal.targetMarket}
                    </p>
                  </div>
                </div>
              {/if}

              {#if startup.capsuleProposal?.problemStatement}
                <div>
                  <h4 class="mb-2 font-semibold text-foreground">
                    Problem Statement
                  </h4>
                  <div
                    class="border-foreground/50 bg-secondary/10 h-full rounded-lg border p-3"
                  >
                    <p class="text-sm text-muted-foreground">
                      {startup.capsuleProposal.problemStatement}
                    </p>
                  </div>
                </div>
              {/if}

              {#if startup.capsuleProposal?.solutionDescription}
                <div>
                  <h4 class="mb-2 font-semibold text-foreground">
                    Solution Description
                  </h4>
                  <div
                    class="border-foreground/50 bg-secondary/10 h-full rounded-lg border p-3"
                  >
                    <p class="text-sm text-muted-foreground">
                      {startup.capsuleProposal.solutionDescription}
                    </p>
                  </div>
                </div>
              {/if}

              <div>
                <h4 class="mb-2 font-semibold text-foreground">Team Size</h4>
                <div
                  class="border-foreground/50 bg-secondary/10 h-full rounded-lg border p-3"
                >
                  <p class="text-sm text-muted-foreground">
                    {memberCount} member{memberCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {#if startup.capsuleProposal?.intellectualPropertyStatus}
                <div>
                  <h4 class="mb-2 font-semibold text-foreground">
                    Intellectual Property
                  </h4>
                  <div
                    class="border-foreground/50 bg-secondary/10 h-full rounded-lg border p-3"
                  >
                    <p class="text-sm text-muted-foreground">
                      {startup.capsuleProposal.intellectualPropertyStatus}
                    </p>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Historical Timeline -->
            {#if startup.capsuleProposal?.historicalTimeline && startup.capsuleProposal.historicalTimeline.length > 0}
              <div class="mt-6">
                <h4 class="mb-3 font-semibold text-foreground">
                  Historical Timeline
                </h4>
                <div
                  class="bg-secondary/10 rounded-lg border border-border p-2"
                >
                  <Table.Root>
                    <Table.Header>
                      <Table.Row>
                        <Table.Head class="font-bold text-foreground"
                          >Date</Table.Head
                        >
                        <Table.Head class="font-bold text-foreground"
                          >Description</Table.Head
                        >
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {#each startup.capsuleProposal.historicalTimeline as timeline}
                        <Table.Row>
                          <Table.Cell class="text-muted-foreground"
                            >{timeline.monthYear}</Table.Cell
                          >
                          <Table.Cell class="text-muted-foreground"
                            >{timeline.description}</Table.Cell
                          >
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
                <h4 class="mb-3 font-semibold text-foreground">
                  Competitive Analysis
                </h4>
                <div
                  class="bg-secondary/10 rounded-lg border border-border p-2"
                >
                  <Table.Root>
                    <Table.Header>
                      <Table.Row>
                        <Table.Head class="font-bold text-foreground"
                          >Competitor</Table.Head
                        >
                        <Table.Head class="font-bold text-foreground"
                          >Offering</Table.Head
                        >
                        <Table.Head class="font-bold text-foreground"
                          >Pricing Strategy</Table.Head
                        >
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {#each startup.capsuleProposal.competitiveAdvantageAnalysis as competitor}
                        <Table.Row>
                          <Table.Cell class="text-muted-foreground"
                            >{competitor.competitorName}</Table.Cell
                          >
                          <Table.Cell class="text-muted-foreground"
                            >{competitor.offer}</Table.Cell
                          >
                          <Table.Cell class="text-muted-foreground"
                            >{competitor.pricingStrategy}</Table.Cell
                          >
                        </Table.Row>
                      {/each}
                    </Table.Body>
                  </Table.Root>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
{/if}

