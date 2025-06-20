<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public';
  export let currentActive: number;
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import Spinner from 'lucide-svelte/icons/loader-circle';

  let files: any;
  export let access: string;
  export let startup: any = null;
  let processing = false;
  let information: {
    title: string;
    startup_description: string;
    problem_statement: string;
    target_market: string;
    solution_description: string;
    objectives: string;
    scope: string;
    methodology: string;
  };

  let formData = {
    name: startup?.name ?? '',
    // capsule proposal
    links: startup?.links ?? ''
  };

  async function getInformation() {
    processing = true;
    if (!files || !files[0]) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('capsuleProposal', files[0]);

    const response = await fetch(
      `${PUBLIC_API_URL}/startups/parse-capsule-proposal`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access}`
        },
        body: formData
      }
    );

    const data = await response.json();

    if (response.ok) {
      information = data;
      console.log("Capsule proposal parsed data: (Title used would be from the form, not from the file, so if the title here is null, disregard");
    }

    processing = false;
  }

  $: if (files) {
    getInformation();
  }
</script>

<div class="flex-1 overflow-auto px-1" class:hidden={currentActive !== 2}>
  <div class="flex h-0 flex-col gap-5">
    <div class="grid gap-2">
      <Label for="startup_name">Startup name</Label>
      <Input
        name="startup_name"
        id="startup_name"
        type="text"
        placeholder="startup name"
        required
        bind:value={formData.name}
      />
    </div>
    <div class="grid gap-2">
      <Label>Capsule Proposal</Label>
      <label
        for="capsuleProposal"
        class="flex h-32 items-center justify-center rounded-lg border border-dashed text-sm"
      >
        {#if files}
          {#if processing}
            <div class="flex flex-col items-center justify-center gap-3">
              <Spinner class="mr-2 h-6 w-6 animate-spin" />
              <h2 class="text-sm">Processing your capsule proposal...</h2>
            </div>
          {:else}
            <div>{files[0].name}</div>
          {/if}
        {:else if startup?.capsuleProposal?.fileName}
          <div class="flex flex-col items-center justify-center gap-2">
            <div>{startup.capsuleProposal.fileName}</div>
          </div>
        {:else}
          Upload or drag your capsule proposal here.
        {/if}
      </label>
      <input
        id="capsuleProposal"
        name="capsuleProposal"
        class="hidden"
        type="file"
        accept=".pdf"
        bind:files
      />
    </div>
    {#if files && !processing}
      <input type="hidden" name="title" value={information.title} />
      <input
        type="hidden"
        name="startupDescription"
        value={information.startup_description}
      />
      <input
        type="hidden"
        name="problemStatement"
        value={information.problem_statement}
      />
      <input
        type="hidden"
        name="targetMarket"
        value={information.target_market}
      />
      <input
        type="hidden"
        name="solutionDescription"
        value={information.solution_description}
      />
      <input type="hidden" name="objectives" value={information.objectives} />
      <input type="hidden" name="scope" value={information.scope} />
      <input type="hidden" name="methodology" value={information.methodology} />
    {/if}
    <div class="grid gap-2">
      <Label for="links"
        >Links to any supporting materials (e.g., website, explainer video)</Label
      >
      <Input name="links" id="links" type="text" placeholder="links" required bind:value={formData.links}/>
    </div>
  </div>
</div>
