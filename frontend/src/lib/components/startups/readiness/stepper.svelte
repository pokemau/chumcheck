<script lang="ts">
  const { current } = $props();
  const steps = [
    'Technology',
    'Acceptance',
    'Market',
    'Regulatory',
    'Organizational',
    'Investment'
    // 'Summary'
  ];
</script>

{#snippet currentStep(index: number)}
  {#if index === 0 || current >= index}
    <svg
      class="me-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
      />
    </svg>
  {:else}
    <span class="me-2">{index + 1}</span>
  {/if}
{/snippet}

<ol
  class="flex w-full items-center text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base"
>
  {#each steps as step, index}
    {#if index === 0}
      <li
        class={`${current > index ? 'after:border-blue-500  dark:after:border-blue-500' : ''}after:border-1 flex items-center text-blue-600 after:mx-6 after:hidden after:h-1 after:w-full after:border-b dark:text-blue-500 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10`}
      >
        <span
          class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden"
        >
          {@render currentStep(index)}
          {step}
        </span>
      </li>
    {:else if index > 0 && index < steps.length - 1}
      <li
        class={`${current > index ? 'after:border-blue-500 dark:after:border-blue-500' : ''} ${current >= index ? 'dark:text-blue-500' : ''} after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:content-[''] sm:after:inline-block md:w-full xl:after:mx-10`}
      >
        <span
          class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden"
        >
          {@render currentStep(index)}
          {step}
        </span>
      </li>
    {:else}
      <li class={`${current >= index ? 'dark:text-blue-500' : ''} flex items-center`}>
        {@render currentStep(index)}
        {step}
      </li>
    {/if}
  {/each}
</ol>
