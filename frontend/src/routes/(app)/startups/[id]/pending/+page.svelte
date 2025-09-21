<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
</script>

<div></div>

<Card.Root class="h-full">
  <Card.Content class="flex h-full flex-col items-center justify-center gap-5">
    <img src="/pending.svg" alt="pending" class="h-[300px] w-[300px]" />
    <h1>
      Your startup is currently under evaluation. We’ll keep you updated as we
      progress.
    </h1>
  </Card.Content>
</Card.Root>
