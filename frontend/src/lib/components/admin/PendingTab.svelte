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
  import { Textarea } from '$lib/components/ui/textarea';
  import RadarChart from '$lib/components/shared/RadarChart.svelte';
  import { fade } from 'svelte/transition';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as RadioGroup from '$lib/components/ui/radio-group';
  import { Info } from 'lucide-svelte';
  import Assessment from './Assessment.svelte';
  import { PUBLIC_API_URL } from '$env/static/public';
  const access =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1NjI0NjA0LCJpYXQiOjE3MjUzNjQ0MzIsImp0aSI6IjM3MWQ4NWNkMjlhZTQ3NWFiY2Y3YzBkMzQ4MmFjNjk0IiwidXNlcl9pZCI6MSwidXNlcl90eXBlIjoiTSJ9.hlZnRNMwzxM2TJZJ2twMcZhu64toUUte4iX7sMWAKMw';

  export let data;
  let applicants = data.filter((d) => d.qualification_status === 1);
  console.log('lol' + applicants);
  let showCapsule = false;

  let showPendingDialog = false;

  function togglePendingdialog() {
    showPendingDialog = !showPendingDialog;
  }

  function toggleCapsule() {
    showCapsule = !showCapsule;
  }
  let inf: any, que: any, ans: any, calc: any;

  async function getStartupInformation(startupId: number) {
    console.log('here');
    const response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}/`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`
      }
    });

    const data = await response.json();
    if (response.ok) {
      const urat_questions = await fetch(`${PUBLIC_API_URL}/readinesslevel/urat-questions/`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${access}`
        }
      });

      const questions_data = await urat_questions.json();

      const urat_answers = await fetch(
        `${PUBLIC_API_URL}/urat-question-answers/?startup_id=${startupId}`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      const answers_data = await urat_answers.json();

      const calculator = await fetch(
        `${PUBLIC_API_URL}/startups/${startupId}/calculator-final-scores/`,
        {
          method: 'get',
          headers: {
            Authorization: `Bearer ${access}`
          }
        }
      );

      const calculator_data = await calculator.json();

      if (urat_questions.ok && urat_answers.ok && calculator.ok) {
        inf = data;
        que = questions_data.results;
        ans = answers_data.results;
        calc = calculator_data;
        console.log(que);
        console.log(ans);
        // return {
        // 	info: data,
        // 	questions: questions_data.results,
        // 	answers: answers_data.results,
        // 	access: access,
        // 	calculator: calculator_data
        // };
        togglePendingdialog();
      }
    }
  }

  async function saveRating(startupId: string) {
    const response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}/rate-applicant/`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${access}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      const sub = applicants.filter((d) => d.id !== startupId);
      applicants = sub;
      togglePendingdialog();
    }
  }
</script>

<Tabs.Content value="pending">
  <Card.Root
    data-x-chunk-name="dashboard-06-chunk-1"
    data-x-chunk-description="A list of products in a table with actions. Each row has an image, name, status, price, total sales, created at and actions."
  >
    <Card.Content class="pt-[24px]">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Startup Name</Table.Head>
            <Table.Head>Group Name</Table.Head>
            <Table.Head>Leader Name</Table.Head>
            <Table.Head>
              <span class="sr-only">Actions</span>
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each applicants as applicant}
            <Table.Row class="h-[80px]">
              <Table.Cell class="font-medium">{applicant.name}</Table.Cell>
              <Table.Cell>{applicant.group_name}</Table.Cell>
              <Table.Cell class="hidden md:table-cell">{applicant.user}</Table.Cell>
              <Table.Cell>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild let:builder>
                    <Button aria-haspopup="true" size="icon" variant="ghost" builders={[builder]}>
                      <Ellipsis class="h-4 w-4" />
                      <span class="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="end">
                    <DropdownMenu.Label>Action</DropdownMenu.Label>
                    <DropdownMenu.Item>Approve</DropdownMenu.Item>
                    <DropdownMenu.Item>Reject</DropdownMenu.Item>
                    <DropdownMenu.Item on:click={() => getStartupInformation(applicant.id)}
                      >View</DropdownMenu.Item
                    >
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </Card.Content>
  </Card.Root>
