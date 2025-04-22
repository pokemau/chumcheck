<script lang="ts">
  import { RadioButton } from '$lib/components/ui/radio';
  import * as Table from '$lib/components/ui/table/index.js';
  const { criterias, type, questionnaire } = $props();
</script>

<div class="rounded-md border">
  <Table.Root class="rounded-lg bg-background">
    <Table.Header>
      <Table.Row class="text-centery h-12">
        <Table.Head class="w-1/4 pl-5">Criteria</Table.Head>
        <Table.Head class="text-center">Excellent (5)</Table.Head>
        <Table.Head class="text-center">Good (4)</Table.Head>
        <Table.Head class="text-center">Fair (3)</Table.Head>
        <Table.Head class="text-center">Poor (2)</Table.Head>
        <Table.Head class="text-center">Very Poor (1)</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each criterias as criteria, i}
        <Table.Row class="h-14 cursor-pointer">
          <input
            type="hidden"
            name={`${type}Criteria${questionnaire.level}${i + 1}`}
            value={`${criteria.id}`}
          />
          <Table.Cell class="w-1/4 pl-5">{criteria.criteria}</Table.Cell>
          <Table.Cell class="w-[200px]">
            <RadioButton name={`${type}${questionnaire.level}${i + 1}`} value="5" />
          </Table.Cell>
          <Table.Cell class="w-[200px]">
            <RadioButton name={`${type}${questionnaire.level}${i + 1}`} value="4" />
          </Table.Cell>
          <Table.Cell class="w-[200px]">
            <RadioButton name={`${type}${questionnaire.level}${i + 1}`} value="3" />
          </Table.Cell>
          <Table.Cell class="w-[200px]">
            <RadioButton name={`${type}${questionnaire.level}${i + 1}`} value="2" />
          </Table.Cell>
          <Table.Cell class="w-[200px]">
            <RadioButton name={`${type}${questionnaire.level}${i + 1}`} value="1" checked />
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
