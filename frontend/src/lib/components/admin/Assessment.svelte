<script lang="ts">
  export let questions, answers, type, access;
  export let onScoreChange: (data: { readinessType: string; questionId: number; score: number }) => void;

  import { Textarea } from '$lib/components/ui/textarea';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as RadioGroup from '$lib/components/ui/radio-group';

  function updateScore(questionId: number, score: number) {
    // Call the callback function passed from the parent
    onScoreChange({ readinessType: type, questionId, score });
  }
</script>

<div class="flex flex-col gap-3">
  <h2 class="text-lg italic">{type}</h2>
  {#each questions as question, index}
    <div class="grid w-full gap-2">
      <Label for="message">{question.question}</Label>
      <Textarea
        placeholder="Type your message here."
        id="message"
        value={answers[index].response}
        readonly
      />
      <input type="hidden" />
    </div>
    <RadioGroup.Root value={`${answers[index].score}`} class="flex gap-5">
      {#each [1, 2, 3, 4, 5] as score}
        <div class="flex flex-col items-center justify-center gap-1">
          <RadioGroup.Item
            value={`${score}`}
            id={`score-${score}`}
            onclick={() => updateScore(answers[index].id, score)}
          />
          <Label for={`score-${score}`} class="text-[16px]">{score}</Label>
        </div>
      {/each}
    </RadioGroup.Root>
  {/each}
</div>