</Tabs.Content>

<Dialog.Root open={showPendingDialog} onOpenChange={togglePendingdialog}>
  <Dialog.Content class="h-[90%] max-w-[800px]">
    <div class="flex flex-col overflow-scroll">
      <div class="flex h-0 flex-col gap-5">
        <!-- Project Details -->
        <div class="flex flex-col gap-3">
          <h1 class="text-lg font-semibold">Project Details</h1>
          <div class="grid gap-2">
            <Label for="email">Startup Name</Label>
            <Input readonly name="email" id="email" type="email" placeholder="m@example.com" />
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
                  data="/sample.pdf"
                  type="application/pdf"
                  width="700"
                  height="1000"
                  title="capsule_proposal"
                  transition:fade
                />
              {/if}
            </div>
          </div>
        </div>
        <!-- Group Information -->
        <div class="flex flex-col gap-3">
          <h1 class="text-lg font-semibold">Group Information</h1>
          <div class="grid gap-2">
            <Label for="email">Group Name</Label>
            <Input readonly name="email" id="email" type="email" placeholder="m@example.com" />
          </div>

          <div class="grid gap-2">
            <Label for="email">Leader</Label>
            <div class="flex gap-3">
              <Input readonly name="email" id="email" type="email" placeholder="m@example.com" />
              <Input readonly name="email" id="email" type="text" placeholder="m@example.com" />
              <Input readonly name="email" id="email" type="text" placeholder="m@example.com" />
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Member #1</Label>
            <div class="flex gap-3">
              <Input readonly name="email" id="email" type="email" placeholder="m@example.com" />
              <Input readonly name="email" id="email" type="text" placeholder="m@example.com" />
              <Input readonly name="email" id="email" type="text" placeholder="m@example.com" />
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">Member #2</Label>
            <div class="flex gap-3">
              <Input readonly name="email" id="email" type="email" placeholder="m@example.com" />
              <Input readonly name="email" id="email" type="text" placeholder="m@example.com" />
              <Input readonly name="email" id="email" type="text" placeholder="m@example.com" />
            </div>
          </div>
          <div class="grid gap-2">
            <Label for="email">University Name</Label>
            <Input readonly name="email" id="email" type="email" placeholder="m@example.com" />
          </div>
        </div>
        <!-- Calculator -->
        <div class="flex flex-col gap-3">
          <h1 class="text-lg font-semibold">Technology and Commercialization Calculator</h1>
          <div class="p-10">
            <RadarChart id={inf.id} />
          </div>
        </div>
        <!-- URAT Assessment -->
        <div class="flex flex-col gap-3">
          <h1 class="text-lg font-semibold">Assessment</h1>
          <div class="flex flex-col gap-3">
            <Assessment
              questions={que.filter((d) => d.readiness_type === 'Technology')}
              answers={ans.filter((d) => d.readiness_type === 'Technology')}
              type="Technology"
            />
            <Assessment
              questions={que.filter((d) => d.readiness_type === 'Market')}
              answers={ans.filter((d) => d.readiness_type === 'Market')}
              type="Market"
            />
            <Assessment
              questions={que.filter((d) => d.readiness_type === 'Regulatory')}
              answers={ans.filter((d) => d.readiness_type === 'Regulatory')}
              type="Regulatory"
            />
            <Assessment
              questions={que.filter((d) => d.readiness_type === 'Acceptance')}
              answers={ans.filter((d) => d.readiness_type === 'Acceptance')}
              type="Acceptance"
            />
            <Assessment
              questions={que.filter((d) => d.readiness_type === 'Organizational')}
              answers={ans.filter((d) => d.readiness_type === 'Organizational')}
              type="Organizational"
            />
            <Assessment
              questions={que.filter((d) => d.readiness_type === 'Investment')}
              answers={ans.filter((d) => d.readiness_type === 'Investment')}
              type="Investment"
            />
          </div>
        </div>
        <div class="flex justify-end">
          <Button on:click={() => saveRating(inf.id)}>Save Rating</Button>
        </div>
      </div>
    </div></Dialog.Content
  >
</Dialog.Root>
