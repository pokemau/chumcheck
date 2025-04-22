<script lang="ts">
  export let currentActive: number, calculatorQuestions: any;
  import { Label } from '$lib/components/ui/label';
  import * as RadioGroup from '$lib/components/ui/radio-group';
  console.log(calculatorQuestions);
</script>

<div class="flex-1 overflow-scroll px-1" class:hidden={currentActive !== 10}>
  <div class="flex h-0 flex-col gap-5">
    {#each calculatorQuestions as category}
      <div class="form-control">
        <label class="label" for="">
          <span class="label-text text-base">{category.category}</span>
        </label>
        <RadioGroup.Root value={`${category.questions[0].id}`} name={category.category}>
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
      </div>
    {/each}
  </div>
</div>
