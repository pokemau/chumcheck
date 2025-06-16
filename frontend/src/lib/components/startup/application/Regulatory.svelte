<script lang="ts">
  export let currentActive: number;
  export let question: any;
  export let startup: any = null;
  import { Label } from '$lib/components/ui/label/index.js';
  import { Textarea } from '$lib/components/ui/textarea';

  // Filter and sort regulatory answers
  $: regulatoryAnswers = startup?.uratQuestionAnswers
    ?.filter((answer: any) => answer.uratQuestion.readinessType === 'Regulatory')
    ?.sort((a: any, b: any) => a.uratQuestion.id - b.uratQuestion.id) ?? [];
</script>

<div class="flex-1 overflow-auto px-1" class:hidden={currentActive !== 6}>
  <div class="flex h-0 flex-col gap-5">
    {#each question as q, i}
      <div class="grid w-full gap-1.5">
        <Label for="message">{q.question}</Label>
        <Textarea 
          placeholder="Type your message here." 
          id="message" 
          name={`regulatory${i}`}
          value={regulatoryAnswers[i]?.response ?? ''} 
        />
        <input type="hidden" name={`regulatory${i}id`} value={`${q.id}`} />
      </div>
    {/each}
  </div>
</div>
