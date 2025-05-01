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
</script>

<Dialog.Root open={showDialog} onOpenChange={toggleDialog}>
  <Dialog.Content class="h-[90%] max-w-[800px]">
    <div class="flex flex-col overflow-scroll">
      <div class="flex h-0 flex-col gap-5">
        <!-- Project Details -->
        <div class="flex flex-col gap-3">
          <h1 class="text-lg font-semibold">Project Details</h1>
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

          <div class="grid gap-2">
            <Label for="email" class="flex gap-2"
              >Capsule Proposal

              {#if showCapsule}
                <button on:click={toggleCapsule}>
                  <EyeOff class="h-4 w-4 cursor-pointer" />
                </button>
              {:else}
                <button on:click={toggleCapsule}>
                  <Eye class="h-4 w-4 cursor-pointer" />
                </button>
              {/if}
            </Label>
            <div class="flex w-full justify-center">
              {#if showCapsule}
                <object
                  data={inf.capsule_proposal}
                  type="application/pdf"
                  width="700"
                  height="1000"
                  title="capsule_proposal"
                  transition:fade
                ></object>
              {/if}
            </div>
          </div>
        </div>
        <!-- Group Information -->
        <div class="flex flex-col gap-3">
          <h1 class="text-lg font-semibold">Group Information</h1>
          <div class="grid gap-2">
            <Label for="email">Group Name</Label>
            <Input
              readonly
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              value={inf.group_name}
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
                value={inf.leader_email}
              />
              <Input
                readonly
                name="email"
                id="email"
                type="text"
                placeholder="m@example.com"
                value={inf.leader_first_name}
              />
              <Input
                readonly
                name="email"
                id="email"
                type="text"
                placeholder="m@example.com"
                value={inf.leader_last_name}
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
          <h1 class="text-lg font-semibold">
            Technology and Commercialization Calculator
          </h1>
          <div class="p-10">
            <RadarChart
              id={inf.id}
              min={0}
              max={9}
              data={[
                calc.technology_score,
                calc.product_development,
                calc.product_definition,
                calc.competitive_landscape,
                calc.team,
                calc.go_to_market,
                calc.supply_chain
              ]}
              labels={[
                'Technology',
                'Product Development',
                'Product Definition',
                'Competitive Landscape',
                'Team',
                'Go-To-Market',
                'Supply Chain'
              ]}
            />
          </div>
        </div>
        <!-- URAT Assessment -->
        <div class="flex flex-col gap-3">
          <h1 class="text-lg font-semibold">URAT Assessment</h1>
          <div class="flex flex-col gap-3">
            <Assessment
              questions={que.filter((d) => d.readinessType === 'Technology')}
              answers={ans.filter((d) => d.readinessType === 'Technology')}
              type="Technology"
              {access}
            />
            <Assessment
              questions={que.filter((d) => d.readinessType === 'Market')}
              answers={ans.filter((d) => d.readinessType === 'Market')}
              type="Market"
              {access}
            />
            <Assessment
              questions={que.filter((d) => d.readinessType === 'Regulatory')}
              answers={ans.filter((d) => d.readinessType === 'Regulatory')}
              type="Regulatory"
              {access}
            />
            <Assessment
              questions={que.filter((d) => d.readinessType === 'Acceptance')}
              answers={ans.filter((d) => d.readinessType === 'Acceptance')}
              type="Acceptance"
              {access}
            />
            <Assessment
              questions={que.filter(
                (d) => d.readinessType === 'Organizational'
              )}
              answers={ans.filter((d) => d.readinessType === 'Organizational')}
              type="Organizational"
              {access}
            />
            <Assessment
              questions={que.filter((d) => d.readinessType === 'Investment')}
              answers={ans.filter((d) => d.readinessType === 'Investment')}
              type="Investment"
              {access}
            />
          </div>
        </div>
        <div class="flex justify-end">
          <Button onclick={() => saveRating(inf.id)}>Save Rating</Button>
        </div>
      </div>
    </div></Dialog.Content
  >
</Dialog.Root>
