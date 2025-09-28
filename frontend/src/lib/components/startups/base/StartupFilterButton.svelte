<script lang="ts">
  export let label: string;
  export let active: boolean = false;
  export let onclick: () => void;
  export let rounded: 'left' | 'right' | 'none' = 'none';
  export let className: string = '';
</script>

<button
  class={`focus:ring-ring px-4 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2
    ${rounded === 'left' ? 'text-muted-foreground rounded-bl-lg rounded-tl-lg' : ''}
    ${rounded === 'right' ? 'rounded-br-lg rounded-tr-lg' : ''}
    ${active ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground'}
    ${className}
  `}
  on:click={onclick}
>
  {label}
</button>
