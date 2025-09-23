<script lang="ts">
  export let label: string;
  export let active: boolean = false;
  export let onclick: () => void;
  export let rounded: 'left' | 'right' | 'none' = 'none';
  export let className: string = '';
</script>

<button
  class={`px-4 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700
    ${rounded === 'left' ? 'rounded-bl-lg rounded-tl-lg text-white' : ''}
    ${rounded === 'right' ? 'rounded-br-lg rounded-tr-lg' : ''}
    ${active ? 'bg-blue-600 font-bold text-white' : 'text-gray-400'}
    ${className}
  `}
  on:click={onclick}
>
  {label}
</button>