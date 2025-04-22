<script lang="ts">
  import type { WithElementRef, WithoutChildren } from 'bits-ui';
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils.js';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> = $props();
</script>

<textarea
  bind:this={ref}
  bind:value
  class={cn(
    'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
    className
  )}
  {...restProps}
></textarea>
