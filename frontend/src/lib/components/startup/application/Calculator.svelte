<script lang="ts">
  export let currentActive: number;
  export let calculatorQuestions: any;
  export let startup: any = null;
  import { Label } from '$lib/components/ui/label';
  import * as RadioGroup from '$lib/components/ui/radio-group';

  // Sort calculator answers by question ID
  $: calculatorAnswers =
    startup?.calculatorQuestionAnswers?.sort(
      (a: any, b: any) => a.question.id - b.question.id
    ) ?? [];

  // Create a map of category to selected question ID
  $: selectedAnswers = calculatorAnswers.reduce(
    (acc: Record<string, number>, answer: any) => {
      acc[answer.question.category] = answer.question.id;
      return acc;
    },
    {}
  );

  // Create a map of category to answer ID
  $: answerIds = calculatorAnswers.reduce(
    (acc: Record<string, number>, answer: any) => {
      acc[answer.question.category] = answer.id;
      return acc;
    },
    {}
  );
</script>

<div class="flex-1 overflow-auto px-1" class:hidden={currentActive !== 10}>
  <div class="flex h-0 flex-col gap-5">
    {#each calculatorQuestions as category}
      <div class="form-control">
        <label class="label" for="">
          <span class="label-text text-base">{category.category}</span>
        </label>
        <RadioGroup.Root
          value={`${selectedAnswers[category.category] ?? category.questions[0].id}`}
          name={category.category}
        >
          {#each category.questions as question, i}
            <div class="flex items-center space-x-2">
              <RadioGroup.Item
                value={`${question.id}`}
                id={`question-${question.id}`}
                name={category.category}
              />
              <Label for={`question-${question.id}`}>{question.question}</Label>
            </div>
          {/each}
          <!-- <RadioGroup.Input name={category.category} /> -->
        </RadioGroup.Root>
        {#if answerIds[category.category]}
          <input
            type="hidden"
            name={`${category.category}AnswerId`}
            value={`${answerIds[category.category]}`}
          />
        {/if}
      </div>
    {/each}
  </div>
</div>
