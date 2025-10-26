<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card';
  import Input from '$lib/components/ui/input/input.svelte';
  import Textarea from '$lib/components/ui/textarea/textarea.svelte';
  import { getAssessmentFieldType } from '$lib/utils';

  export let open: boolean = false;
  export let onOpenChange: () => void;
  export let assessment: { id: number; name: string; fields: { id: number; label: string; fieldType: number }[] } | null = null;
</script>

{#if assessment}
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Content class="sm:max-w-[700px]">
      <Dialog.Header>
        <Dialog.Title>{assessment.name}</Dialog.Title>
        <Dialog.Description>Assessment Preview</Dialog.Description>
      </Dialog.Header>

      <div class="space-y-3">
        {#if assessment.fields && assessment.fields.length > 0}
          {#each assessment.fields as f (f.id)}
            <Card.Root class="border bg-background">
              <Card.Header>
                <Card.Title class="text-base">{f.label}</Card.Title>
                <Card.Description class="text-xs">{getAssessmentFieldType(f.fieldType as 1 | 2 | 3)}</Card.Description>
              </Card.Header>
              <Card.Content>
                {#if getAssessmentFieldType(f.fieldType as 1 | 2 | 3) === 'Short Answer'}
                  <Input class="w-full" type="text" placeholder="Sample short answer" disabled />
                {:else if getAssessmentFieldType(f.fieldType as 1 | 2 | 3) === 'Long Answer'}
                  <Textarea class="w-full" rows={4} placeholder="Sample long answer" disabled />
                {:else if getAssessmentFieldType(f.fieldType as 1 | 2 | 3) === 'File Upload'}
                  <Input class="w-full" type="file" disabled />
                {:else}
                  <Input class="w-full" type="text" placeholder="Sample input" disabled />
                {/if}
              </Card.Content>
            </Card.Root>
          {/each}
        {:else}
          <p class="text-sm text-muted-foreground">No fields defined for this assessment.</p>
        {/if}
      </div>

      <Dialog.Footer>
        <Button variant="outline" onclick={onOpenChange}>Close</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
{/if}
