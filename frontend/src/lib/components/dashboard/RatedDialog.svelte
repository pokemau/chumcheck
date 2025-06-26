<script lang="ts">
  import Ellipsis from 'lucide-svelte/icons/ellipsis';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import * as Table from '$lib/components/ui/table/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  import Eye from 'lucide-svelte/icons/eye';
  import EyeOff from 'lucide-svelte/icons/eye-off';
  import RadarChart from '$lib/components/shared/RadarChart.svelte';
  import { fade } from 'svelte/transition';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Select from '$lib/components/ui/select';
  import { PUBLIC_API_URL } from '$env/static/public';
  import { isMentor } from '$lib/utils';
  import { CalculatorCategory } from '$lib/utils';
  import type { CalculatorQuestionAnswer } from '$lib/types';
  import { ReadinessType } from '$lib/utils';
  import type { UratQuestionAnswer } from '$lib/types';

  let showCapsule = false;

  function toggleCapsule() {
    showCapsule = !showCapsule;
  }
  export let inf: any,
    que,
    ans,
    calc: any,
    uratReadinessScores,
    showDialog,
    toggleDialog,
    mentors,
    approveStartup,
    rejectStartup;

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
      [CalculatorCategory.Technology]: 'Technology',
      [CalculatorCategory.Product_Development]: 'Product Development',
      [CalculatorCategory.Product_Definition]: 'Product Definition/Design',
      [CalculatorCategory.Competitive_Landscape]: 'Competitive Landscape',
      [CalculatorCategory.Team]: 'Team',
      [CalculatorCategory.Go_To_Market]: 'Go-To-Market',
      [CalculatorCategory.Supply_Chain]: 'Manufacturing/Supply Chain'
    };

    const apiKey = apiKeyMapping[label];
    return calc[apiKey] || 0;
  });

  const uratLabels = [
    ReadinessType.Technology,
    ReadinessType.Organizational,
    ReadinessType.Market,
    ReadinessType.Regulatory,
    ReadinessType.Acceptance,
    ReadinessType.Investment
  ];

  const uratScoresByType = uratLabels.map(
    (type) => uratReadinessScores[type] || 0
  );

  let selectedMentor = mentors?.[0]?.id || null;
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
                  value={member.firstName}
                />
                <Input
                  readonly
                  name="email"
                  id="email"
                  type="text"
                  placeholder="m@example.com"
                  value={member.lastName}
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
          <div class="text-lg">Technology: {calc['Technology Level']}</div>
          <div class="text-lg">
            Commercialization: {calc['Commercialization Level']}
          </div>
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
          <h1 class="text-lg font-semibold">URAT Assessment</h1>
          <div class="p-20">
            <RadarChart
              id={inf.id + 100}
              min={0}
              max={15}
              data={uratScoresByType}
              labels={uratLabels}
            />
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <h1 class="text-lg font-semibold">Assign Mentor</h1>

          <Select.Root type="single" bind:value={selectedMentor}>
            <Select.Trigger class="w-[180px]">
              {#if mentors && mentors.length > 0 && selectedMentor}
                {mentors.find((mentor: any) => mentor.id === selectedMentor)
                  ?.firstName || 'Select Mentor'}
                {mentors.find((mentor: any) => mentor.id === selectedMentor)
                  ?.lastName || ''}
              {:else}
                Select Mentor
              {/if}
            </Select.Trigger>
            <Select.Content>
              {#each mentors as mentor}
                <Select.Item value={mentor.id}
                  >{`${mentor.firstName} ${mentor.lastName}`}</Select.Item
                >
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
        <div class="flex justify-end gap-3">
          <!-- <Button variant="destructive">Reject</Button> -->
          <Button variant="destructive" onclick={() => rejectStartup(inf.id)}
            >Reject</Button
          >
          <Button onclick={() => approveStartup(inf.id, selectedMentor)}
            >Approve</Button
          >
        </div>
      </div>
    </div></Dialog.Content
  >
</Dialog.Root>
