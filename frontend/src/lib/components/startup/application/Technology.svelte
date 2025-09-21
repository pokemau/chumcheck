<script lang="ts">
  export let currentActive: number;
  export let question: any[];
  export let startup: any = null;
  import { Label } from '$lib/components/ui/label/index.js';
  import { Textarea } from '$lib/components/ui/textarea';

  // Filter and sort technology answers
  $: technologyAnswers =
    startup?.uratQuestionAnswers
      ?.filter(
        (answer: any) => answer.uratQuestion.readinessType === 'Technology'
      )
      ?.sort((a: any, b: any) => a.uratQuestion.id - b.uratQuestion.id) ?? [];
</script>

<div class="flex-1 overflow-auto px-1" class:hidden={currentActive !== 4}>
  <div class="flex h-0 flex-col gap-5">
    {#each question as q, i}
      <div class="grid w-full gap-1.5">
        <Label for="message">{q.question}</Label>
        <Textarea
          placeholder="Type your message here."
          id="message"
          name={`technology${i}`}
          value={technologyAnswers[i]?.response ?? ''}
        />
        <input type="hidden" name={`technology${i}id`} value={`${q.id}`} />
        {#if technologyAnswers[i]?.id}
          <input
            type="hidden"
            name={`technology${i}answerId`}
            value={`${technologyAnswers[i].id}`}
          />
        {/if}
      </div>
    {/each}
  </div>
</div>
