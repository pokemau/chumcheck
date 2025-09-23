<script lang="ts">
  export let count: number;
  export let label: string;
  export let borderColor: string = 'border-gray-400';
  export let bgColor: string = 'bg-gray-900';
  export let textColor: string = 'text-gray-400';
</script>

<div
  class="flex w-[74px] flex-col items-center rounded-xl border {borderColor} {bgColor} p-2 text-xs font-semibold {textColor}"
>
  <span class="text-base">{count}</span>
  <span>{label}</span>
</div>