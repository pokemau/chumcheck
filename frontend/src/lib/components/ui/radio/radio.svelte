<script lang="ts">
  import Check from 'svelte-radix/Check.svelte';

  let { name, readonly = false, value, checked, id, questionnaire } = $props();
</script>

<div class="flex h-full w-full items-center justify-center gap-3">
  <div class="relative flex w-fit items-center justify-center">
    <input
      type="radio"
      {name}
      {id}
      disabled={readonly}
      {value}
      {checked}
      class="peer aspect-square h-4 w-4 appearance-none rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    />
    <Check class="absolute hidden h-3.5 w-3.5 fill-primary text-primary peer-checked:block" />
  </div>
  {#if questionnaire}
    <label for={id} class="cursor-pointer" class:pointer-events-none={readonly}
      >Level {questionnaire.level} - {questionnaire.name}</label
    >
  {/if}
</div>
