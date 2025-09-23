<script lang="ts">
  export let stepName: string;
  export let currentStep: string;
  export let question: any;
  export let startup: any = null;
  import { Label } from '$lib/components/ui/label/index.js';
  import { Textarea } from '$lib/components/ui/textarea';

  // Filter and sort market answers
  $: marketAnswers =
    startup?.uratQuestionAnswers
      ?.filter((answer: any) => answer.uratQuestion.readinessType === 'Market')
      ?.sort((a: any, b: any) => a.uratQuestion.id - b.uratQuestion.id) ?? [];
</script>

<div class="flex-1 overflow-auto px-1" class:hidden={currentStep !== stepName}>
  <div class="flex h-0 flex-col gap-5">
    {#each question as q, i}
      <div class="grid w-full gap-1.5">
        <Label for="message">{q.question}</Label>
        <Textarea
          placeholder="Type your message here."
          id="message"
          name={`market${i}`}
          value={marketAnswers[i]?.response ?? ''}
        />
        <input type="hidden" name={`market${i}id`} value={`${q.id}`} />
        {#if marketAnswers[i]?.id}
          <input
            type="hidden"
            name={`market${i}answerId`}
            value={`${marketAnswers[i].id}`}
          />
        {/if}
      </div>
    {/each}
  </div>
</div>
