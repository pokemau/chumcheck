<script lang="ts">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import Eye from 'lucide-svelte/icons/eye';
  import EyeOff from 'lucide-svelte/icons/eye-off';
  import RadarChart from '$lib/components/shared/RadarChart.svelte';
  import { fade } from 'svelte/transition';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Dialog from '$lib/components/ui/dialog';
  import Assessment from '$lib/components/admin/Assessment.svelte';
  import { CalculatorCategory } from '$lib/utils';

  let showCapsule = false;

  function toggleCapsule() {
    showCapsule = !showCapsule;
  }
  export let inf: any,
    que: any,
    ans: any,
    calc: any,
    saveRating,
    showDialog,
    toggleDialog,
    access;

  const calculatorCategoryLabels = [
    CalculatorCategory.Technology,
    CalculatorCategory.Product_Development,
    CalculatorCategory.Product_Definition,
    CalculatorCategory.Competitive_Landscape,
    CalculatorCategory.Team,
    CalculatorCategory.Go_To_Market,
    CalculatorCategory.Supply_Chain
  ];

  const calculatorScoresByCategory = calculatorCategoryLabels.map((label) => {
    const apiKeyMapping: Record<string, string> = {
      [CalculatorCategory.Technology]: "Technology",
      [CalculatorCategory.Product_Development]: "Product Development",
      [CalculatorCategory.Product_Definition]: "Product Definition/Design",
      [CalculatorCategory.Competitive_Landscape]: "Competitive Landscape",
      [CalculatorCategory.Team]: "Team",
      [CalculatorCategory.Go_To_Market]: "Go-To-Market",
      [CalculatorCategory.Supply_Chain]: "Manufacturing/Supply Chain",
    };

    const apiKey = apiKeyMapping[label];
    return calc[apiKey] || 0;
  });

  let scores: { readinessType: string; questionId: number; score: number }[] = [];

  function updateScore({ readinessType, questionId, score }: { readinessType: string; questionId: number; score: number }) {
    // Update or add the score for the given questionId
    const existingIndex = scores.findIndex((s) => s.questionId === questionId);
    if (existingIndex !== -1) {
      scores[existingIndex] = { readinessType, questionId, score };
    } else {
      scores.push({ readinessType, questionId, score });
    }
  }
</script>

<Dialog.Root open={showDialog} onOpenChange={toggleDialog}>
  <Dialog.Content class="h-[90%] max-w-[1000px]">
    <div class="flex flex-col overflow-auto">
      <div class="flex h-0 flex-col gap-5">
        <!-- Project Details -->
        <div class="flex flex-col gap-3">
          <h1 class="text-2xl font-semibold">Project Details</h1>
          <div class="grid gap-2">
            <Label for="email">Startup Name</Label>
            <Input
              readonly
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              value={inf.name}
            />
          </div>

        </div>
        <!-- Group Information -->
        <div class="flex flex-col gap-3">
          <h1 class="text-2xl font-semibold">Group Information</h1>
          <div class="grid gap-2">
            <Label for="email">Group Name</Label>
            <Input
              readonly
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              value={inf.groupName}
            />
          </div>

          <div class="grid gap-2">
            <Label for="email">Leader</Label>
            <div class="flex gap-3">
              <Input
                readonly
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                value={inf.user.email}
              />
              <Input
                readonly
                name="email"
                id="email"
                type="text"
                placeholder="m@example.com"
                value={inf.user.firstName}
              />
              <Input
                readonly
                name="email"
                id="email"
                type="text"
                placeholder="m@example.com"
                value={inf.user.lastName}
              />
            </div>
          </div>
          {#each inf.members as member, i}
            <div class="grid gap-2">
              <Label for="email">Member #{i + 1}</Label>
              <div class="flex gap-3">
                <Input
                  readonly
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={member.email}
                />
                <Input
                  readonly
                  name="email"
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  value={member.first_name}
                />
                <Input
                  readonly
                  name="email"
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  value={member.last_name}
                />
              </div>
            </div>
          {/each}

          {#if inf.university_name}
            <div class="grid gap-2">
              <Label for="email">University Name</Label>
              <Input
                readonly
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                value={inf.university_name}
              />
            </div>
          {/if}
        </div>
        <!-- Calculator -->
        <div class="flex flex-col gap-3">
          <h1 class="text-2xl font-semibold">
            Technology and Commercialization Calculator
          </h1>
          <div class="p-10">
            <RadarChart
              id={inf.id}
              min={0}
              max={5}
              data={calculatorScoresByCategory}
              labels={calculatorCategoryLabels}
            />
          </div>
        </div>
        <!-- URAT Assessment -->
        <div class="flex flex-col gap-3">
          <h1 class="text-2xl font-semibold">URAT Assessment</h1>
          <div class="flex flex-col gap-20">
            <Assessment
              questions={que.filter((d) => d.readinessType === 'Technology')}
              answers={ans.filter((d) => d.readinessType === 'Technology')}
              type="Technology"
              {access}
              onScoreChange={updateScore}
            />
            <Assessment
              questions={que.filter((d) => d.readinessType === 'Market')}
              answers={ans.filter((d) => d.readinessType === 'Market')}
              type="Market"
              {access}
              onScoreChange={updateScore}
            />
            <Assessment
              questions={que.filter((d) => d.readinessType === 'Regulatory')}
              answers={ans.filter((d) => d.readinessType === 'Regulatory')}
              type="Regulatory"
              {access}
              onScoreChange={updateScore}
            />
            <Assessment
              questions={que.filter((d) => d.readinessType === 'Acceptance')}
              answers={ans.filter((d) => d.readinessType === 'Acceptance')}
              type="Acceptance"
              {access}
              onScoreChange={updateScore}
            />
            <Assessment
              questions={que.filter(
                (d) => d.readinessType === 'Organizational'
              )}
              answers={ans.filter((d) => d.readinessType === 'Organizational')}
              type="Organizational"
              {access}
              onScoreChange={updateScore}
            />
            <Assessment
              questions={que.filter((d) => d.readinessType === 'Investment')}
              answers={ans.filter((d) => d.readinessType === 'Investment')}
              type="Investment"
              {access}
              onScoreChange={updateScore}
            />
          </div>
        </div>
        <div class="flex justify-end">
          <Button onclick={() => saveRating(inf.id, scores)}>Save Rating</Button>
        </div>
      </div>
    </div></Dialog.Content
  >
</Dialog.Root>
