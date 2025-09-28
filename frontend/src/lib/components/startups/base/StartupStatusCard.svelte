<script lang="ts">
  export let count: number;
  export let label: string;
  export let borderColor: string = 'border-gray-400';
  export let bgColor: string = 'bg-background';
  export let textColor: string = 'text-foreground';
</script>

<div
  class="flex w-[74px] flex-col items-center rounded-xl border {borderColor} {bgColor} p-2 text-xs font-semibold {textColor}"
>
  <span class="text-base">{count}</span>
  <span>{label}</span>
</div>
