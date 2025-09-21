<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js';
  export let label: string;
  export let value: any = null;
  export let editable: boolean = false;
  export let editableCondition: boolean = true;
  export let options: any[] = [];
  export let valueKey: string = '';
  export let displayKey: string = '';
  export let displayFn: ((item: any) => string) | null = null;
  export let onChange: (newVal: any) => void = () => {};

  const getDisplay = () => {
    if (typeof value === 'object' && value !== null) {
      return displayFn
        ? displayFn(value)
        : displayKey
          ? (value[displayKey] ?? 'None')
          : JSON.stringify(value);
    }
    if (options.length > 0 && valueKey) {
      const match = options.find((opt) => opt[valueKey] === value);
      return match
        ? displayFn
          ? displayFn(match)
          : displayKey
            ? match[displayKey]
            : 'None'
        : 'None';
    }
    return value ?? 'None';
  };
</script>

<div class="flex h-9 items-center justify-between text-sm">
  <p class="w-[130px]">{label}</p>

  {#if editable && editableCondition}
    <Select.Root type="single" bind:value onValueChange={() => onChange(value)}>
      <Select.Trigger class="w-[200px] border-none"
        >{getDisplay()}</Select.Trigger
      >
      <Select.Content class="border-none">
        {#each options as option}
          <Select.Item value={option[valueKey]}>
            {displayFn
              ? displayFn(option)
              : displayKey
                ? option[displayKey]
                : 'Unknown'}
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  {:else}
    <p class="w-[200px] p-3">{getDisplay()}</p>
  {/if}
</div>
