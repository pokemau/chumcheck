<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Badge } from '$lib/components/ui/badge';
  import { getBadgeColor } from '$lib/utils';

  const statusStyles: Record<string, { bg: string; text: string }> = {
    Pending: {
      bg: 'bg-blue-100',
      text: 'text-blue-700'
    },
    Completed: {
      bg: 'bg-green-100',
      text: 'text-green-700'
    }
  };

  export let name: string;
  export let assessmentStatus: string;
  export let buttonProps: Record<string, any> = {};
  export let isReadOnly = false;
</script>

<Card.Root class="mb-4">
  <Card.Content class="flex items-center justify-between px-6 py-5">
    <div class="flex items-center gap-4">
      <img src="/tasks.svg" alt="Assessment Icon" class="h-8 w-8 dark:invert" />
      <span class="font-semibold text-lg">{name}</span>
    </div>
    <div class="flex items-center gap-3">
      <Badge class={`ml-auto rounded px-2 py-0.5 text-xs font-semibold ${getBadgeColor(assessmentStatus)}`}>
          {assessmentStatus}
      </Badge>
      <Button
        {...buttonProps}
        class="text-foreground bg-accent flex items-center justify-center gap-2 rounded-lg"
      >
        {isReadOnly ? 'View Assessment' : 'Start Assessment'}
      </Button>
    </div>
  </Card.Content>
</Card.Root>