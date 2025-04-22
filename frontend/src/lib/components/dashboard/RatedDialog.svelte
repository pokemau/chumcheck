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

  let showCapsule = false;

  function toggleCapsule() {
    showCapsule = !showCapsule;
  }
  export let inf: any,
    que,
    ans,
    calc: any,
    trl = 0,
    orl = 0,
    mrl = 0,
    rrl = 0,
    arl = 0,
    irl = 0,
    showDialog,
    toggleDialog,
    mentors,
    approveStartup,
    rejectStartup;

  let selectedMentor = mentors[0].id;
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
          <h1 class="text-lg font-semibold">Technology and Commercialization Calculator</h1>
          <div>Technology: {calc.technology_level}</div>
          <div>Commercialization: {calc.commercialization_level}</div>
          <div class="p-10">
            <RadarChart
              id={inf.id}
              min={0}
              max={5}
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
          <div class="p-20">
            <RadarChart
              id={inf.id + 100}
              min={0}
              max={15}
              data={[trl, orl, mrl, rrl, arl, irl]}
              labels={[
                'Technology',
                'Organizational',
                'Market',
                'Regulatory',
                'Acceptance',
                'Investment'
              ]}
            />
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <h1 class="text-lg font-semibold">Assign Mentor</h1>

          <Select.Root type="single" bind:value={selectedMentor}>
            <Select.Trigger class="w-[180px]">
              {mentors.filter((mentor: any) => mentor.id === selectedMentor)[0].first_name}
              {mentors.filter((mentor: any) => mentor.id === selectedMentor)[0].last_name}
            </Select.Trigger>
            <Select.Content>
              {#each mentors as mentor}
                <Select.Item value={mentor.id}
                  >{`${mentor.first_name} ${mentor.last_name}`}</Select.Item
                >
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
        <div class="flex justify-end gap-3">
          <!-- <Button variant="destructive">Reject</Button> -->
          <Button variant="destructive" onclick={() => rejectStartup(inf.id)}>Reject</Button>
          <Button onclick={() => approveStartup(inf.id, selectedMentor)}>Approve</Button>
        </div>
      </div>
    </div></Dialog.Content
  >
</Dialog.Root>
