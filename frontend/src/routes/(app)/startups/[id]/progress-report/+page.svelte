<script lang="ts">
  import { Skeleton } from '$lib/components/ui/skeleton';
  import * as Card from '$lib/components/ui/card';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Download, RocketIcon } from 'lucide-svelte';
  import { StartupCard } from '$lib/components/startups';
  import { Can, RadarChart, RadarChartV2 } from '$lib/components/shared';
  import { useQuery } from '@sveltestack/svelte-query';
  import type { Role } from '$lib/types.js';
  import { getData } from '$lib/utils.js';
  import * as Dialog from '$lib/components/ui/dialog';
  import Application from '$lib/components/startup/Application.svelte';
  import * as Table from '$lib/components/ui/table';
  import html2canvas from 'html2canvas';
  import { PDFDocument } from 'pdf-lib';

  let { data } = $props();

  const queryResult = useQuery('startupDataProgressReport', () =>
    getData(`/progress/${data.startupId}/progress-report`, data.access!)
  );

  $effect(() => {
    if ($queryResult.isSuccess) {
      console.log('--------')
      console.log('--------')
      console.log($queryResult.data);
      console.log('--------')
      console.log('--------')
    }
  });

  const downloadMultiPagePDF = async () => {
    try {
      // Select all the pages to capture
      const pages = document.querySelectorAll('.pdf-page');
      const tables = document.querySelectorAll('.pdf-table');
      if (pages.length === 0) {
        alert('No pages found!');
        return;
      }
      // pages.forEach((page) => {
      // 	page.style.backgroundColor = 'white';
      // 	page.style.color = 'black'
      // });

      // tables.forEach((page) => {
      // 	page.style.backgroundColor = 'white';
      // 	page.style.color = 'black'
      // });
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      for (const pageElement of pages) {
        // Capture the current element as a canvas
        const canvas = await html2canvas(pageElement, {
          scale: 2, // Increases the resolution
          useCORS: true // Avoid cross-origin issues
        });

        // Convert the canvas to an image
        const imageData = canvas.toDataURL('image/png');

        // Get the dimensions of the canvas
        const { width, height } = canvas;

        // Add a new page to the PDF with dimensions matching the canvas
        const pdfPage = pdfDoc.addPage([width, height]);

        // Embed the PNG image into the PDF
        const pngImage = await pdfDoc.embedPng(imageData);
        pdfPage.drawImage(pngImage, {
          x: 0,
          y: 0,
          width,
          height
        });
      }

      // Serialize the PDF document to bytes
      const pdfBytes = await pdfDoc.save();

      // Trigger a download
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${$queryResult.data.name} - Progress Report.pdf`;
      link.click();

      // pages.forEach((page) => {
      // 	page.style.backgroundColor = '#020817';
      // 	page.style.color = 'white'
      // });

      // tables.forEach((page) => {
      // 	page.style.backgroundColor = '#020817';
      // 	page.style.color = 'white'
      // });
    } catch (error) {
      console.error('Error generating multi-page PDF:', error);
    }
  };

  let divRef: HTMLDivElement;

  $effect(() => {
    if ($queryResult.isSuccess) {
      console.log($queryResult.data.tasks);
    }
  });

  let titleState = $state(false);

  const titleIndex = $derived(
    $queryResult.isSuccess
      ? $queryResult.data.tasks
          .sort((a, b) => a.priority_number - b.priority_number)
          .findIndex((task) => task.initiatives && task.initiatives.length > 0)
      : 0
  );

  const statuses = [
    '',
    'Discontinued',
    'Delayed',
    'Scheduled',
    'Track',
    'Completed'
  ];
</script>

<svelte:head>
  <title
    >{$queryResult.isSuccess
      ? `${$queryResult.data.name} - Readiness and Needs Assessment`
      : 'Loading'}</title
  >
</svelte:head>
<div class="flex">
  <Button class="ml-auto" onclick={downloadMultiPagePDF}
    ><Download class="h-4 w-4" /> Download PDF</Button
  >
</div>

{#if $queryResult.isLoading}
  <div class="flex h-full flex-col gap-3">
    <div class="bg-background h-full w-full">
      <Skeleton class="h-full w-full" />
    </div>
  </div>
{:else}
  <div class="h-full overflow-scroll">
    <Card.Root class="pdf-page h-full">
      <Card.Content class="mt-1 flex w-full flex-col gap-5 px-10">
        <div class="w-full text-center text-3xl font-bold">
          {$queryResult.data.startup.name} - Progress Report
        </div>
        <div class="flex flex-col gap-2">
          <p>I. Readiness Levels</p>
          <div class="flex items-center justify-center">
            {#if $queryResult.data.readinessLevels}
              <RadarChartV2
                id={1231231}
                min={1}
                max={9}
                data={[
                  $queryResult.data.readinessLevels[0].level,
                  $queryResult.data.readinessLevels[1].level,
                  $queryResult.data.readinessLevels[2].level,
                  $queryResult.data.readinessLevels[3].level,
                  $queryResult.data.readinessLevels[4].level,
                  $queryResult.data.readinessLevels[5].level
                ]}
                labels={[
                  'Technology',
                  'Market',
                  'Acceptance',
                  'Organizational',
                  'Regulatory',
                  'Investment'
                ]}
              />
            {/if}
          </div>
        </div>
      </Card.Content>
    </Card.Root>
    <!-- <Card.Root class="pdf-page mt-3 h-full "> -->
    <!--   <Card.Content class="mt-1 flex w-full flex-col gap-5 px-10"> -->
    <!--     <div class="mt-10 flex flex-col gap-2"> -->
    <!--       <p>II. RNA Result Summary(Based on Readiness and Needs Assessment)</p> -->
    <!--       <div class="rounded-md border"> -->
    <!--         <Table.Root class="pdf-table rounded-lg"> -->
    <!--           <Table.Header> -->
    <!--             <Table.Row class="h-12 text-center"> -->
    <!--               <Table.Head class="pl-5">Readiness Type</Table.Head> -->
    <!--               <Table.Head>Current Level</Table.Head> -->
    <!--               <Table.Head class="pr-5">Details</Table.Head> -->
    <!--             </Table.Row> -->
    <!--           </Table.Header> -->
    <!--           <Table.Body> -->
    <!--             {#each $queryResult.data.rnas as rna, index} -->
    <!--               {#if index < 6} -->
    <!--                 <Table.Row class="h-14 cursor-pointer"> -->
    <!--                   <Table.Cell class="w-48 pl-5" -->
    <!--                     >{rna.readiness_type_rl_type}</Table.Cell -->
    <!--                   > -->
    <!--                   <Table.Cell class="w-40" -->
    <!--                     >{rna.readiness_level_level}</Table.Cell -->
    <!--                   > -->
    <!--                   <Table.Cell class="pr-5">{rna.rna}</Table.Cell> -->
    <!--                 </Table.Row> -->
    <!--               {/if} -->
    <!--             {/each} -->
    <!--           </Table.Body> -->
    <!--         </Table.Root> -->
    <!--       </div> -->
    <!--     </div> -->
    <!--   </Card.Content> -->
    <!-- </Card.Root> -->

    <Card.Root class="pdf-page mt-3 h-full">
      <Card.Content class="mt-1 flex w-full flex-col gap-5 px-10">
        <div class="mt-10 flex flex-col gap-2">
          <p>III. RECOMMENDED NEXT STEPS (RNS) - SHORT TERM</p>
          <div class="rounded-md border">
            <Table.Root class="pdf-table rounded-lg">
              <Table.Header>
                <Table.Row class="h-12 text-center">
                  <Table.Head class="pl-5">Priority Number</Table.Head>
                  <Table.Head>Readiness Type</Table.Head>
                  <Table.Head>Target Level</Table.Head>
                  <Table.Head>Description</Table.Head>
                  <Table.Head class="pr-5">Status</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {#each $queryResult.data.rns.filter((task: any) => task.isAiGenerated=== false) as rns, index}
                  <Table.Row class="h-14 cursor-pointer">
                    <Table.Cell class="w-48 pl-5"
                      >{rns.priorityNumber}</Table.Cell
                    >
                    <Table.Cell class="w-40"
                      >{rns.readinessType}</Table.Cell
                    >
                    <Table.Cell>{rns.targetLevelScore}</Table.Cell>
                    <Table.Cell>{rns.description}</Table.Cell>
                    <Table.Cell class="pr-5">{rns.status}</Table.Cell>
                  </Table.Row>
                {/each}
              </Table.Body>
            </Table.Root>
          </div>
        </div>
      </Card.Content>
    </Card.Root>

    <!-- {#each $queryResult.data.tasks.sort((a, b) => a.priority_number - b.priority_number) as item, index} -->
    <!--   {#if item.initiatives.length !== 0} -->
    <!--     <Card.Root class="pdf-page mt-3 h-full"> -->
    <!--       <Card.Content class="mt-1 flex w-full flex-col gap-5 px-10"> -->
    <!--         <div class="mt-10 flex flex-col gap-2"> -->
    <!--           {#if titleIndex === index} -->
    <!--             <p>III. PRIORITIES</p> -->
    <!--           {/if} -->
    <!--           <p>PRIORITY {item.priority_number}</p> -->
    <!--           <div class="rounded-md border"> -->
    <!--             <Table.Root class="pdf-table rounded-lg"> -->
    <!--               <Table.Header> -->
    <!--                 <Table.Row class="h-12 text-center"> -->
    <!--                   <Table.Head class="pl-5">Initiative Number</Table.Head> -->
    <!--                   <Table.Head>Description</Table.Head> -->
    <!--                   <Table.Head>Measures</Table.Head> -->
    <!--                   <Table.Head>Targets</Table.Head> -->
    <!--                   <Table.Head class="pr-5">Status</Table.Head> -->
    <!--                 </Table.Row> -->
    <!--               </Table.Header> -->
    <!--               <Table.Body> -->
    <!--                 {#each item.initiatives.filter((initiative: any) => initiative.is_ai_generated === false) as rns, index} -->
    <!--                   <Table.Row class="h-14 cursor-pointer"> -->
    <!--                     <Table.Cell class="w-48 pl-5" -->
    <!--                       >{rns.initiative_number}</Table.Cell -->
    <!--                     > -->
    <!--                     <Table.Cell class="w-40" -->
    <!--                       >{rns.description.substring(0, 100)}</Table.Cell -->
    <!--                     > -->
    <!--                     <Table.Cell>{rns.measures}</Table.Cell> -->
    <!--                     <Table.Cell>{rns.targets}</Table.Cell> -->
    <!--                     <Table.Cell class="pr-5" -->
    <!--                       >{statuses[rns.status - 1]}</Table.Cell -->
    <!--                     > -->
    <!--                   </Table.Row> -->
    <!--                 {/each} -->
    <!--               </Table.Body> -->
    <!--             </Table.Root> -->
    <!--           </div> -->
    <!--         </div> -->
    <!--       </Card.Content> -->
    <!--     </Card.Root> -->
    <!--   {/if} -->
    <!-- {/each} -->

    <Card.Root class="pdf-page mt-3 h-full ">
      <Card.Content class="mt-1 flex w-full flex-col gap-5  px-10">
        <div class="mt-10 flex flex-col gap-2">
          <p>IV. RECOMMENDED NEXT STEPS (RNS) - LONG TERM</p>
          <div class="rounded-md border">
            <Table.Root class="pdf-table rounded-lg">
              <Table.Header>
                <Table.Row class="h-12 text-center">
                  <Table.Head class="pl-5">Priority Number</Table.Head>
                  <Table.Head>Readiness Type</Table.Head>
                  <Table.Head>Target Level</Table.Head>
                  <Table.Head>Description</Table.Head>
                  <Table.Head class="pr-5">Status</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {#each $queryResult.data.tasks.filter((task: any) => task.task_type === 2 && task.is_ai_generated === false) as rns, index}
                  <Table.Row class="h-14 cursor-pointer">
                    <Table.Cell class="w-48 pl-5"
                      >{rns.priority_number}</Table.Cell
                    >
                    <Table.Cell class="w-40"
                      >{rns.readiness_type_rl_type}</Table.Cell
                    >
                    <Table.Cell>{rns.target_level_level}</Table.Cell>
                    <Table.Cell>{rns.description}</Table.Cell>
                    <Table.Cell class="pr-5">{rns.status}</Table.Cell>
                  </Table.Row>
                {/each}
              </Table.Body>
            </Table.Root>
          </div>
        </div>
      </Card.Content>
    </Card.Root>

    <!-- <Card.Root class="pdf-page mt-3 h-full "> -->
    <!--   <Card.Content class="mt-1 flex w-full flex-col gap-5  px-10"> -->
    <!--     <div class="mt-10 flex flex-col gap-2"> -->
    <!--       <p>V. RISKS AND ROADBLOCKS - SHORT TERM AND LONG TERM</p> -->
    <!--       <div class="rounded-md border"> -->
    <!--         <Table.Root class="pdf-table rounded-lg"> -->
    <!--           <Table.Header> -->
    <!--             <Table.Row class="h-12 text-center"> -->
    <!--               <Table.Head class="pl-5">Risk Number</Table.Head> -->
    <!--               <Table.Head>Description</Table.Head> -->
    <!--               <Table.Head>Fix/Mitigation</Table.Head> -->
    <!--               <Table.Head class="pr-5">Assignee</Table.Head> -->
    <!--             </Table.Row> -->
    <!--           </Table.Header> -->
    <!--           <Table.Body> -->
    <!--             {#each $queryResult.data.roadblocks as roadblock, index} -->
    <!--               {#if index < 3} -->
    <!--                 <Table.Row class="h-14 cursor-pointer"> -->
    <!--                   <Table.Cell class="w-40 pl-5" -->
    <!--                     >{roadblock.risk_number}</Table.Cell -->
    <!--                   > -->
    <!--                   <Table.Cell class="">{roadblock.description}</Table.Cell> -->
    <!--                   <Table.Cell>{roadblock.fix}</Table.Cell> -->
    <!--                   <Table.Cell class="pr-5" -->
    <!--                     >{roadblock.assignee_last_name}</Table.Cell -->
    <!--                   > -->
    <!--                 </Table.Row> -->
    <!--               {/if} -->
    <!--             {/each} -->
    <!--           </Table.Body> -->
    <!--         </Table.Root> -->
    <!--       </div> -->
    <!--     </div> -->
    <!--   </Card.Content> -->
    <!-- </Card.Root> -->
  </div>
{/if}
