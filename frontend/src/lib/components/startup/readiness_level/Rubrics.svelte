<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Table from '$lib/components/ui/table/index.js';
  import * as Tabs from '$lib/components/ui/tabs/index.js';

  const access =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MTU1ODEyLCJpYXQiOjE3MTY4OTY2MTIsImp0aSI6IjE3NDRiZGUyYTMwYjRiNTRhN2ZmNTYxNDNiMmE3OTliIiwidXNlcl9pZCI6MywidXNlcl90eXBlIjoiTSJ9.01eNx7NdkvPkXEFg2wCate01ct4zIRQ5dr1XQJjH8TQ';

  export let questions: any, type: string;
</script>

<Tabs.Content value={`${type}`}>
  <div class="flex flex-col gap-3">
    {#each questions as question, index}
      <div class="flex gap-3">
        <input
          type="radio"
          name={`${type}ReadinessLevel`}
          class="radio"
          value={question.id}
          checked={index === 0}
        />
        <p>Level {question.level}: {question.name}</p>
      </div>

      <Card.Root
        data-x-chunk-name="dashboard-06-chunk-1"
        data-x-chunk-description="A list of products in a table with actions. Each row has an image, name, status, price, total sales, created at and actions."
      >
        <Card.Content class="pt-[24px]">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head class="text-center">Criteria</Table.Head>
                <Table.Head class="text-center">Excellent (5)</Table.Head>
                <Table.Head class="text-center">Good (4)</Table.Head>
                <Table.Head class="text-center">Fair (3)</Table.Head>
                <Table.Head class="text-center">Poor (2)</Table.Head>
                <Table.Head class="text-center">Very Poor (1)</Table.Head>
                <Table.Head class="text-center">Remark</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each question.level_criteria as criteria, i}
                <Table.Row class="h-[50px]">
                  <input
                    type="hidden"
                    name={`${type}Criteria${question.level}${i + 1}`}
                    value={`${criteria.id}`}
                  />
                  <Table.Cell>{criteria.criteria}</Table.Cell>
                  <Table.Cell class="text-center"
                    ><input
                      type="radio"
                      name={`${type}${question.level}${i + 1}`}
                      value="5"
                    /></Table.Cell
                  >
                  <Table.Cell class="text-center"
                    ><input
                      type="radio"
                      name={`${type}${question.level}${i + 1}`}
                      value="4"
                      data-tip={criteria.good_description}
                    /></Table.Cell
                  >
                  <Table.Cell class="text-center"
                    ><input
                      type="radio"
                      name={`${type}${question.level}${i + 1}`}
                      value="3"
                      data-tip={criteria.fair_description}
                    /></Table.Cell
                  >
                  <Table.Cell class="text-center"
                    ><input
                      type="radio"
                      name={`${type}${question.level}${i + 1}`}
                      value="2"
                      data-tip={criteria.poor_description}
                    /></Table.Cell
                  >
                  <Table.Cell class="text-center"
                    ><input
                      type="radio"
                      name={`${type}${question.level}${i + 1}`}
                      value="1"
                      class="radio tooltip"
                      data-tip={criteria.very_poor_description}
                      checked
                    /></Table.Cell
                  >
                  <Table.Cell class="text-center">
                    <textarea
                      name={`${type}Remark${question.level}${i + 1}`}
                      class="textarea h-10 max-w-full"
                    ></textarea>
                  </Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>
        </Card.Content>
      </Card.Root>
    {/each}
  </div>
</Tabs.Content>
