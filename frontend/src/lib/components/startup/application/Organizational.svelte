<script lang="ts">
  export let currentActive: number;
  export let question: any;
  export let startup: any = null;

  import { Label } from '$lib/components/ui/label/index.js';
  import { Textarea } from '$lib/components/ui/textarea';

  // Filter and sort organizational answers
  $: organizationalAnswers =
    startup?.uratQuestionAnswers
      ?.filter(
        (answer: any) => answer.uratQuestion.readinessType === 'Organizational'
      )
      ?.sort((a: any, b: any) => a.uratQuestion.id - b.uratQuestion.id) ?? [];
</script>

<div class="flex-1 overflow-auto px-1" class:hidden={currentActive !== 8}>
  <div class="flex h-0 flex-col gap-5">
    {#each question as q, i}
      <div class="grid w-full gap-1.5">
        <Label for="message">{q.question}</Label>
        <Textarea
          placeholder="Type your message here."
          id="message"
          name={`organizational${i}`}
          value={organizationalAnswers[i]?.response ?? ''}
        />
        <input type="hidden" name={`organizational${i}id`} value={`${q.id}`} />
        {#if organizationalAnswers[i]?.id}
          <input
            type="hidden"
            name={`organizational${i}answerId`}
            value={`${organizationalAnswers[i].id}`}
          />
        {/if}
      </div>
    {/each}
  </div>
</div>
