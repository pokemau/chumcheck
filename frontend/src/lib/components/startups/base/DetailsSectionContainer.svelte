<script lang="ts">
    import * as Card from '$lib/components/ui/card/index.js';
    import { Separator } from '$lib/components/ui/separator';
</script> 
<Card.Root class="rounded-md">
<Card.Content class="p-0">
<div class="flex flex-col">
    <div class="p-2">Details</div>
    <Separator />
    <div class="flex flex-col gap-2 p-2">
    <slot/>
    </div>
</div>
</Card.Content>
</Card.Root>